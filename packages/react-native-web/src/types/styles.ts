/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ColorValue, DimensionValue } from './index';

type NumberOrString = number | string;

/**
 * Animations and transitions
 */

type AnimationDirection =
  | 'alternate'
  | 'alternate-reverse'
  | 'normal'
  | 'reverse';
type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';
type AnimationIterationCount = number | 'infinite';
type AnimationKeyframes = string | Object;
type AnimationPlayState = 'paused' | 'running';

export type AnimationStyles = {
  animationDelay?: string | Array<string> | undefined,
  animationDirection?: AnimationDirection | Array<AnimationDirection> | undefined,
  animationDuration?: string | Array<string> | undefined,
  animationFillMode?: AnimationFillMode | Array<AnimationFillMode> | undefined,
  animationIterationCount?: AnimationIterationCount | Array<AnimationIterationCount> | undefined,
  animationKeyframes?: AnimationKeyframes | Array<AnimationKeyframes> | undefined,
  animationPlayState?: AnimationPlayState | Array<AnimationPlayState> | undefined,
  animationTimingFunction?: string | Array<string> | undefined,
  transitionDelay?: string | Array<string> | undefined,
  transitionDuration?: string | Array<string> | undefined,
  transitionProperty?: string | Array<string> | undefined,
  transitionTimingFunction?: string | Array<string> | undefined
};

/**
 * Border
 */

type BorderRadiusValue = number | string;
type BorderStyleValue = 'solid' | 'dotted' | 'dashed';

export type BorderStyles = {
  // color
  borderColor?: ColorValue | undefined,
  borderBlockColor?: ColorValue | undefined,
  borderBlockEndColor?: ColorValue | undefined,
  borderBlockStartColor?: ColorValue | undefined,
  borderBottomColor?: ColorValue | undefined,
  borderInlineColor?: ColorValue | undefined,
  borderInlineEndColor?: ColorValue | undefined,
  borderInlineStartColor?: ColorValue | undefined,
  borderLeftColor?: ColorValue | undefined,
  borderRightColor?: ColorValue | undefined,
  borderTopColor?: ColorValue | undefined,
  // radius
  borderRadius?: BorderRadiusValue | undefined,
  borderEndEndRadius?: BorderRadiusValue | undefined,
  borderEndStartRadius?: BorderRadiusValue | undefined,
  borderStartEndRadius?: BorderRadiusValue | undefined,
  borderStartStartRadius?: BorderRadiusValue | undefined,
  borderBottomLeftRadius?: BorderRadiusValue | undefined,
  borderBottomRightRadius?: BorderRadiusValue | undefined,
  borderTopLeftRadius?: BorderRadiusValue | undefined,
  borderTopRightRadius?: BorderRadiusValue | undefined,
  // style
  borderStyle?: BorderStyleValue | undefined,
  borderBlockStyle?: BorderStyleValue | undefined,
  borderBlockEndStyle?: BorderStyleValue | undefined,
  borderBlockStartStyle?: BorderStyleValue | undefined,
  borderBottomStyle?: BorderStyleValue | undefined,
  borderInlineStyle?: BorderStyleValue | undefined,
  borderInlineEndStyle?: BorderStyleValue | undefined,
  borderInlineStartStyle?: BorderStyleValue | undefined,
  borderLeftStyle?: BorderStyleValue | undefined,
  borderRightStyle?: BorderStyleValue | undefined,
  borderTopStyle?: BorderStyleValue | undefined,
  // deprecated
  borderEndColor?: ColorValue | undefined,
  borderStartColor?: ColorValue | undefined,
  borderEndStyle?: BorderStyleValue | undefined,
  borderStartStyle?: BorderStyleValue | undefined,
  borderBottomEndRadius?: BorderRadiusValue | undefined,
  borderBottomStartRadius?: BorderRadiusValue | undefined,
  borderTopEndRadius?: BorderRadiusValue | undefined,
  borderTopStartRadius?: BorderRadiusValue | undefined
};

/**
 * Interactions
 */

