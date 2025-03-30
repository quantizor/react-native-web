/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import type { TurboModule } from './RCTExport';
import invariant from '../../../modules/invariant';

export function get<T extends TurboModule>(name: string): T | null {
  return null;
}

export function getEnforcing<T extends TurboModule>(name: string): T {
  const module = get<T>(name);
  invariant(
    module != null,
    `TurboModuleRegistry.getEnforcing(...): '${name}' could not be found. ` +
      'Verify that a module by this name is registered in the native binary.'
  );

  return module;
}
