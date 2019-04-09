'use strict';
import React, {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1
  },
  body: {
    flex: 9,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  primaryButton: {
    margin: 10,
    padding: 15,
    alignSelf:'center',
    backgroundColor:"blue",
    width:150
  },
});