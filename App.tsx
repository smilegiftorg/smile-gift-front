import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'react-native';
import { TabNavigator } from './src/navigation/TabNavigator';
import { Colors } from './src/constants/colors';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 1000,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.primary[700]}
        />
        <TabNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;