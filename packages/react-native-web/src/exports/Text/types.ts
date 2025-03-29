/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { StyleProp } from 'react-native';
import type { ColorValue } from '../../types';
import type { ViewProps, ViewStyle } from '../View/types';

type FontWeightValue =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

type NumberOrString = number | string;

export interface TextStyle extends Omit<ViewStyle, 'fontVariant' | 'textAlign' | 'wordWrap'> {
  color?: ColorValue | undefined,
  fontFamily?: string | undefined,
  fontFeatureSettings?: string | undefined,
  fontSize?: NumberOrString | undefined,
  fontStyle?: 'italic' | 'normal' | undefined,
  fontWeight?: FontWeightValue | undefined,
  fontVariant?: ReadonlyArray<
    | 'small-caps'
    | 'oldstyle-nums'
    | 'lining-nums'
    | 'tabular-nums'
    | 'proportional-nums'
  >,
  letterSpacing?: NumberOrString | undefined,
  lineHeight?: NumberOrString | undefined,
  textAlign?:
    | 'center'
    | 'end'
    | 'inherit'
    | 'justify'
    | 'justify-all'
    | 'left'
    | 'right'
    | 'start',
  textDecorationColor?: ColorValue | undefined,
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through',
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed',
  textIndent?: NumberOrString | undefined,
  textOverflow?: string | undefined,
  textRendering?:
    | 'auto'
    | 'geometricPrecision'
    | 'optimizeLegibility'
    | 'optimizeSpeed',
  textShadow?: string | undefined,
  textShadowColor?: ColorValue | undefined,
  textShadowOffset?: { width?: number, height?: number } | undefined,
  textShadowRadius?: number | undefined,
  textTransform?: 'capitalize' | 'lowercase' | 'none' | 'uppercase',
  unicodeBidi?:
    | 'normal'
    | 'bidi-override'
    | 'embed'
    | 'isolate'
    | 'isolate-override'
    | 'plaintext',
  userSelect?: 'none' | 'text',
  verticalAlign?: string | undefined,
  whiteSpace?: string | undefined,
  wordBreak?: 'normal' | 'break-all' | 'break-word' | 'keep-all',
  wordWrap?: string | undefined,
  writingDirection?: 'auto' | 'ltr' | 'rtl',
  /* @platform web */
  MozOsxFontSmoothing?: string | undefined,
  WebkitFontSmoothing?: string | undefined,
  // deprecated
  textAlignVertical?: string | undefined
};

export interface TextProps extends Omit<ViewProps, 'dir' | 'style'> {
  dir?: 'auto' | 'ltr' | 'rtl',
  numberOfLines?: number | undefined,
  role?:
    | 'button'
    | 'header'
    | 'heading'
    | 'label'
    | 'link'
    | 'listitem'
    | 'none'
    | 'text',
  style?: StyleProp<TextStyle>,
  testID?: string | undefined,
  // @deprecated
  accessibilityRole?:
    | 'button'
    | 'header'
    | 'heading'
    | 'label'
    | 'link'
    | 'listitem'
    | 'none'
    | 'text',
  onPress?: (e: any) => void,
  selectable?: boolean
};
