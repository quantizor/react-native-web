/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Animated, ViewProps as RNViewProps, ViewStyle as RNViewStyle, StyleProp } from 'react-native';
import type { LayoutEvent, PlatformMethods } from '../../types';


type idRef = string;
type idRefList = idRef | Array<idRef>;

// TODO: investigate using RN types directly
export type AccessibilityProps = {
  'aria-activedescendant'?: idRef | undefined,
  'aria-atomic'?: boolean | undefined,
  'aria-autocomplete'?: 'none' | 'list' | 'inline' | 'both' | undefined,
  'aria-busy'?: boolean | undefined,
  'aria-checked'?: boolean | 'mixed' | undefined,
  'aria-colcount'?: number | undefined,
  'aria-colindex'?: number | undefined,
  'aria-colspan'?: number | undefined,
  'aria-controls'?: idRef | undefined,
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time' | undefined,
  'aria-describedby'?: idRef | undefined,
  'aria-details'?: idRef | undefined,
  'aria-disabled'?: boolean | undefined,
  'aria-errormessage'?: idRef | undefined,
  'aria-expanded'?: boolean | undefined,
  'aria-flowto'?: idRef | undefined,
  'aria-haspopup'?: 'dialog' | 'grid' | 'listbox' | 'menu' | 'tree' | false | undefined,
  'aria-hidden'?: boolean | undefined,
  'aria-invalid'?: boolean | undefined,
  'aria-keyshortcuts'?: string[] | undefined,
  'aria-label'?: string | undefined,
  'aria-labelledby'?: idRef | undefined,
  'aria-level'?: number | undefined,
  'aria-live'?: 'assertive' | 'none' | 'polite' | undefined,
  'aria-modal'?: boolean | undefined,
  'aria-multiline'?: boolean | undefined,
  'aria-multiselectable'?: boolean | undefined,
  'aria-orientation'?: 'horizontal' | 'vertical' | undefined,
  'aria-owns'?: idRef | undefined,
  'aria-placeholder'?: string | undefined,
  'aria-posinset'?: number | undefined,
  'aria-pressed'?: boolean | 'mixed' | undefined,
  'aria-readonly'?: boolean | undefined,
  'aria-required'?: boolean | undefined,
  'aria-roledescription'?: string | undefined,
  'aria-rowcount'?: number | undefined,
  'aria-rowindex'?: number | undefined,
  'aria-rowspan'?: number | undefined,
  'aria-selected'?: boolean | undefined,
  'aria-setsize'?: number | undefined,
  'aria-sort'?: 'ascending' | 'descending' | 'none' | 'other' | undefined,
  'aria-valuemax'?: number | undefined,
  'aria-valuemin'?: number | undefined,
  'aria-valuenow'?: number | undefined,
  'aria-valuetext'?: string | undefined,
  role?: string | undefined,

  // @deprecated
  accessibilityActiveDescendant?: idRef | undefined,
  accessibilityAtomic?: boolean | undefined,
    accessibilityAutoComplete?: 'none' | 'list' | 'inline' | 'both' | undefined,
  accessibilityBusy?: boolean | undefined,
  accessibilityChecked?: boolean | 'mixed' | undefined,
  accessibilityColumnCount?: number | undefined,
  accessibilityColumnIndex?: number | undefined,
  accessibilityColumnSpan?: number | undefined,
  accessibilityControls?: idRefList | undefined,
  accessibilityCurrent?: boolean | 'page' | 'step' | 'location' | 'date' | 'time' | undefined,
  accessibilityDescribedBy?: idRefList | undefined,
  accessibilityDetails?: idRef | undefined,
  accessibilityDisabled?: boolean | undefined,
  accessibilityErrorMessage?: idRef | undefined,
  accessibilityExpanded?: boolean | undefined,
  accessibilityFlowTo?: idRefList | undefined,
  accessibilityHasPopup?: 'dialog' | 'grid' | 'listbox' | 'menu' | 'tree' | false | undefined,
  accessibilityHidden?: boolean | undefined,
  accessibilityInvalid?: boolean | undefined,
  accessibilityKeyShortcuts?: string[] | undefined,
  accessibilityLabel?: string | undefined,
  accessibilityLabelledBy?: idRefList | undefined,
  accessibilityLevel?: number | undefined,
  accessibilityLiveRegion?: 'assertive' | 'none' | 'polite' | undefined,
  accessibilityModal?: boolean | undefined,
  accessibilityMultiline?: boolean | undefined,
  accessibilityMultiSelectable?: boolean | undefined,
  accessibilityOrientation?: 'horizontal' | 'vertical' | undefined,
  accessibilityOwns?: idRefList | undefined,
  accessibilityPlaceholder?: string | undefined,
  accessibilityPosInSet?: number | undefined,
  accessibilityPressed?: boolean | 'mixed' | undefined,
  accessibilityReadOnly?: boolean | undefined,
  accessibilityRequired?: boolean | undefined,
  accessibilityRole?: string | undefined,
  accessibilityRoleDescription?: string | undefined,
  accessibilityRowCount?: number | undefined,
  accessibilityRowIndex?: number | undefined,
  accessibilityRowSpan?: number | undefined,
  accessibilitySelected?: boolean | undefined,
  accessibilitySetSize?: number | undefined,
  accessibilitySort?: 'ascending' | 'descending' | 'none' | 'other' | undefined,
  accessibilityValueMax?: number | undefined,
  accessibilityValueMin?: number | undefined,
  accessibilityValueNow?: number | undefined,
  accessibilityValueText?: string | undefined,
};

