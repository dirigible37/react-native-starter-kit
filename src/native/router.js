import React, { Component } from "react";
import {
    StackNavigator,
    TabNavigator,
    createSwitchNavigator,
    createDrawerNavigator
  } from "react-navigation";
import HomeScreen from "./components/HomeScreen.js";
import SignUp from "./components/SignUp.js";
import RecipeScreen from "./components/RecipeScreen.js";

export const DrawerNav = createDrawerNavigator(
    {
      Home: { screen: HomeScreen },
      Logout: {screen: SignUp}
    }
  );

export const RootSwitchNav = createSwitchNavigator(
        {
            SignedIn: {
                screen: HomeScreen
            },
            SignedOut: {
                screen: SignUp
            },
            RecipeView: {
                screen: RecipeScreen
            },
            Drawer: DrawerNav
        },
        {
            initialRouteName: "SignedOut",
        }
    );