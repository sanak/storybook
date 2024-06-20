/* eslint-disable no-underscore-dangle */
import { global } from '@storybook/global';
import type { ModuleImportFn, NormalizedProjectAnnotations, Renderer } from '@storybook/types';

import { PreviewWithSelection } from './PreviewWithSelection';
import { UrlStore } from './UrlStore';
import { WebView } from './WebView';
import type { MaybePromise } from './Preview';

export class PreviewWeb<TRenderer extends Renderer> extends PreviewWithSelection<TRenderer> {
  constructor(
    public importFn: ModuleImportFn,

    public getProjectAnnotations: () => MaybePromise<NormalizedProjectAnnotations<TRenderer>>
  ) {
    super(importFn, getProjectAnnotations, new UrlStore(), new WebView());

    global.__STORYBOOK_PREVIEW__ = this;
  }
}
