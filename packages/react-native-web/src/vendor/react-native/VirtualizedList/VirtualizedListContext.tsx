/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import VirtualizedList from '.';
import * as React from 'react';
import { useContext, useMemo } from 'react';

const __DEV__ = process.env.NODE_ENV !== 'production';

type Context<Data extends readonly any[] = readonly any[]> = Readonly<{
  cellKey: string | null,
  getScrollMetrics: () => {
    contentLength: number,
    dOffset: number,
    dt: number,
    offset: number,
    timestamp: number,
    velocity: number,
    visibleLength: number,
    zoomScale: number
  },
  horizontal: boolean | undefined,
  getOutermostParentListRef: () => InstanceType<typeof VirtualizedList<Data>>,
  registerAsNestedChild: (params: { cellKey: string, ref: InstanceType<typeof VirtualizedList<Data>> }) => void,
  unregisterAsNestedChild: (params: { ref: InstanceType<typeof VirtualizedList<Data>> }) => void
}>;

export type VirtualizedListContextType<Data extends readonly any[] = readonly any[]> = Context<Data> | null;

export const VirtualizedListContext =
  React.createContext<VirtualizedListContextType>(null) as unknown as React.Context<VirtualizedListContextType> & {
    Provider: <Data extends readonly any[]>(props: { children: React.ReactNode, value: VirtualizedListContextType<Data> }) => React.ReactNode
  };

if (__DEV__) {
  VirtualizedListContext.displayName = 'VirtualizedListContext';
}

/**
 * Resets the context. Intended for use by portal-like components (e.g. Modal).
 */
export function VirtualizedListContextResetter({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (
    <VirtualizedListContext.Provider value={null}>
      {children}
    </VirtualizedListContext.Provider>
  );
}

/**
 * Sets the context with memoization. Intended to be used by `VirtualizedList`.
 */
export function VirtualizedListContextProvider<Data extends readonly any[] = readonly any[]>({
  children,
  value
}: {
  children: React.ReactNode,
  value: Context<Data>
}): React.ReactNode {
  // Avoid setting a newly created context object if the values are identical.
  const context = useMemo(
    () => ({
      cellKey: null,
      getScrollMetrics: value.getScrollMetrics,
      horizontal: value.horizontal,
      getOutermostParentListRef: value.getOutermostParentListRef,
      registerAsNestedChild: value.registerAsNestedChild,
      unregisterAsNestedChild: value.unregisterAsNestedChild
    }),
    [
      value.getScrollMetrics,
      value.horizontal,
      value.getOutermostParentListRef,
      value.registerAsNestedChild,
      value.unregisterAsNestedChild
    ]
  );
  return (
    <VirtualizedListContext.Provider<Data> value={context}>
      {children}
    </VirtualizedListContext.Provider>
  );
}

/**
 * Sets the `cellKey`. Intended to be used by `VirtualizedList` for each cell.
 */
export function VirtualizedListCellContextProvider({
  cellKey,
  children
}: {
  cellKey: string,
  children: React.ReactNode
}): React.ReactNode {
  // Avoid setting a newly created context object if the values are identical.
  const currContext = useContext(VirtualizedListContext);
  const context = useMemo(
    () => (currContext == null ? null : { ...currContext, cellKey }),
    [currContext, cellKey]
  );
  return (
    <VirtualizedListContext.Provider value={context}>
      {children}
    </VirtualizedListContext.Provider>
  );
}
