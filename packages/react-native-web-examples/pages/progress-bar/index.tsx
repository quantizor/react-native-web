import React from 'react';
// @ts-expect-error RN removed ProgressBar at some point
import { ProgressBar, StyleSheet, View, Text } from 'react-native';
import Example from '../../shared/example';

function Divider() {
  return <View style={styles.divider} />;
}

export default function ProgressBarPage() {
  return (
    <Example title="ProgressBar">
      <Text style={styles.title}>
        This component was removed from react-native proper, but is retained in
        react-native-web for backward compatibility... for now.
      </Text>

      <View style={styles.container}>
        <Divider />
        <ProgressBar indeterminate trackColor="#D1E3F6" />
        <Divider />
        <ProgressBar color="#1DA1F2" progress={0.2} />
        <Divider />
        <ProgressBar color="#17BF63" progress={0.4} />
        <Divider />
        <ProgressBar color="#F45D22" progress={0.6} />
        <Divider />
        <ProgressBar color="#794BC4" progress={0.8} />
        <Divider />
        <ProgressBar color="#E0245E" progress={1} />
        <Divider />
        <ProgressBar
          color="rgb(23, 191, 99)"
          progress={0.1}
          trackColor="rgba(23, 191, 99, 0.3)"
        />
        <Divider />
        <ProgressBar
          color="rgb(244, 93, 34)"
          progress={0.2}
          trackColor="rgba(244, 93, 34, 0.3)"
        />
        <Divider />
        <ProgressBar
          color="rgb(121, 75, 196)"
          progress={0.3}
          trackColor="rgba(121, 75, 196, 0.3)"
        />
        <Divider />
        <ProgressBar
          color="#1DA1F2"
          progress={0.33}
          style={styles.custom}
          trackColor="#D1E3F6"
        />
      </View>
    </Example>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    padding: 16
  },
  divider: {
    height: 16
  },
  custom: {
    borderRadius: 10,
    height: 20
  },
  title: {
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center'
  }
});
