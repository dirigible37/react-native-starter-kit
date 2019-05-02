import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
import Amplify, {Auth, Hub} from 'aws-amplify';
const routes = ["Logout"];

export default class SideBar extends React.Component {

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem
                button
                onPress={this.props.signOut}>
                <Text>Logout</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