type CursorValue =
  | 'alias'
  | 'all-scroll'
  | 'auto'
  | 'cell'
  | 'context-menu'
  | 'copy'
  | 'crosshair'
  | 'default'
  | 'grab'
  | 'grabbing'
  | 'help'
  | 'pointer'
  | 'progress'
  | 'wait'
  | 'text'
  | 'vertical-text'
  | 'move'
  | 'none'
  | 'no-drop'
  | 'not-allowed'
  | 'zoom-in'
  | 'zoom-out'
  // resize
  | 'col-resize'
  | 'e-resize'
  | 'ew-resize'
  | 'n-resize'
  | 'ne-resize'
  | 'ns-resize'
  | 'nw-resize'
  | 'row-resize'
  | 's-resize'
  | 'se-resize'
  | 'sw-resize'
  | 'w-resize'
  | 'nesw-resize'
  | 'nwse-resize';

type TouchActionValue =
  | 'auto'
  | 'inherit'
  | 'manipulation'
  | 'none'
  | 'pan-down'
  | 'pan-left'
  | 'pan-right'
  | 'pan-up'
  | 'pan-x'
  | 'pan-y'
  | 'pinch-zoom';

type UserSelect = 'all' | 'auto' | 'contain' | 'none' | 'text';

export type InteractionStyles = {
  // https://developer.mozilla.org/en-US/docs/Web/CSS/cursor#Formal_syntax
  cursor?: CursorValue | undefined,
  // https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action#Formal_syntax
  touchAction?: TouchActionValue | undefined,
  // https://developer.mozilla.org/en-US/docs/Web/CSS/user-select#Formal_syntax_2
  userSelect?: UserSelect | undefined,
  willChange?: string | undefined
};

/**
 * Layout
 */

type OverflowValue = 'auto' | 'hidden' | 'scroll' | 'visible';
type VisiblilityValue = 'hidden' | 'visible';

