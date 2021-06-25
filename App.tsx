import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

import {ENV} from './src/lib/constants';
import Home from './src/screens/Home/Home';

// prepare GraphQL client
const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: ENV,
  cache,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Home />
      </SafeAreaView>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
