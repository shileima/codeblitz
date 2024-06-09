import { FRAMEWORK_NAME, FRAMEWORK_PATH } from './constant';
import { log } from './log';

export default function checkFramework() {
  if (!FRAMEWORK_PATH) {
    log.error(`cli 无法单独使用，请直接安装 ${FRAMEWORK_NAME}`);
    throw new Error('error');
  }
}
