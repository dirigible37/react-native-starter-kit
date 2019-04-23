import React from "react";
import { StatusBar } from "react-native";
import { DrawerActions } from 'react-navigation-drawer';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, List, ListItem, Fab, Thumbnail} from "native-base";
import Loading from './Loading';
import { Stitch, AnonymousCredential } from 'mongodb-stitch-react-native-sdk';

const recipe_list = [
  {
    Id: 1,
    Photo: "https://barefeetinthekitchen.com/wp-content/uploads/2014/11/bulgogi-4-1024x683.jpg",
    Name: "Beef Bulgogi",
    Description: "Some super good korean marinated beef!",
    Cook_Time: "50",
    OwnerID: "userblahblahblah",
    Last_Used: "20190410",
    Ingredients: [{
      Name: "Onion",
      Quantity: {
        Magnitude: "1",
        Unit: "whole"
      }
    }, ],
    Steps: [
      {
        step_text: "Chop that stuff up! chop that stuff up! chop that stuff up! chop that stuff up! chop that stuff up! ",
        step_ingredients: [
          "1 cup this",
          "1 tablespoon that"
        ],
        Photo: "choppingitup.png", // optional
        Duration: "10",
      },
      {
        step_text: "Now cook it",
        step_ingredients: [
          "1 cup this",
          "1 tablespoon that"
        ],
        Photo: "choppingitup.png", // optional
        Duration: "10",
      }
    ]
  },
  {
    Id: 2,
    Photo: "http://yfimq2at25v1pt2cj1ozsc4k.wpengine.netdna-cdn.com/wp-content/uploads/2017/03/Mac-N-Cheese-with-Honey-Bacon-670x405-1489186002.jpg",
    Name: "Mac n Cheese",
    Description: "My awesome mac n cheese recipe",
    Cook_Time: "20",
    OwnerID: "userblahblahblah",
    Last_Used: "20190410",
    Ingredients: [{
      Name: "Onion",
      Quantity: {
        Magnitude: "RealNumber",
        Unit: "ounces"
      }
    }, ],
    Steps: [
      {
        step_text: "Cook up the noodles",
        step_ingredients: [
          "1 cup this",
          "1 tablespoon that"
        ],
        Photo: "choppingitup.png", // optional
        Duration: "10",
      },
      {
        step_text: "Mix some cheese in",
        step_ingredients: [
          "1 cup this",
          "1 tablespoon that"
        ],
        Photo: "choppingitup.png", // optional
        Duration: "10",
      }
    ]
  }
]

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      list:undefined,
      client:undefined
    };
  }

  componentWillMount() {
    console.log("shit");
    Stitch.initializeDefaultAppClient('otterpop-liaol').then(client => {
        this.setState({ client });
    }).then(() => {
        this.state.client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
            console.log(`Successfully logged in as user ${user.id}`);
        }).catch(err => {
            console.log(`Failed to log in anonymously: ${err}`);
        }).then(() => {
          this.state.client.callFunction("getRecipe").then(items => {          
            console.log(items);
            this.setState({list: items});
        });
      });
    });
  }

  render() {
    const { list } = this.state;
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
              transparent
              onPress={() => {this.props.navigation.navigate("AddRecipe");}}>
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