import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Feed from './pages/Feed';

const { Navigator, Screen } = createStackNavigator();

import logo from './assets/instagram.png';

function Routes() {
  return (
    <NavigationContainer>
      <Navigator headerMode="screen">
        <Screen
          name="Feed"
          component={Feed}
          options={{
            headerStyle: {
              backgroundColor: '#f5f5f5',
            },
            headerTitle: () => <Image source={logo} />,
            headerTitleAlign: 'center',
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;
