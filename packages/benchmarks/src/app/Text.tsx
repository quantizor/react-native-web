import React from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  StyleProp
} from 'react-native';
import { colors } from './theme';

class AppText extends React.Component<
  TextProps & { style?: StyleProp<TextStyle> }
> {
  static displayName = '@app/Text';

  render() {
    const { style, ...rest } = this.props;
    return <Text {...rest} style={[styles.baseText, style]} />;
  }
}

const styles = StyleSheet.create({
  baseText: {
    color: colors.textBlack,
    fontSize: 16,
    lineHeight: 21
  }
});

export default AppText;
