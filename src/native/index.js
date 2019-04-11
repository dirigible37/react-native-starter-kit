import React, { Component } from "react";
import { View, StatusBar, Platform  } from "react-native";
import { Container, Content, Picker, Button, Text } from "native-base";
import Expo from "expo";
import { Font } from 'expo';
import Loading from './components/Loading';
import HomeScreen from "./components/HomeScreen.js";
import { RootSwitchNav } from "./router.js";
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

StatusBar.setHidden(true);

export default class AwesomeApp extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      signedIn: false
    };
  }
  async componentWillMount() {
    await Font.loadAsync({    
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Loading />;
    }

    const Layout = createAppContainer(RootSwitchNav);
    return <Layout />;
  }
}