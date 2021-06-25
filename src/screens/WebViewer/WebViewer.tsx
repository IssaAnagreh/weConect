import React, {useEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';

export default function WebViewer({
  uri,
  visible,
  setUrl,
}: {
  uri: string;
  visible: boolean;
  setUrl: (showModal: any) => any;
}) {
  const [hideSpinner, setHideSpinner] = useState(false);

  // a useEffect in the parent comp. will close the modal automatically if the url is empty
  const closeModal = () => {
    setUrl('');
  };

  const handleHideSpinner = () => {
    setHideSpinner(true);
  };

  // Modal is rendered only once, so hideSpinner needs to be false everytime the modal closes
  useEffect(() => {
    !visible && setHideSpinner(false);
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={closeModal}>
      <SafeAreaView style={{flex: 1, justifyContent: 'flex-start'}}>
        <WebView source={{uri}} onLoad={handleHideSpinner} />
        {!hideSpinner && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="grey" />
          </View>
        )}
        <View
          style={{
            width: '100%',
            borderTopColor: 'lightgrey',
            borderTopWidth: 0.25,
          }}>
          <TouchableOpacity style={styles.close} onPress={closeModal}>
            <Text style={styles.closeTxt}>Close</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  close: {
    height: 50,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  closeTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  loader: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
