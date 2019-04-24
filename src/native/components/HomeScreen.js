import React from "react";
import { StatusBar } from "react-native";
import { DrawerActions } from 'react-navigation-drawer';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, List, ListItem, Fab, Thumbnail} from "native-base";
import Loading from './Loading';
import { Stitch, AnonymousCredential } from 'mongodb-stitch-react-native-sdk';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      list:undefined,
      client:undefined
    };
  }

  populateList = () => {
      this.state.client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
          console.log(`Successfully logged in as user ${user.id}`);
      }).catch(err => {
          console.log(`Failed to log in anonymously: ${err}`);
      }).then(() => {
        this.state.client.callFunction("getRecipe").then(items => {  
          if (this.state.list == undefined) {
            this.setState({list: items});
          }
          else if(this.state.list.length != items.length ) {
            console.log("RELOOOOOOAAAAAAAAADDDDDD");
            this.setState({list: items});
          }
      });
    });
  };

  componentDidMount() {
    if(Stitch.hasAppClient('otterpop-liaol')) {
      this.setState({ client : Stitch.getAppClient('otterpop-liaol')}, this.populateList);
    }
    else {
      Stitch.initializeDefaultAppClient('otterpop-liaol').then(client => {
          this.setState({ client : client }, this.populateList);
      });
    }
  }

  render() {
    const { list } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Recipes</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {this.props.navigation.navigate("AddRecipe", {client : this.state.client});}}>
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
            {list == undefined ? (
              <Loading></Loading>
            ):(
              <List>
              {
                list.map((l, i) => (
                  <ListItem thumbnail key={i} button={true} onPress={() => {this.props.navigation.navigate("RecipeView", {recipe : list[i]} );}}>
                    <Left>
                      <Thumbnail square source={{ uri: l.Photo }} />
                    </Left>
                    <Body>
                      <Text>{l.Name}</Text>
                      <Text note>{l.Description}</Text>
                    </Body>
                    <Right>
                      <Text note>{l.Cook_Time} Min</Text>
                    </Right>
                  </ListItem>
                ))
              }
              </List>
            )}
        </Content>
      </Container>
    );
  }
}