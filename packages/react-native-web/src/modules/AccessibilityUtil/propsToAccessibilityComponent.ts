/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import propsToAriaRole from './propsToAriaRole';

const roleComponents = {
  article: 'article',
  banner: 'header',
  blockquote: 'blockquote',
  button: 'button',
  code: 'code',
  complementary: 'aside',
  contentinfo: 'footer',
  deletion: 'del',
  emphasis: 'em',
  figure: 'figure',
  insertion: 'ins',
  form: 'form',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  paragraph: 'p',
  region: 'section',
  strong: 'strong'
} as Record<string, keyof React.JSX.IntrinsicElements>;

const emptyObject = {};

const propsToAccessibilityComponent = (
  props: React.ComponentProps<any> = emptyObject
): undefined | keyof React.JSX.IntrinsicElements => {
  const roleProp = props.role || props.accessibilityRole;
  // special-case for "label" role which doesn't map to an ARIA role
  if (roleProp === 'label') {
    return 'label';
  }

  const role = propsToAriaRole(props);
  if (role) {
    if (role === 'heading') {
      const level = props.accessibilityLevel || props['aria-level'];
      if (level != null) {
        return `h${level}` as keyof React.JSX.IntrinsicElements;
      }
      return 'h1';
    }
    return roleComponents[role];
  }
};

export default propsToAccessibilityComponent;
