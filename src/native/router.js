import React, { Component } from "react";
import {createSwitchNavigator, createDrawerNavigator, createStackNavigator } from "react-navigation";
import HomeScreen from "./components/HomeScreen.js";
import SignUp from "./components/SignUp.js";
import SideBar from "./components/SideBar.js";
import RecipeScreen from "./components/RecipeScreen.js";
import NewRecipe from "./components/NewRecipe.js";
import CookMode from "./components/CookMode.js";

export const StackNav = createStackNavigator(
  {
    SignedIn: {
      screen: HomeScreen
    },
    RecipeView: {
        screen: RecipeScreen
    },
    AddRecipe: {
      screen: NewRecipe
    },
    CookRecipe: {
      screen: CookMode
    }
  },
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    }
  }
);

export const DrawerNav = createDrawerNavigator(
  {
    Home:  {
      screen: StackNav
    },
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);