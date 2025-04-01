// THIS IS A MODULE AUGUMENTATION THAT ADDS RNW-SPECIFIC FUNCTIONALITY TO RN BASE TYPES

import type from 'react-native';
import type { EventProps } from 'react-native-web';

declare module 'react-native' {
  interface LinkingStatic {
    addEventListener(
      event: 'url' | 'open',
      callback: () => void
    ): { remove: () => void };
  }

  interface PressableStateCallbackType {
    readonly pressed: boolean;
    /** This is added by react-native-web, it will not be present for other platforms. */
    readonly focused: boolean;
    /** This is added by react-native-web, it will not be present for other platforms. */
    readonly hovered: boolean;
  }

  interface SwitchProps {
    // augmentation currently not working because RN's type is too strict to be augmented
    trackColor?:
      | {
          false?: ColorValue | undefined;
          true?: ColorValue | undefined;
        }
      | string;
  }

  interface ViewProps
    extends Omit<
      EventProps,
      // omitting overlap that probably should be removed in RNW as well
      | 'onResponderGrant'
      | 'onResponderMove'
      | 'onResponderReject'
      | 'onResponderRelease'
      | 'onResponderStart'
      | 'onResponderTerminate'
      | 'onResponderTerminationRequest'
      | 'onStartShouldSetResponder'
      | 'onStartShouldSetResponderCapture'
    > {
    dir?: 'ltr' | 'rtl' | 'auto';
  }

  interface TextProps {
    href?: string | undefined;
    hrefAttrs?: { download?: boolean; rel?: string; target?: string };
  }
}
