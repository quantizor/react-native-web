// @ts-expect-error react-native no longer exports CheckBox but rnw does
import { CheckBox, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import Example from '../../shared/example';

function Divider() {
  return <View style={styles.divider} />;
}

export default function CheckboxPage() {
  const [checked, setChecked] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setChecked(!checked);
    }, 2500);
    return () => {
      clearInterval(interval);
    };
  }, [checked]);

  return (
    <Example title="CheckBox">
      <Text style={styles.title}>
        This component was removed from react-native proper, but is retained in
        react-native-web for backward compatibility... for now.
      </Text>

      <View style={styles.row}>
        <CheckBox disabled value={false} />
        <Divider />
        <CheckBox disabled value={true} />
        <Divider />
        <CheckBox aria-readonly value={true} />
      </View>
      <View style={styles.row}>
        <CheckBox value={false} />
        <Divider />
        <CheckBox value={true} />
      </View>
      <View style={styles.row}>
        <CheckBox color="#1DA1F2" value={true} />
        <Divider />
        <CheckBox color="#17BF63" value={true} />
        <Divider />
        <CheckBox color="#FFAD1F" value={true} />
        <Divider />
        <CheckBox color="#F45D22" value={true} />
        <Divider />
        <CheckBox color="#794BC4" value={true} />
        <Divider />
        <CheckBox color="#E0245E" value={true} />
      </View>
      <View style={styles.row}>
        <CheckBox
          color="#1DA1F2"
          style={{ height: 32, width: 32 }}
          value={checked}
        />
      </View>
    </Example>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20
  },
  divider: {
    width: 10
  },
  title: {
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center'
  }
});
