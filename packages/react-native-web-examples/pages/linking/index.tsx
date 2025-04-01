import { Linking, StyleSheet, Text } from 'react-native';
import React from 'react';
import Example from '../../shared/example';

const url = 'https://mathiasbynens.github.io/rel-noopener/malicious.html';

export default function LinkingPage(props) {
  const [, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log('adding listener');
    const listener = Linking.addEventListener('open', () => {
      console.log('onOpen event');
    });
    return () => {
      console.log('removing listener');
      listener.remove();
    };
  });

  function handlePress() {
    Linking.canOpenURL(url).then((supported) => {
      setCount((x) => x + 1);
      const v = Linking.openURL(url);
      return v;
    });
  }

  return (
    <Example title="Linking">
      <Text onPress={handlePress} style={styles.text}>
        Linking.openURL
      </Text>
      <Text
        // @ts-ignore the "href" prop is a RNW-specific prop, how to best augment rn's types in this scenario?
        href="https://mathiasbynens.github.io/rel-noopener/malicious.html"
        // @ts-ignore the "hrefAttrs" prop is a RNW-specific prop, how to best augment rn's types in this scenario?
        hrefAttrs={{
          target: '_blank'
        }}
        role="link"
        style={styles.text}
      >
        target="_blank"
      </Text>
    </Example>
  );
}

const styles = StyleSheet.create({
  text: {
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10
  }
});
