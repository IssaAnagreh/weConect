import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useQuery, gql} from '@apollo/client';

import {GET_URLS} from '../../lib/queries';
import WebViewer from '../WebViewer/WebViewer';

const GET_URLS_QUERY = gql`
  ${GET_URLS}
`;

export default function Home() {
  // call the urls api.
  const {loading, error, data} = useQuery(GET_URLS_QUERY);
  // urls data state.
  const [urls, setUrls] = useState([{name: '', title: '', url: ''}]);
  // webs modal controller
  const [showModal, setShowModal] = useState(false);
  // webs modal url controller
  const [url, setUrl] = useState('');

  // check if the graphQL has any error.
  // in here because I don't any server to receive the response from, I updated the data manually.
  useEffect(() => {
    if (!error) {
      setUrls([
        {
          name: 'We-Conect',
          title: 'We-Conect Home page',
          url: 'https://www.we-conect.com/',
        },
        {
          name: 'Google',
          title: 'Google Home page',
          url: 'https://www.google.de',
        },
      ]);
    }
  }, [error]);

  // impossible to happen because I don't have a server to receive data from.
  useEffect(() => {
    if (!!data) {
      setUrls(data);
    }
  }, [data]);

  // modal being shown automatically the time url is being updated
  useEffect(() => {
    !url ? setShowModal(false) : setShowModal(true);
  }, [url]);

  const renderItem = useCallback(
    ({
      item,
      index,
    }: {
      item: {name: string; title: string; url: string};
      index: number;
    }) => {
      // when change the url a previous useEffect will open the webView modal
      const updateUrl = () => setUrl(() => item.url);
      return (
        <TouchableOpacity
          onPress={updateUrl}
          style={[
            styles.itemContainer,
            {
              marginBottom: index < urls.length - 1 ? 5 : 0.5,
            },
          ]}
          activeOpacity={0.75}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.txt}>{item.title}</Text>
          <Text style={styles.txt}>{item.url}</Text>
        </TouchableOpacity>
      );
    },
    [urls],
  );

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  return (
    <View style={{}}>
      <WebViewer uri={url} visible={showModal} setUrl={setUrl} />
      <FlatList
        data={urls}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopColor: 'lightgrey',
    borderTopWidth: 0.5,
    backgroundColor: 'lightgrey',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loading: {
    color: 'black',
    fontSize: 18,
  },
  itemContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 35,
  },
  txt: {
    fontSize: 14,
  },
});
