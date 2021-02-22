import { Injectable, Autowired } from '@ali/common-di';
import {
  StorageProvider,
  IStorage,
  STORAGE_SCHEMA,
  URI,
  Deferred,
  CommandService,
} from '@ali/ide-core-common';
import { GITHUB_OAUTH_TOKEN, GITLAB_PRIVATE_TOKEN } from './constant';

/**
 * 使用 localStorage 存储 token 够用了
 * TODO: 需要简单加密下 token
 */

@Injectable()
export class HelperService {
  @Autowired(StorageProvider)
  private provideStorage: StorageProvider;

  @Autowired(CommandService)
  private readonly commandService: CommandService;

  private _storageDeferred: Deferred<IStorage>;

  async getStorage() {
    if (!this._storageDeferred) {
      this._storageDeferred = new Deferred();
      const storage = await this.provideStorage(
        new URI('code-api').withScheme(STORAGE_SCHEMA.SCOPE)
      );
      this._storageDeferred.resolve(storage);
    }
    return this._storageDeferred.promise;
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

  get GITHUB_TOKEN() {
    return this.get(GITHUB_OAUTH_TOKEN);
  }

  set GITHUB_TOKEN(value: string | null) {
    if (value === null) {
      this.delete(GITHUB_OAUTH_TOKEN);
    } else {
      this.set(GITHUB_OAUTH_TOKEN, value);
    }
  }

  get GITLAB_TOKEN() {
    return this.get(GITLAB_PRIVATE_TOKEN);
  }

  set GITLAB_TOKEN(value: string | null) {
    if (value === null) {
      this.delete(GITLAB_PRIVATE_TOKEN);
    } else {
      this.set(GITLAB_PRIVATE_TOKEN, value);
    }
  }

  revealView(id: string) {
    this.commandService.executeCommand(`workbench.view.${id}`);
  }
}
