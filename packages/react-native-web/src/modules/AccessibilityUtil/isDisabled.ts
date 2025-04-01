/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { AccessibilityProps } from 'react-native';

const isDisabled = (props: {
  disabled?: boolean | null | undefined;
  accessibilityStates?: string[] | null | undefined;
}): boolean =>
  props.disabled ||
  (Array.isArray(props.accessibilityStates) &&
    props.accessibilityStates.indexOf('disabled') > -1);

export default isDisabled;
