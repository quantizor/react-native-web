/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  Animated,
  ViewProps as RNViewProps,
  ViewStyle as RNViewStyle,
  StyleProp
} from 'react-native';
import type { LayoutEvent, PlatformMethods } from '../../types';

type idRef = string;
type idRefList = idRef | Array<idRef>;

// TODO: investigate using RN types directly
export type AccessibilityProps = {
  'aria-activedescendant'?: idRef | undefined;
  'aria-atomic'?: boolean | undefined;
  'aria-autocomplete'?: 'none' | 'list' | 'inline' | 'both' | undefined;
  'aria-busy'?: boolean | undefined;
  'aria-checked'?: boolean | 'mixed' | undefined;
  'aria-colcount'?: number | undefined;
  'aria-colindex'?: number | undefined;
  'aria-colspan'?: number | undefined;
  'aria-controls'?: idRef | undefined;
  'aria-current'?:
    | boolean
    | 'page'
    | 'step'
    | 'location'
    | 'date'
    | 'time'
    | undefined;
  'aria-describedby'?: idRef | undefined;
  'aria-details'?: idRef | undefined;
  'aria-disabled'?: boolean | undefined;
  'aria-errormessage'?: idRef | undefined;
  'aria-expanded'?: boolean | undefined;
  'aria-flowto'?: idRef | undefined;
  'aria-haspopup'?:
    | 'dialog'
    | 'grid'
    | 'listbox'
    | 'menu'
    | 'tree'
    | false
    | undefined;
  'aria-hidden'?: boolean | undefined;
  'aria-invalid'?: boolean | undefined;
  'aria-keyshortcuts'?: string[] | undefined;
  'aria-label'?: string | undefined;
  'aria-labelledby'?: idRef | undefined;
  'aria-level'?: number | undefined;
  'aria-live'?: 'assertive' | 'none' | 'polite' | undefined;
  'aria-modal'?: boolean | undefined;
  'aria-multiline'?: boolean | undefined;
  'aria-multiselectable'?: boolean | undefined;
  'aria-orientation'?: 'horizontal' | 'vertical' | undefined;
  'aria-owns'?: idRef | undefined;
  'aria-placeholder'?: string | undefined;
  'aria-posinset'?: number | undefined;
  'aria-pressed'?: boolean | 'mixed' | undefined;
  'aria-readonly'?: boolean | undefined;
  'aria-required'?: boolean | undefined;
  'aria-roledescription'?: string | undefined;
  'aria-rowcount'?: number | undefined;
  'aria-rowindex'?: number | undefined;
  'aria-rowspan'?: number | undefined;
  'aria-selected'?: boolean | undefined;
  'aria-setsize'?: number | undefined;
  'aria-sort'?: 'ascending' | 'descending' | 'none' | 'other' | undefined;
  'aria-valuemax'?: number | undefined;
  'aria-valuemin'?: number | undefined;
  'aria-valuenow'?: number | undefined;
  'aria-valuetext'?: string | undefined;
  role?: string | undefined;

  // @deprecated
  accessibilityActiveDescendant?: idRef | undefined;
  accessibilityAtomic?: boolean | undefined;
  accessibilityAutoComplete?: 'none' | 'list' | 'inline' | 'both' | undefined;
  accessibilityBusy?: boolean | undefined;
  accessibilityChecked?: boolean | 'mixed' | undefined;
  accessibilityColumnCount?: number | undefined;
  accessibilityColumnIndex?: number | undefined;
  accessibilityColumnSpan?: number | undefined;
  accessibilityControls?: idRefList | undefined;
  accessibilityCurrent?:
    | boolean
    | 'page'
    | 'step'
    | 'location'
    | 'date'
    | 'time'
    | undefined;
  accessibilityDescribedBy?: idRefList | undefined;
  accessibilityDetails?: idRef | undefined;
  accessibilityDisabled?: boolean | undefined;
  accessibilityErrorMessage?: idRef | undefined;
  accessibilityExpanded?: boolean | undefined;
  accessibilityFlowTo?: idRefList | undefined;
  accessibilityHasPopup?:
    | 'dialog'
    | 'grid'
    | 'listbox'
    | 'menu'
    | 'tree'
    | false
    | undefined;
  accessibilityHidden?: boolean | undefined;
  accessibilityInvalid?: boolean | undefined;
  accessibilityKeyShortcuts?: string[] | undefined;
  accessibilityLabel?: string | undefined;
  accessibilityLabelledBy?: idRefList | undefined;
  accessibilityLevel?: number | undefined;
  accessibilityLiveRegion?: 'assertive' | 'none' | 'polite' | undefined;
  accessibilityModal?: boolean | undefined;
  accessibilityMultiline?: boolean | undefined;
  accessibilityMultiSelectable?: boolean | undefined;
  accessibilityOrientation?: 'horizontal' | 'vertical' | undefined;
  accessibilityOwns?: idRefList | undefined;
  accessibilityPlaceholder?: string | undefined;
  accessibilityPosInSet?: number | undefined;
  accessibilityPressed?: boolean | 'mixed' | undefined;
  accessibilityReadOnly?: boolean | undefined;
  accessibilityRequired?: boolean | undefined;
  accessibilityRole?: string | undefined;
  accessibilityRoleDescription?: string | undefined;
  accessibilityRowCount?: number | undefined;
  accessibilityRowIndex?: number | undefined;
  accessibilityRowSpan?: number | undefined;
  accessibilitySelected?: boolean | undefined;
  accessibilitySetSize?: number | undefined;
  accessibilitySort?: 'ascending' | 'descending' | 'none' | 'other' | undefined;
  accessibilityValueMax?: number | undefined;
  accessibilityValueMin?: number | undefined;
  accessibilityValueNow?: number | undefined;
  accessibilityValueText?: string | undefined;
};

