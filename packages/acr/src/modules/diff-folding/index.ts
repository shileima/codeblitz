import * as monaco from '@ali/monaco-editor-core/esm/vs/editor/editor.api';
import { RawContextKey } from '@ali/ide-core-browser/lib/raw-context-key';
import { ViewZoneDelegate } from '@ali/ide-monaco-enhance';

export type TFoldingType = 'up' | 'down' | 'all';

// 向上或向下展开的最大固定行数，展开全部不需要
export const CUSTOM_FOLDING_LINE_NUMBER = 20;

export interface DiffFoldingChangeData {
  type: TFoldingType;
  lineNumber: number;
  // 想要展开多少行
  unFoldNumber: number;
}

/* eslint-disable no-useless-escape */
export const DIFF_CHANGE_LINE_PATTERN = /\.*\@\@\s*\-(\d+),(\d+).*\+(\d+),(\d+).*\s*\@\@/;

export class MiscCommands {
  static ExpandFie = {
    id: 'misc.expandFile',
  };
}

export const MISC_IS_EXPAND = 'misc.isExpand';
export const MISC_IS_EXPAND_RAW_KEY = new RawContextKey<boolean>(MISC_IS_EXPAND, false);

export interface IConverDiffByGit {
  content: string;
  type: '-' | '+' | null;
  left: number;
  right: number;
}

/**
 * folding contrib ID
 */
export const FOLDING_CONTRIB_ID = 'editor.contrib.folding';

export type TEditorType = 'original' | 'modified';

export interface IFoldingContribution extends monaco.editor.IEditorContribution {
  foldingModel: any;
}

// hock IMyViewZone
export interface IMyViewZone {
  whitespaceId: number;
  delegate: ViewZoneDelegate;
  isVisible: boolean;
  domNode: HTMLElement;
}

export interface IViewZoneChangeAccessor {
  addZone(zone: ViewZoneDelegate): number;
  removeZone(id: number): void;
  layoutZone(id: number): void;
}