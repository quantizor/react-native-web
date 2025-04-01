import React from 'react';
import { Dimensions, Text } from 'react-native';
import Example from '../../shared/example';

export default function DimensionsPage() {
  const [screenDims, setScreen] = React.useState({});
  const [windowDims, setWindow] = React.useState({});

  React.useEffect(() => {
    const handleChange = ({ screen, window: win }) => {
      setScreen(screen);
      setWindow(win);
    };

    const subscription = Dimensions.addEventListener('change', handleChange);

    handleChange({
      screen: Dimensions.get('screen'),
      window: Dimensions.get('window')
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Example title="Dimensions">
      <Text style={{ marginVertical: 16 }}>
        window: {JSON.stringify(windowDims, null, 2)}
      </Text>
      <Text>screen: {JSON.stringify(screenDims, null, 2)}</Text>
    </Example>
  );
}
