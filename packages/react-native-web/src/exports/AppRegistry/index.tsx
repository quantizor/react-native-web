/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import type { Application } from './renderApplication';
import type { ComponentType, ReactElement } from 'react';

import invariant from '../../modules/invariant';
import unmountComponentAtNode from '../unmountComponentAtNode';
import renderApplication, { getApplication } from './renderApplication';

type StyleElement = ReactElement<unknown, 'style'>;

type AppParams = Object;
type Runnable = {
  getApplication?: (AppParams) => {
    element: ReactElement,
    getStyleElement: (any) => StyleElement
  },
  run: (AppParams) => any
};

export type ComponentProvider = () => ComponentType<any>;
export type ComponentProviderInstrumentationHook = (
  component: ComponentProvider
) => ComponentType<any>;
export type WrapperComponentProvider = (any) => ComponentType<any>;

export type AppConfig = {
  appKey: string,
  component?: ComponentProvider,
  run?: Runnable['run'],
  section?: boolean
};

const emptyObject = {};
const runnables: { [appKey: string]: Runnable } = {};

let componentProviderInstrumentationHook: ComponentProviderInstrumentationHook =
  (component: ComponentProvider) => component();
let wrapperComponentProvider: WrapperComponentProvider | undefined;

/**
 * `AppRegistry` is the JS entry point to running all React Native apps.
 */
export default class AppRegistry {
  static getAppKeys(): Array<string> {
    return Object.keys(runnables);
  }

  static getApplication(
    appKey: string,
    appParameters?: AppParams
  ): { element: ReactElement, getStyleElement: (any) => StyleElement } | undefined {
    invariant(
      runnables[appKey] && runnables[appKey].getApplication,
      `Application ${appKey} has not been registered. ` +
        'This is either due to an import error during initialization or failure to call AppRegistry.registerComponent.'
    );

    return runnables[appKey].getApplication?.(appParameters);
  }

  static registerComponent(
    appKey: string,
    componentProvider: ComponentProvider
  ): string {
    runnables[appKey] = {
      getApplication: (appParameters) =>
        getApplication(
          componentProviderInstrumentationHook(componentProvider),
          appParameters ? appParameters.initialProps : emptyObject,
          wrapperComponentProvider && wrapperComponentProvider(appParameters)
        ),
      run: (appParameters): Application =>
        renderApplication(
          componentProviderInstrumentationHook(componentProvider),
          wrapperComponentProvider && wrapperComponentProvider(appParameters),
          appParameters.callback,
          {
            hydrate: appParameters.hydrate || false,
            initialProps: appParameters.initialProps || emptyObject,
            mode: appParameters.mode || 'concurrent',
            rootTag: appParameters.rootTag
          }
        )
    };
    return appKey;
  }

  static registerConfig(config: Array<AppConfig>) {
    config.forEach(({ appKey, component, run }) => {
      if (run) {
        AppRegistry.registerRunnable(appKey, run);
      } else if (component) {
        AppRegistry.registerComponent(appKey, component);
      } else {
        invariant(component, 'No component provider passed in');
      }
    });
  }

  // TODO: fix style sheet creation when using this method
  static registerRunnable(appKey: string, run: Runnable['run']): string {
    runnables[appKey] = { run };
    return appKey;
  }

  static runApplication(appKey: string, appParameters: {rootTag: {id: string}}): Application {
    const isDevelopment =
      process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';
    if (isDevelopment) {
      const params = { ...appParameters, rootTag: `#${appParameters.rootTag.id}` };

      console.log(
        `Running application "${appKey}" with appParams:\n`,
        params,
        `\nDevelopment-level warnings: ${isDevelopment ? 'ON' : 'OFF'}.` +
          `\nPerformance optimizations: ${isDevelopment ? 'OFF' : 'ON'}.`
      );
    }

    invariant(
      runnables[appKey] && runnables[appKey].run,
      `Application "${appKey}" has not been registered. ` +
        'This is either due to an import error during initialization or failure to call AppRegistry.registerComponent.'
    );

    return runnables[appKey].run(appParameters);
  }

  static setComponentProviderInstrumentationHook(
    hook: ComponentProviderInstrumentationHook
  ) {
    componentProviderInstrumentationHook = hook;
  }

  static setWrapperComponentProvider(provider: WrapperComponentProvider) {
    wrapperComponentProvider = provider;
  }

  static unmountApplicationComponentAtRootTag(rootTag: Object) {
    unmountComponentAtNode(rootTag);
  }
}
