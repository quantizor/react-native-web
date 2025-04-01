/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { StyleProp } from 'react-native';
import type { ColorValue } from '../../types';
import type { TextStyle } from '../Text/types';
import type { ViewProps } from '../View/types';

export interface TextInputStyle extends TextStyle {
  caretColor?: ColorValue;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export interface TextInputProps extends Omit<ViewProps, 'autoCorrect' | 'dir' | 'style'> {
  autoCapitalize?: 'characters' | 'none' | 'sentences' | 'words',
  autoComplete?: string | undefined,
  autoCompleteType?: string | undefined, // Compat with React Native (Bug react-native#26003)
  autoCorrect?: boolean | undefined,
  autoFocus?: boolean | undefined,
  blurOnSubmit?: boolean | undefined,
  caretHidden?: boolean | undefined,
  clearTextOnFocus?: boolean | undefined,
  defaultValue?: string | undefined,
  dir?: 'auto' | 'ltr' | 'rtl' | undefined,
  disabled?: boolean | undefined,
  enterKeyHint?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send',
  inputAccessoryViewID?: string | undefined,
  inputMode?:
    | 'decimal'
    | 'email'
    | 'none'
    | 'numeric'
    | 'search'
    | 'tel'
    | 'text'
    | 'url',
  maxLength?: number | undefined,
  multiline?: boolean | undefined,
  onChange?: (e: any) => void,
  onChangeText?: (e: string) => void,
  onContentSizeChange?: (e: any) => void,
  onEndEditing?: (e: any) => void,
  onKeyPress?: (e: any) => void,
  onSelectionChange?: (e: any) => void,
  onScroll?: (e: any) => void,
  onSubmitEditing?: (e: any) => void,
    placeholder?: string | undefined,
  placeholderTextColor?: ColorValue | undefined,
  readOnly?: boolean | undefined,
  rows?: number | undefined,
  secureTextEntry?: boolean | undefined,
  selectTextOnFocus?: boolean | undefined,
  selection?: {
    start: number,
    end?: number
  },
  selectionColor?: ColorValue | undefined,
  showSoftInputOnFocus?: boolean | undefined,
  spellCheck?: boolean | undefined,
  style?: StyleProp<TextInputStyle> | undefined,
  value?: string | undefined,
  // deprecated
  editable?: boolean | undefined,
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'number-pad'
    | 'numbers-and-punctuation'
    | 'numeric'
    | 'phone-pad'
    | 'search'
    | 'url'
    | 'web-search'
    | 'decimal-pad',
  numberOfLines?: number | undefined,
  returnKeyType?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send'
};
