import React from "react";
import { StatusBar } from "react-native";
import { DrawerActions } from 'react-navigation-drawer';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, List, ListItem, Fab, Thumbnail} from "native-base";



const list = [
  {
    Id: 1,
    Photo: "https://barefeetinthekitchen.com/wp-content/uploads/2014/11/bulgogi-4-1024x683.jpg",
    Name: "Beef Bulgogi",
    Description: "This shit is dope af",
    Cook_Time: "50",
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
        step_text: "chop that shit",
        step_ingredients: [
          {
            Quantity: "QuantityObj",
            Name: "Onion"
          },
        ],
        Photo: "choppingitup.png", // optional
        Duration: "10",
      },
      {
        step_text: "chop that shit",
        step_ingredients: [
          {
            Quantity: "QuantityObj",
            Name: "Onion"
          },
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
    Description: "Dope ass mac n cheese recipe",
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
        step_text: "chop that shit",
        step_ingredients: [
          {
            Quantity: "QuantityObj",
            Name: "Onion"
          },
        ],
        Photo: "choppingitup.png", // optional
        Duration: "10",
      },
      {
        step_text: "chop that shit",
        step_ingredients: [
          {
            Quantity: "QuantityObj",
            Name: "Onion"
          },
        ],
        Photo: "choppingitup.png", // optional
        Duration: "10",
      }
    ]
  }
]

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

            
            {
              list.map((l, i) => (
                <ListItem thumbnail key={i}>
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
        </Content>
      </Container>
    );
  }
}