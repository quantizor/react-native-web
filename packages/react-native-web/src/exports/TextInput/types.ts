/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ColorValue, GenericStyleProp } from '../../types';
import type { TextStyle } from '../Text/types';
import type { ViewProps } from '../View/types';

export interface TextInputStyle extends TextStyle {
  caretColor?: ColorValue;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export interface TextInputProps extends Omit<ViewProps, 'dir'> {
  autoCapitalize?: 'characters' | 'none' | 'sentences' | 'words',
  autoComplete?: string | null,
  autoCompleteType?: string | null, // Compat with React Native (Bug react-native#26003)
  autoCorrect?: boolean | null,
  autoFocus?: boolean | null,
  blurOnSubmit?: boolean | null,
  caretHidden?: boolean | null,
  clearTextOnFocus?: boolean | null,
  defaultValue?: string | null,
  dir?: 'auto' | 'ltr' | 'rtl' | null,
  disabled?: boolean | null,
  enterKeyHint?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send',
  inputAccessoryViewID?: string | null,
  inputMode?:
    | 'decimal'
    | 'email'
    | 'none'
    | 'numeric'
    | 'search'
    | 'tel'
    | 'text'
    | 'url',
  maxLength?: number | null,
  multiline?: boolean | null,
  onChange?: (e: any) => void,
  onChangeText?: (e: string) => void,
  onContentSizeChange?: (e: any) => void,
  onEndEditing?: (e: any) => void,
  onKeyPress?: (e: any) => void,
  onSelectionChange?: (e: any) => void,
  onScroll?: (e: any) => void,
  onSubmitEditing?: (e: any) => void,
    placeholder?: string | null,
  placeholderTextColor?: ColorValue | null,
  readOnly?: boolean | null,
  rows?: number | null,
  secureTextEntry?: boolean | null,
  selectTextOnFocus?: boolean | null,
  selection?: {
    start: number,
    end?: number
  },
  selectionColor?: ColorValue | null,
  showSoftInputOnFocus?: boolean | null,
  spellCheck?: boolean | null,
  style?: GenericStyleProp<TextInputStyle> | null,
  value?: string | null,
  // deprecated
  editable?: boolean | null,
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
  numberOfLines?: number | null,
  returnKeyType?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send'
};