export type LayoutStyles = {
  alignContent?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'stretch',
  alignItems?:
    | 'baseline'
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'stretch',
  alignSelf?:
    | 'auto'
    | 'baseline'
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'stretch'
  aspectRatio?: NumberOrString | undefined,
  backfaceVisibility?: VisiblilityValue | undefined,
  borderWidth?: DimensionValue | undefined,
  borderBlockWidth?: DimensionValue | undefined,
  borderBlockEndWidth?: DimensionValue | undefined,
  borderBlockStartWidth?: DimensionValue | undefined,
  borderBottomWidth?: DimensionValue | undefined,
  borderInlineWidth?: DimensionValue | undefined,
  borderInlineEndWidth?: DimensionValue | undefined,
  borderInlineStartWidth?: DimensionValue | undefined,
  borderLeftWidth?: DimensionValue | undefined,
  borderRightWidth?: DimensionValue | undefined,
  borderTopWidth?: DimensionValue | undefined,
  bottom?: DimensionValue | undefined,
  boxSizing?: 'border-box' | 'content-box' | 'padding-box' | undefined,
  columnGap?: DimensionValue | undefined,
  direction?: 'inherit' | 'ltr' | 'rtl' | undefined,
  display?: string | undefined,
  flex?: number | undefined,
  flexBasis?: DimensionValue | undefined,
  flexDirection?: 'column' | 'column-reverse' | 'row' | 'row-reverse' | undefined,
  flexGrow?: number | undefined,
  flexShrink?: number | undefined,
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse' | undefined,
  gap?: DimensionValue | undefined,
  height?: DimensionValue | undefined,
  inset?: DimensionValue | undefined,
  insetBlock?: DimensionValue | undefined,
  insetBlockEnd?: DimensionValue | undefined,
  insetBlockStart?: DimensionValue | undefined,
  insetInline?: DimensionValue | undefined,
  insetInlineEnd?: DimensionValue | undefined,
  insetInlineStart?: DimensionValue | undefined,
  justifyContent?: 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'space-evenly' | undefined,
  left?: DimensionValue | undefined,
  margin?: DimensionValue | undefined,
  marginBlock?: DimensionValue | undefined,
  marginBlockEnd?: DimensionValue | undefined,
  marginBlockStart?: DimensionValue | undefined,
  marginBottom?: DimensionValue | undefined,
  marginInline?: DimensionValue | undefined,
  marginInlineEnd?: DimensionValue | undefined,
  marginInlineStart?: DimensionValue | undefined,
  marginLeft?: DimensionValue | undefined,
  marginRight?: DimensionValue | undefined,
  marginTop?: DimensionValue | undefined,
  maxHeight?: DimensionValue | undefined,
  maxWidth?: DimensionValue | undefined,
  minHeight?: DimensionValue | undefined,
  minWidth?: DimensionValue | undefined,
  order?: number | undefined,
  overflow?: OverflowValue | undefined,
  overflowX?: OverflowValue | undefined,
  overflowY?: OverflowValue | undefined,
  padding?: DimensionValue | undefined,
  paddingBlock?: DimensionValue | undefined,
  paddingBlockEnd?: DimensionValue | undefined,
  paddingBlockStart?: DimensionValue | undefined,
  paddingBottom?: DimensionValue | undefined,
  paddingInline?: DimensionValue | undefined,
  paddingInlineEnd?: DimensionValue | undefined,
  paddingInlineStart?: DimensionValue | undefined,
  paddingLeft?: DimensionValue | undefined,
  paddingRight?: DimensionValue | undefined,
  paddingTop?: DimensionValue | undefined,
  position?: 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky' | undefined,
  right?: DimensionValue | undefined,
  rowGap?: DimensionValue | undefined,
  top?: DimensionValue | undefined,
  visibility?: VisiblilityValue | undefined,
  width?: DimensionValue | undefined,
  zIndex?: number | undefined,
  /**
   * @platform web
   */
  gridAutoColumns?: string | undefined,
  gridAutoFlow?: string | undefined,
  gridAutoRows?: string | undefined,
  gridColumnEnd?: string | undefined,
  gridColumnGap?: string | undefined,
  gridColumnStart?: string | undefined,
  gridRowEnd?: string | undefined,
  gridRowGap?: string | undefined,
  gridRowStart?: string | undefined,
  gridTemplateColumns?: string | undefined,
  gridTemplateRows?: string | undefined,
  gridTemplateAreas?: string | undefined,
  /**
   * @deprecated
   */
  borderEndWidth?: DimensionValue | undefined,
  borderStartWidth?: DimensionValue | undefined,
  end?: DimensionValue | undefined,
  marginHorizontal?: DimensionValue | undefined,
  marginEnd?: DimensionValue | undefined,
  marginStart?: DimensionValue | undefined,
  marginVertical?: DimensionValue | undefined,
  paddingHorizontal?: DimensionValue | undefined,
  paddingStart?: DimensionValue | undefined,
  paddingEnd?: DimensionValue | undefined,
  paddingVertical?: DimensionValue | undefined,
  start?: DimensionValue | undefined
  };

/**
 * Shadows
 */

export type ShadowStyles = {
  // @deprecated
  shadowColor?: ColorValue | undefined,
  shadowOffset?: {
    width?: DimensionValue,
    height?: DimensionValue
  } | undefined,
  shadowOpacity?: number | undefined,
  shadowRadius?: DimensionValue | undefined
};

/**
 * Transforms
 */

export type TransformStyles = {
  perspective?: NumberOrString | undefined,
  perspectiveOrigin?: string | undefined,
  transform?:
    | string
    | Array<
        | { perspective: NumberOrString }
        | { rotate: string }
        | { rotateX: string }
        | { rotateY: string }
        | { rotateZ: string }
        | { scale: number }
        | { scaleX: number }
        | { scaleY: number }
        | { scaleZ: number }
        | { scale3d: string }
        | { skewX: string }
        | { skewY: string }
        | { translateX: NumberOrString }
        | { translateY: NumberOrString }
        | { translateZ: NumberOrString }
        | { translate3d: string }
      >,
  transformOrigin?: string | Array<NumberOrString> | undefined,
  transformStyle?: 'flat' | 'preserve-3d' | undefined
};
