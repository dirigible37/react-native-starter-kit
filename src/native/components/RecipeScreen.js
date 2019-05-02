import React from "react";
import { StatusBar, Image, View } from "react-native";
import { DrawerActions } from 'react-navigation-drawer';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, List, ListItem, Fab, Thumbnail, Footer} from "native-base";

export default class HomeScreen extends React.Component {

  poop = () => {
    console.log("WOWWWWW");
  };

  render() {
    const { navigation } = this.props;
    //Gotta make a default "error" recipe in case no load
    const recipe = navigation.getParam('recipe');

    return (
      <Container>
        <Header>
          <Left style={{flex:1}}>
            <Button
              transparent
              onPress={() => {navigation.navigate("SignedIn");}}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex:1}}>
            <Title>{recipe.Name}</Title>
          </Body>
          <Right style={{flex:1}}>
            <Button transparent>
              <Icon name="share" />
            </Button>
          </Right>
        </Header>
        <Content>
          <Card>
            <CardItem cardBody>
              <Image source={{uri: recipe.Photo}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
                <Text>{recipe.Description}</Text>
            </CardItem>
            <CardItem>
              <Left>
                  <Text>Cooked 10 days ago</Text>
              </Left>
              <Right>
                <Text>Cook Time: {recipe.Cook_Time} min</Text>
              </Right>
            </CardItem>
            <CardItem header bordered>
              <Text>Ingredients</Text>
            </CardItem>
            <CardItem>
              <List dataArray={recipe.Ingredients}
              renderRow={ (data) =>
                <ListItem key={data.rowID} > 
                  <Left>
                    <Text>{data.Quantity}</Text>
                  </Left>
                  <Right>
                    <Text>{data.Name}</Text>
                  </Right>
                </ListItem>
              }> 
              </List>
            </CardItem>
            <CardItem header bordered>
              <Text style={{ }}>Steps</Text>
            </CardItem>
            {
              recipe.Steps.map((l, i) => (
                <CardItem bordered key={i} style={{ paddingLeft:0, paddingRight:5}} >
                  <List>
                    <ListItem itemHeader style={{ paddingBottom:0, marginBottom:0}} >
                      <Text style={{ paddingBottom:0, marginBottom:0 }}>Step {i}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>{l.step_text}</Text>
                    </ListItem>
                    <ListItem style={{ borderBottomWidth:0 }}>
                      <List dataArray={l.step_ingredients}
                        renderRow={ (data) =>
                            <ListItem key={data.rowID}> 
                              <Text note>{data.Quantity} {data.Name}</Text>
                            </ListItem>
                        }> 
                      </List>  
                    </ListItem>
                  </List> 
                </CardItem>
              ))
            }
          </Card>
        </Content>
        <Fab
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.poop()}>
            <Icon type="FontAwesome" name="fire" />
        </Fab>
      </Container>
    );
  }
}