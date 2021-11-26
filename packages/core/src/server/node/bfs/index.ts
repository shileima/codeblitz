import fs from '@alipay/alex-browserfs/lib/core/node_fs';
import { checkOptions } from '@alipay/alex-browserfs/lib/core/util';
import {
  FileSystem,
  FileSystemConstructor,
  BFSCallback,
  FileSystemOptions,
} from '@alipay/alex-browserfs/lib/core/file_system';
import * as Errors from '@alipay/alex-browserfs/lib/core/api_error';
import { FileType } from '@alipay/alex-browserfs/lib/core/node_fs_stats';

import MountableFileSystem, {
  MountableFileSystemOptions,
} from '@alipay/alex-browserfs/lib/backend/MountableFileSystem';
import IndexedDB, {
  IndexedDBFileSystemOptions,
} from '@alipay/alex-browserfs/lib/backend/IndexedDB';
import InMemory from '@alipay/alex-browserfs/lib/backend/InMemory';
import FolderAdapter, {
  FolderAdapterOptions,
} from '@alipay/alex-browserfs/lib/backend/FolderAdapter';
import OverlayFS, {
  OverlayFSOptions,
  deletionLogPath,
} from '@alipay/alex-browserfs/lib/backend/OverlayFS';
import DynamicRequest, {
  DynamicRequestOptions,
} from '@alipay/alex-browserfs/lib/backend/DynamicRequest';
import ZipFS, { ZipFSOptions } from '@alipay/alex-browserfs/lib/backend/ZipFS';
import { FileIndexSystem, FileIndexSystemOptions } from './FileIndex';
import { Editor, EditorOptions } from './Editor';
import { WORKSPACE_IDB_NAME } from '../../../common';

export type {
  MountableFileSystemOptions,
  IndexedDBFileSystemOptions,
  FolderAdapterOptions,
  OverlayFSOptions,
  FileIndexSystemOptions,
  DynamicRequestOptions,
  deletionLogPath as browserfsDeletionLogPath,
};

export { FileType as BrowserFSFileType };

export type { FileIndex as FileIndexType } from './FileIndex';
export type { EditorOptions } from './Editor';

const Backends = {
  MountableFileSystem,
  IndexedDB,
  InMemory,
  FolderAdapter,
  OverlayFS,
  FileIndexSystem,
  Editor,
  DynamicRequest,
  ZipFS,
};

// Make sure all backends cast to FileSystemConstructor (for type checking)
const _: { [name: string]: FileSystemConstructor } = Backends;
_;

function patchCreateForCheck(fsType: FileSystemConstructor) {
  const create = fsType.Create;
  fsType.Create = function (opts?: any, cb?: BFSCallback<FileSystem>): void {
    const oneArg = typeof opts === 'function';
    const normalizedCb = oneArg ? opts : cb;
    const normalizedOpts = oneArg ? {} : opts;

    function wrappedCb(e?: Errors.ApiError): void {
      if (e) {
        normalizedCb(e);
      } else {
        if (fsType.Name === OverlayFS.Name) {
          normalizedOpts.storeName ||= WORKSPACE_IDB_NAME;
        }
        create.call(fsType, normalizedOpts, normalizedCb);
      }
    }

    checkOptions(fsType, normalizedOpts, wrappedCb);
  };
}

Object.keys((key) => patchCreateForCheck(Backends[key]));

function initialize(rootfs: FileSystem) {
  return fs.initialize(rootfs);
}

(window as any).fs = fs;

export type FileSystemConfiguration =
  | { fs: 'MountableFileSystem'; options: { [mountPoint: string]: FileSystemConfiguration } }
  | {
      fs: 'OverlayFS';
      options: { writable: FileSystemConfiguration; readable: FileSystemConfiguration };
    }
  | { fs: 'IndexedDB'; options?: IndexedDBFileSystemOptions }
  | { fs: 'InMemory'; options?: FileSystemOptions }
  | { fs: 'FolderAdapter'; options: { folder: string; wrapped: FileSystemConfiguration } }
  | { fs: 'FileIndexSystem'; options: FileIndexSystemOptions }
  | { fs: 'Editor'; options: EditorOptions }
  | { fs: 'DynamicRequest'; options: DynamicRequestOptions }
  | { fs: 'ZipFS'; options: ZipFSOptions };

async function configure(config: FileSystemConfiguration) {
  const fs = await getFileSystem(config);
  if (fs) {
    initialize(fs);
  }
}

function createFileSystem<T extends FileSystemConstructor>(
  FileSystemClass: T,
  options: Parameters<T['Create']>[0]
): Promise<FileSystem> {
  return new Promise((resolve, reject) => {
    FileSystemClass.Create(options, (err: any, fs: FileSystem) => {
      if (err) {
        reject(err);
      } else {
        resolve(fs);
      }
    });
  });
}

/**
 * Retrieve a file system with the given configuration.
 * @param config A FileSystemConfiguration object. See FileSystemConfiguration for details.
 */
async function getFileSystem({ fs, options }: FileSystemConfiguration): Promise<FileSystem> {
  if (!fs) {
    throw new Errors.ApiError(
      Errors.ErrorCode.EPERM,
      'Missing "fs" property on configuration object.'
    );
  }

  if (options !== null && typeof options === 'object') {
    const props = Object.keys(options).filter((k) => k !== 'fs');
    // Check recursively if other fields have 'fs' properties.
    try {
      await Promise.all(
        props.map(async (p) => {
          const d = options[p];
          if (d !== null && typeof d === 'object' && d.fs) {
            options[p] = await getFileSystem(d);
          }
        })
      );
    } catch (e) {
      throw e;
    }
  }

  const fsc = Backends[fs];
  if (!fsc) {
    throw new Errors.ApiError(
      Errors.ErrorCode.EPERM,
      `File system ${fs} is not available in BrowserFS.`
    );
  } else {
    return createFileSystem(fsc, options || {});
  }
}

function addFileSystemType(name: string, fsType: FileSystemConstructor) {
  patchCreateForCheck(fsType);
  Backends[name] = fsType;
}

export { fs, FileSystem };

export const BrowserFS = {
  initialize,
  configure,
  addFileSystemType,
  createFileSystem,
  getFileSystem,
  FileSystem: Backends,
};

export type SupportFileSystem = keyof typeof Backends;

type InstanceType<T> = T extends { Create(options: object, cb: BFSCallback<infer R>): void }
  ? R
  : any;

export type FileSystemInstance<T extends SupportFileSystem> = InstanceType<typeof Backends[T]>;
