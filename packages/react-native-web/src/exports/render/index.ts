/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import {
  createRoot as domCreateRoot,
  hydrateRoot as domHydrateRoot
} from 'react-dom/client';

import { createSheet } from '../StyleSheet/dom';

export function hydrate(element: React.ReactElement, root: HTMLElement) {
  createSheet(root);
  return domHydrateRoot(root, element);
}

export default function render(element: React.ReactElement, root: HTMLElement) {
  createSheet(root);
  const reactRoot = domCreateRoot(root);
  reactRoot.render(element);
  return reactRoot;
}
