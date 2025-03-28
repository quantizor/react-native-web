/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ViewProps, ViewRef } from '../View';

import * as React from 'react';
import View from '../View';
import StyleSheet from '../StyleSheet';
import canUseDOM from '../../modules/canUseDom';

export interface ModalContentProps extends ViewProps {
  active?: boolean | (() => boolean),
  children?: React.ReactNode,
  onRequestClose?: () => void,
  transparent?: boolean
};

const ModalContent = React.forwardRef((props: ModalContentProps, forwardedRef: React.Ref<ViewRef>) => {
  const { active, children, onRequestClose, transparent, ...rest } = props;

  React.useEffect(() => {
    if (canUseDOM) {
      const closeOnEscape = (e: KeyboardEvent) => {
        if (active && e.key === 'Escape') {
          e.stopPropagation();
          if (onRequestClose) {
            onRequestClose();
          }
        }
      };
      document.addEventListener('keyup', closeOnEscape, false);
      return () => document.removeEventListener('keyup', closeOnEscape, false);
    }
  }, [active, onRequestClose]);

  const style = React.useMemo(() => {
    return [
      styles.modal,
      transparent ? styles.modalTransparent : styles.modalOpaque
    ];
  }, [transparent]);

  return (
    <View
      {...rest}
      aria-modal={true}
      ref={forwardedRef}
      role={active ? 'dialog' : undefined}
      style={style}
    >
      <View style={styles.container}>{children}</View>
    </View>
  );
});

const styles = StyleSheet.create({
  modal: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  modalTransparent: {
    backgroundColor: 'transparent'
  },
  modalOpaque: {
    backgroundColor: 'white'
  },
  container: {
    top: 0,
    flex: 1
  }
} as const);

export default ModalContent;