export type EventProps = {
  onAuxClick?: (e: any) => void,
  onBlur?: (e: any) => void,
  onClick?: (e: any) => void,
  onContextMenu?: (e: any) => void,
  onFocus?: (e: any) => void,
  onGotPointerCapture?: (e: any) => void,
  onKeyDown?: (e: any) => void,
  onKeyUp?: (e: any) => void,
  onLayout?: (e: LayoutEvent) => void,
  onLostPointerCapture?: (e: any) => void,
  onMoveShouldSetResponder?: (e: any) => boolean,
  onMoveShouldSetResponderCapture?: (e: any) => boolean,
  onPointerCancel?: (e: any) => void,
  onPointerDown?: (e: any) => void,
  onPointerEnter?: (e: any) => void,
  onPointerMove?: (e: any) => void,
  onPointerLeave?: (e: any) => void,
  onPointerOut?: (e: any) => void,
  onPointerOver?: (e: any) => void,
  onPointerUp?: (e: any) => void,
  onResponderEnd?: (e: any) => void,
  onResponderGrant?: (e: any) => void | boolean,
  onResponderMove?: (e: any) => void,
  onResponderReject?: (e: any) => void,
  onResponderRelease?: (e: any) => void,
  onResponderStart?: (e: any) => void,
  onResponderTerminate?: (e: any) => void,
  onResponderTerminationRequest?: (e: any) => boolean,
  onScrollShouldSetResponder?: (e: any) => boolean,
  onScrollShouldSetResponderCapture?: (e: any) => boolean,
  onSelectionChangeShouldSetResponder?: (e: any) => boolean,
  onSelectionChangeShouldSetResponderCapture?: (e: any) => boolean,
  onStartShouldSetResponder?: (e: any) => boolean,
  onStartShouldSetResponderCapture?: (e: any) => boolean,
  // unstable
  onMouseDown?: (e: any) => void,
  onMouseEnter?: (e: any) => void,
  onMouseLeave?: (e: any) => void,
  onMouseMove?: (e: any) => void,
  onMouseOver?: (e: any) => void,
  onMouseOut?: (e: any) => void,
  onMouseUp?: (e: any) => void,
  onScroll?: (e: any) => void,
  onTouchCancel?: (e: any) => void,
  onTouchCancelCapture?: (e: any) => void,
  onTouchEnd?: (e: any) => void,
  onTouchEndCapture?: (e: any) => void,
  onTouchMove?: (e: any) => void,
  onTouchMoveCapture?: (e: any) => void,
  onTouchStart?: (e: any) => void,
  onTouchStartCapture?: (e: any) => void,
  onWheel?: (e: any) => void
};

type ExcludeAnimated<T> = {
  [K in keyof T]: T[K] extends Animated.AnimatedNode ? never : T[K];
};

type ViewStyleWithoutAnimated = ExcludeAnimated<RNViewStyle>;

export type ViewStyle = React.CSSProperties & {
  [K in Exclude<keyof ViewStyleWithoutAnimated, keyof React.CSSProperties>]?: ViewStyleWithoutAnimated[K];
};

export type ViewProps = AccessibilityProps & EventProps & Pick<RNViewProps, 'children' | 'tabIndex' | 'testID' | 'focusable' | 'pointerEvents' | 'nativeID'> & Omit<React.HTMLAttributes<HTMLElement>, 'style' | 'dir'> & {
  dir?: 'ltr' | 'rtl' | undefined,
  ref?: React.Ref<HTMLElement & PlatformMethods>,
  style?: StyleProp<ViewStyle>,
  // unstable
  href?: string | undefined,
  hrefAttrs?: { download?: boolean, rel?: string, target?: string },
};
