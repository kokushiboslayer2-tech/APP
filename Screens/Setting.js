import React from "react";
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const { width } = Dimensions.get('window');

const Setting = () => {
    return (
        <View style={styles.container}>
           <Text style={styles.Setting}>Setting Screen</Text>
           <Text style={styles.subtitle}>Select a device to begin setup</Text>
           {/*  Add device selection UI here later */}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:24,
  },
  Setting: {
    fontSize:24,
    fontWeight: '600',
    color: '#0f2051',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    maxWidth: width * 0.8,
  },
});