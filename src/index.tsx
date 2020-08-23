import React from 'react';
import Routes from './routes';
import { StatusBar } from 'react-native';

const src: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <Routes />
    </>
  );
};

export default src;
