import React, { Component } from "react";
import { View, StatusBar, Platform  } from "react-native";
import { Container, Content, Picker, Button, Text } from "native-base";
import Expo from "expo";
import { Font } from 'expo';
import Loading from './components/Loading';
import HomeScreen from "./components/HomeScreen.js";
import { RootStackNav, RootSwitchNav, DrawerNav } from "./router.js";
import { createAppContainer } from 'react-navigation';

import { withAuthenticator } from 'aws-amplify-react-native'
import Amplify from '@aws-amplify/core'
import config from '../aws-exports'
Amplify.configure(config)
import {Auth, Hub} from 'aws-amplify';

StatusBar.setHidden(true);

class AwesomeApp extends Component {
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

  signOut = async () => {
    await Auth.signOut().then(() => {
      this.props.onStateChange('signedOut', null);
      })
      .catch(err => {
      console.log('err: ', err)
      })
  }

  render() {
    if (!this.state.isReady) {
      return <Loading />;
    }

    const Layout = createAppContainer(DrawerNav);
    return <Layout signOut={this.signOut}/>;
  }
}

export default props => {
  const AppComponent = withAuthenticator(AwesomeApp, { includeGreetings: true });
  return <AppComponent {...props} />
}