// TODO: investigate overlap, why are RN types reimplemented here vs just added DOM ones?
export type EventProps = {
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onAuxClick?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onBlur?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onClick?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onContextMenu?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onFocus?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onGotPointerCapture?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onKeyDown?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onKeyUp?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onLayout?: (e: LayoutEvent) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onLostPointerCapture?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onMoveShouldSetResponder?: (e: any) => boolean;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onMoveShouldSetResponderCapture?: (e: any) => boolean;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onPointerCancel?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onPointerDown?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onPointerEnter?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onPointerMove?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onPointerLeave?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onPointerOut?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onPointerOver?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onPointerUp?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onResponderEnd?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onResponderGrant?: (e: any) => void | boolean;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onResponderMove?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onResponderReject?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onResponderRelease?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onResponderStart?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onResponderTerminate?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onResponderTerminationRequest?: (e: any) => boolean;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onScrollShouldSetResponder?: (e: any) => boolean;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onScrollShouldSetResponderCapture?: (e: any) => boolean;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onSelectionChangeShouldSetResponder?: (e: any) => boolean;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onSelectionChangeShouldSetResponderCapture?: (e: any) => boolean;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onStartShouldSetResponder?: (e: any) => boolean;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onStartShouldSetResponderCapture?: (e: any) => boolean;
  // unstable
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onMouseDown?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onMouseEnter?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onMouseLeave?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onMouseMove?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onMouseOver?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onMouseOut?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onMouseUp?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onScroll?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onTouchCancel?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onTouchCancelCapture?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onTouchEnd?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onTouchEndCapture?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onTouchMove?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onTouchMoveCapture?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onTouchStart?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onTouchStartCapture?: (e: any) => void;
  /** Added by react-native-web, it will probably be ignored for other platforms. */
  onWheel?: (e: any) => void;
};

type ExcludeAnimated<T> = {
  [K in keyof T]: T[K] extends Animated.AnimatedNode ? never : T[K];
};

type ViewStyleWithoutAnimated = ExcludeAnimated<RNViewStyle>;

export type ViewStyle = Omit<React.CSSProperties, 'pointerEvents'> & {
  [K in Exclude<
    keyof ViewStyleWithoutAnimated,
    keyof React.CSSProperties
  >]?: ViewStyleWithoutAnimated[K];
} & {
  // for certain styles we'll refine them manually to get the right type (see createDOMProps)
  pointerEvents?:
    | ViewStyleWithoutAnimated['pointerEvents']
    | React.CSSProperties['pointerEvents'];
};

export type ViewProps = AccessibilityProps &
  EventProps &
  Pick<
    RNViewProps,
    | 'children'
    | 'tabIndex'
    | 'testID'
    | 'focusable'
    | 'pointerEvents'
    | 'nativeID'
  > &
  Omit<
    React.HTMLAttributes<HTMLElement>,
    'style' | 'dir' | keyof EventProps
  > & {
    dir?: 'ltr' | 'rtl' | 'auto' | undefined;
    ref?: React.Ref<HTMLElement & PlatformMethods>;
    style?: StyleProp<ViewStyle>;
    // unstable
    href?: string | undefined;
    hrefAttrs?: { download?: boolean; rel?: string; target?: string };
  };
