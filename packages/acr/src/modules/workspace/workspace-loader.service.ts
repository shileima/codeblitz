import { Autowired, Injectable } from '@ali/common-di';
import { Disposable, URI, DefaultStorageProvider, STORAGE_SCHEMA } from '@ali/ide-core-common';
import { IFileServiceClient } from '@ali/ide-file-service';
import { IWorkspaceService } from '@ali/ide-workspace';
import * as paths from '@ali/ide-core-common/lib/path';

import { IAntcodeService } from '../antcode-service/base';
import bfs, { BROWSER_FS_HOME_DIR } from '../../common/file-system';
import { fromGitUri } from '../merge-request/changes-tree/util';

@Injectable()
export class WorkspaceManagerService extends Disposable {
  // 默认的 workspace 目录规则为 /home/{projectId}/{currentRef}
  static getWorkspaceDir(projectId: number, prId: number, currentRef: string): URI {
    return BROWSER_FS_HOME_DIR.resolve(paths.join(projectId + '', prId + '', currentRef));
  }

  @Autowired(IAntcodeService)
  private readonly antcodeService: IAntcodeService;

  @Autowired(IWorkspaceService)
  private readonly workspaceService: IWorkspaceService;

  @Autowired(IFileServiceClient)
  private readonly fileServiceClient: IFileServiceClient;

  @Autowired(DefaultStorageProvider)
  private readonly defaultStorageProvider: DefaultStorageProvider;

  private _headCommitId: string;
  public get headCommitId() {
    return this._headCommitId;
  }

  init() {
    this._headCommitId = this.antcodeService.rightRef;

    this.addDispose(
      this.antcodeService.onDidRefChange(() => {
        // FIXME: 这里有问题
        // 当 rightRef 改变时，切换 headCommitId 值并更新 workspace dir
        if (this._headCommitId !== this.antcodeService.rightRef) {
          this._headCommitId = this.antcodeService.rightRef;
          this.updateWorkspaceDir();
        }
      })
    );

    this.addDispose(
      // 黑科技: 手动清理 storage 对象的缓存
      this.workspaceService.onWorkspaceChanged(() => {
        // 在 workspace change 的时候，将 scoped storage 对象缓存清理掉
        const storageCacheMap = this.defaultStorageProvider['storageCacheMap'];
        for (const storageCache of storageCacheMap) {
          const [uriStr] = storageCache;
          if (new URI(uriStr).scheme === STORAGE_SCHEMA.SCOPE) {
            this.defaultStorageProvider['storageCacheMap'].delete(uriStr);
          }
        }
      })
    );
  }

  public async getParsedUriParams(
    uri: URI
  ): Promise<void | {
    ref: string;
    path: string;
  }> {
    if (uri.scheme === 'git') {
      const { ref, path } = fromGitUri(uri);
      return {
        ref,
        path,
      };
    }

    if (uri.scheme === 'file') {
      // /{browser_home_dir}/{projectId}/{commitId}
      // /{browser_home_dir}/{projectId}/${prId}/{commitId}
      const [root] = await this.workspaceService.roots;
      const projectRootUri = new URI(root.uri);
      // 非同一个 workspace 下，则跳过
      const relativePath = projectRootUri.relative(uri);
      if (!relativePath) {
        return;
      }

      let relativePathStr = relativePath.toString();

      const [ref] = paths.Path.splitPath(
        BROWSER_FS_HOME_DIR.relative(projectRootUri)!.toString()
      ).reverse();
      // trim leading whitespace
      if (relativePathStr.startsWith(paths.Path.separator)) {
        relativePathStr = relativePathStr.slice(1);
      }

      return {
        ref,
        path: relativePathStr,
      };
    }
  }

  // 实现切换 workspace dir 的逻辑
  // 主要针对 cr 版本切换逻辑
  private async updateWorkspaceDir() {
    const workspaceUri = WorkspaceManagerService.getWorkspaceDir(
      this.antcodeService.projectId,
      this.antcodeService.pullRequest.id,
      this._headCommitId
    );
    // 相同的 workspace 不需要额外切换
    if (workspaceUri.isEqual(new URI(this.workspaceService.workspace!.uri))) {
      return;
    }
    const uriStr = workspaceUri.toString();
    // 确保 workspace 目录存在
    await bfs.ensureDir(workspaceUri.codeUri.fsPath);
    const fileStat = await this.fileServiceClient.getFileStat(uriStr);
    await this.workspaceService.setWorkspace(fileStat);
  }
}