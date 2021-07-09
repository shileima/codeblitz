import React, { useMemo } from 'react';
import { SplitPanel } from '@ali/ide-core-browser/lib/components/layout/split-panel';
import { IDiffResource } from '@ali/ide-editor/lib/common';
import { ImagePreview } from '@ali/ide-file-scheme/lib/browser/preview.view';
import { BinaryEditorComponent } from '@ali/ide-file-scheme/lib/browser/external.view';

interface Props {
  resource: IDiffResource;
  getFileType: (resource: IDiffResource) => string;
}

export const DiffView: React.FC<Props> = ({ resource, getFileType }) => {
  const fileType = useMemo(() => getFileType(resource), [resource]);
  const leftResource = useMemo(() => ({ name: '', icon: '', uri: resource.metadata!.original }), [
    resource,
  ]);
  const rightResource = useMemo(() => ({ name: '', icon: '', uri: resource.metadata!.modified }), [
    resource,
  ]);
  const Component = fileType === 'image' ? ImagePreview : BinaryEditorComponent;
  return (
    <SplitPanel id="diff-view" direction="left-to-right">
      <Component resource={leftResource} />
      <Component resource={rightResource} />
    </SplitPanel>
  );
};