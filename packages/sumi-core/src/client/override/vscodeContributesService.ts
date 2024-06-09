import {
  VSCodeContributesService,
  VSCodeContributesServiceToken,
} from '@opensumi/ide-extension/lib/browser/vscode/contributes';
import { BreakpointsContributionPoint } from '@opensumi/ide-extension/lib/browser/vscode/contributes/breakpoints';
import { DebuggersContributionPoint } from '@opensumi/ide-extension/lib/browser/vscode/contributes/debuggers';
import { TerminalContributionPoint } from '@opensumi/ide-extension/lib/browser/vscode/contributes/terminal';

export { VSCodeContributesServiceToken };

// TODO Alex内暂时没有 Terminal 模块
// 去除 terminal 依赖项

// Alex 内不需要的初始化贡献点
const OUTSIDE_POINT = [
  TerminalContributionPoint,
  DebuggersContributionPoint,
  BreakpointsContributionPoint,
];
export class VSCodeContributesServiceOverride extends VSCodeContributesService {
  constructor() {
    super();
  }
  ContributionPoints = [
    ...this.ContributionPoints.filter((contributtion) => {
      return !OUTSIDE_POINT.includes(contributtion);
    }),
  ];
}
