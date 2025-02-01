import React from 'react';
import { WebView } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';

// Definiowanie typu dla parametrów route
type WebViewScreenRouteProp = RouteProp<{ WebViewScreen: { url: string } }, 'WebViewScreen'>;

type WebViewScreenProps = {
  route: WebViewScreenRouteProp;
};

const WebViewScreen: React.FC<WebViewScreenProps> = ({ route }) => {
  const { url } = route.params; // Pobieramy URL z route.params

  return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
};

export default WebViewScreen;
