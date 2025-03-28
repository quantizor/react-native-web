/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import type { HoverEventsConfig } from '../../modules/useHover';
import type { PressResponderConfig } from '../../modules/usePressEvents/PressResponder';
import type { ViewProps, ViewRef } from '../View';

import * as React from 'react';
import { forwardRef, memo, useMemo, useState, useRef } from 'react';
import useMergeRefs from '../../modules/useMergeRefs';
import useHover from '../../modules/useHover';
import usePressEvents from '../../modules/usePressEvents';
import StyleSheet from '../StyleSheet';
import View from '../View';

export type StateCallbackType = {
  focused: boolean,
  hovered: boolean,
  pressed: boolean
};

type ViewStyleProp = ViewProps['style'];

interface Props extends Omit<ViewProps, 'style'> {
  children: React.ReactNode | ((state: StateCallbackType) => React.ReactNode),
  // Duration (in milliseconds) from `onPressIn` before `onLongPress` is called.
  delayLongPress?: number | undefined,
  // Duration (in milliseconds) from `onPressStart` is called after pointerdown
  delayPressIn?: number | undefined,
  // Duration (in milliseconds) from `onPressEnd` is called after pointerup.
  delayPressOut?: number | undefined,
  // Whether the press behavior is disabled.
  disabled?: boolean | undefined,
  // Called when the view is hovered
  onHoverIn?: HoverEventsConfig['onHoverStart'],
  // Called when the view is no longer hovered
  onHoverOut?: HoverEventsConfig['onHoverEnd'],
  // Called when this view's layout changes
  onLayout?: ViewProps['onLayout'],
  // Called when a long-tap gesture is detected.
  onLongPress?: PressResponderConfig['onLongPress'],
  // Called when a single tap gesture is detected.
  onPress?: PressResponderConfig['onPress'],
  // Called when a touch is engaged, before `onPress`.
  onPressIn?: PressResponderConfig['onPressStart'],
  // Called when a touch is moving, after `onPressIn`.
  onPressMove?: PressResponderConfig['onPressMove'],
  // Called when a touch is released, before `onPress`.
  onPressOut?: PressResponderConfig['onPressEnd'],
  style?: ViewStyleProp | ((state: StateCallbackType) => ViewStyleProp),
  /**
   * Used only for documentation or testing (e.g. snapshot testing).
   */
  testOnly_hovered?: boolean | undefined,
  testOnly_pressed?: boolean | undefined
};

/**
 * Component used to build display components that should respond to whether the
 * component is currently pressed or not.
 */
function Pressable(props: Props, forwardedRef: React.Ref<ViewRef>): React.ReactNode {
  const {
    children,
    delayLongPress,
    delayPressIn,
    delayPressOut,
    disabled,
    onBlur,
    onContextMenu,
    onFocus,
    onHoverIn,
    onHoverOut,
    onKeyDown,
    onLongPress,
    onPress,
    onPressMove,
    onPressIn,
    onPressOut,
    style,
    tabIndex,
    testOnly_hovered,
    testOnly_pressed,
    ...rest
  } = props;

  const [hovered, setHovered] = useForceableState(testOnly_hovered === true);
  const [focused, setFocused] = useForceableState(false);
  const [pressed, setPressed] = useForceableState(testOnly_pressed === true);

  const hostRef = useRef(null);
  const setRef = useMergeRefs(forwardedRef, hostRef);

  const pressConfig = useMemo(
    () => ({
      delayLongPress,
      delayPressStart: delayPressIn,
      delayPressEnd: delayPressOut,
      disabled,
      onLongPress,
      onPress,
      onPressChange: setPressed,
      onPressStart: onPressIn,
      onPressMove,
      onPressEnd: onPressOut
    }),
    [
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      onLongPress,
      onPress,
      onPressIn,
      onPressMove,
      onPressOut,
      setPressed
    ]
  );

  const pressEventHandlers = usePressEvents(hostRef, pressConfig);

  const { onContextMenu: onContextMenuPress, onKeyDown: onKeyDownPress } =
    pressEventHandlers;

  useHover(hostRef, {
    contain: true,
    disabled,
    onHoverChange: setHovered,
    onHoverStart: onHoverIn,
    onHoverEnd: onHoverOut
  });

  const interactionState = { hovered, focused, pressed };

  const blurHandler = React.useCallback(
    (e) => {
      if (e.nativeEvent.target === hostRef.current) {
        setFocused(false);
        if (onBlur != null) {
          onBlur(e);
        }
      }
    },
    [hostRef, setFocused, onBlur]
  );

  const focusHandler = React.useCallback(
    (e) => {
      if (e.nativeEvent.target === hostRef.current) {
        setFocused(true);
        if (onFocus != null) {
          onFocus(e);
        }
      }
    },
    [hostRef, setFocused, onFocus]
  );

  const contextMenuHandler = React.useCallback(
    (e) => {
      if (onContextMenuPress != null) {
        onContextMenuPress(e);
      }
      if (onContextMenu != null) {
        onContextMenu(e);
      }
    },
    [onContextMenu, onContextMenuPress]
  );

  const keyDownHandler = React.useCallback(
    (e) => {
      if (onKeyDownPress != null) {
        onKeyDownPress(e);
      }
      if (onKeyDown != null) {
        onKeyDown(e);
      }
    },
    [onKeyDown, onKeyDownPress]
  );

  let _tabIndex;
  if (tabIndex !== undefined) {
    _tabIndex = tabIndex;
  } else {
    _tabIndex = disabled ? -1 : 0;
  }

  return (
    <View
      {...rest}
      {...pressEventHandlers}
      aria-disabled={disabled}
      onBlur={blurHandler}
      onContextMenu={contextMenuHandler}
      onFocus={focusHandler}
      onKeyDown={keyDownHandler}
      ref={setRef}
      style={[
        disabled ? styles.disabled : styles.active,
        typeof style === 'function' ? style(interactionState) : style
      ]}
      tabIndex={_tabIndex}
    >
      {typeof children === 'function' ? children(interactionState) : children}
    </View>
  );
}

function useForceableState(forced: boolean): [boolean, (boolean) => void] {
  const [bool, setBool] = useState(false);
  return [bool || forced, setBool];
}

const styles = StyleSheet.create({
  active: {
    cursor: 'pointer',
    touchAction: 'manipulation'
  },
  disabled: {
    pointerEvents: 'box-none'
  }
} as const);

const MemoedPressable = memo(forwardRef(Pressable));
MemoedPressable.displayName = 'Pressable';

export default MemoedPressable;
