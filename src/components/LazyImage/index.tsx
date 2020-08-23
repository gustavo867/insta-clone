import React, { useState, useEffect } from 'react';
import { ImageSourcePropType, Animated } from 'react-native';

import { Small, Original } from './styles';

const OriginalAnimated = Animated.createAnimatedComponent(Original);

interface Props {
  smallSource: ImageSourcePropType;
  source: ImageSourcePropType;
  aspectRatio: number;
  shouldLoad?: boolean;
}

const LazyImage: React.FC<Props> = ({ smallSource, source, aspectRatio }) => {
  const opacity = new Animated.Value(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);

  function handleAnimate() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Small
      source={smallSource}
      ratio={aspectRatio}
      resizeMode="contain"
      blurRadius={2.5}
    >
      {loaded && (
        <OriginalAnimated
          source={source}
          ratio={aspectRatio}
          resizeMode="contain"
          onLoadEnd={handleAnimate}
          style={{ opacity }}
        />
      )}
    </Small>
  );
};

export default LazyImage;
