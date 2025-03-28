/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import StyleSheet from '../StyleSheet';
import Text from '../Text';
import TouchableOpacity from '../TouchableOpacity';

type ButtonProps = {
  accessibilityLabel?: string | null | undefined,
  color?: string | null | undefined,
  disabled?: boolean,
  onPress?: ((e: any) => void) | null | undefined,
  testID?: string | null | undefined,
  title: string
};

const Button = React.forwardRef((props: ButtonProps, forwardedRef: React.Ref<typeof TouchableOpacity>) => {
  const { accessibilityLabel, color, disabled, onPress, testID, title } = props;

  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      disabled={disabled}
      focusable={!disabled}
      onPress={onPress}
      ref={forwardedRef}
      style={[
        styles.button,
        color && { backgroundColor: color },
        disabled && styles.buttonDisabled
      ]}
      testID={testID}
    >
      <Text style={[styles.text, disabled && styles.textDisabled]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
});

Button.displayName = 'Button';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 2
  },
  text: {
    color: '#fff',
    fontWeight: '500',
    padding: 8,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  buttonDisabled: {
    backgroundColor: '#dfdfdf'
  },
  textDisabled: {
    color: '#a1a1a1'
  }
});

export type { ButtonProps };

export default Button;
