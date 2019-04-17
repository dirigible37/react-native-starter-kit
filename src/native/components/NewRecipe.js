import React from 'react';
import ReactDOM from 'react-dom';
import signup_style from '../styles/my_styles.js';
import {Container, Header, Content, Form, Item, Input, Button, Label, Text, Left, Right, Body, Icon, Title, } from 'native-base';

export default class NewRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      photo: '',
      description: '',
      cook_time: '',
      ingredients: [{ name: '', amount: '' }],
      steps: [{ instructions: '', ingredients: '', photo: '', duration: '' }]
    };
  }

  handleNameChange = evt => {
    this.setState({ name: evt.target.value });
  };

  handleIngredientsNameChange = idx => evt => {
    const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient;
      return { ...ingredient, name: evt.target.value };
    });

    this.setState({ ingredients: newIngredients });
  };

  handleSubmit = evt => {
    const { name, ingredients } = this.state;
    alert(`Incorporated: ${name} with ${ingredients.length} ingredients`);
  };

  handleAddIngredient = () => {
    this.setState({
      ingredients: [...this.state.ingredients, { name: '', amount: '' }],
    });
  };

  handleRemoveIngredient = idx => () => {
    this.setState({
      ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx),
    });
  };

  render() {
    return (
      <Container>
        <Header>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('SignedIn');
              }}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 1 }}>
            <Title>New Recipe</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent>
              <Icon name="share" />
            </Button>
          </Right>
        </Header>
        <Content>
          <Form onSubmit={this.handleSubmit}>
            <Label style={{ paddingTop:10, paddingBottom:10}}>Recipe Name</Label>
            <Item  rounded key={0}>
              <Input
                placeholder="Recipe Name"
                placeholderTextColor={'#d3d3d3'}
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </Item>
            <Label style={{ paddingTop:10, paddingBottom:10}}>Ingredients</Label>
            {this.state.ingredients.map((ingredients, idx) => (
                <Item rounded key={idx + 1} style={{ flex: 1, flexDirection:'row'}} >
                    <Left style={{flex:1}}>
                        <Text style={{paddingLeft:10}}>{idx+1}</Text> 
                    </Left>
                    <Body  style={{flex:15, flexDirection:'row'}}>
                        <Input
                            style={{flex:3}}
                            placeholder={`Ingredient #${idx + 1} name`}
                            placeholderTextColor={'#d3d3d3'}
                            value={ingredients.name}
                            onChange={this.handleIngredientsNameChange(idx)}
                        />

                        <Input
                            style={{flex:1, borderLeftWidth: 1, borderLeftColor:"#e2e2e2"}}
                            placeholder={`Quantity`}
                            placeholderTextColor={'#d3d3d3'}
                            value={ingredients.name}
                            onChange={this.handleIngredientsNameChange(idx)}
                        />
                    </Body>
                    {idx+1 == this.state.ingredients.length ? (
                        <Right  style={{flex:3, paddingRight:5}}>
                            <Button transparent style={{height:"80%" }} onPress={this.handleAddIngredient}><Icon type="MaterialIcons" name="add"></Icon></Button>
                        </Right>
                    ) : (
                        <Right  style={{flex:3, paddingRight:5}}>
                            <Button transparent style={{height:"80%" }} onPress={this.handleRemoveIngredient(idx)}><Icon type="MaterialCommunityIcons" name="delete"></Icon></Button>
                        </Right>
                    )}
                </Item>
            ))}
            <Button>
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
