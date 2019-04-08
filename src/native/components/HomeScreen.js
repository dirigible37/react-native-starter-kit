import React from "react";
import { StatusBar } from "react-native";
import { DrawerActions } from 'react-navigation-drawer';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, List, ListItem, Fab} from "native-base";
export default class HomeScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Recipes</Title>
          </Body>
          <Right>
            <Button
              transparent>
              <Icon name="add" />
            </Button>
          </Right>
        </Header>
        <Fab
            active="true"
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight">
            <Icon name="share" />
        </Fab>
        <Content>
          <List>
            <ListItem itemHeader first>
              <Text>Recent</Text>
            </ListItem>
            <ListItem>
              <Text>Mac and Cheese</Text>
            </ListItem>
            <ListItem>
              <Text>Hibachi</Text>
            </ListItem>
            <ListItem itemHeader>
              <Text>All</Text>
            </ListItem>
            <ListItem>
              <Text>Beef Bulgogi</Text>
            </ListItem>
            <ListItem>
              <Text>Bang</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}