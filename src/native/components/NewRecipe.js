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
    const { navigation } = this.props;
    const mystuff = navigation.getParam('list')
  };

  handleAddIngredient = () => {
    this.setState({
      ingredients: [...this.state.ingredients, { name: '', amount: '' }],
    });
  };

  handleAddStep = () => {
    this.setState({
        steps: [...this.state.steps, { instructions: '', ingredients: '', photo: '', duration: '' }],
    });
  };

  handleRemoveIngredient = idx => () => {
    this.setState({
      ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx),
    });
  };

  handleRemoveStep = idx => () => {
    this.setState({
        steps: this.state.steps.filter((s, sidx) => idx !== sidx),
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
            <Item  style={{ marginTop:10,  marginLeft:10,  marginRight:10}} regular key={0}>
              <Input
                placeholder="Recipe Name"
                placeholderTextColor={'#d3d3d3'}
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </Item>
            <Item  style={{ marginTop:10,  marginLeft:10,  marginRight:10}} regular key={1}>
              <Input
                placeholder="Description"
                placeholderTextColor={'#d3d3d3'}
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </Item>
            <Item  style={{ marginTop:10,  marginLeft:10,  marginRight:10, borderBottomWidth:0}} key={2}>
                <Input
                    style={{marginRight:20, borderColor:"#e2e2e2", borderWidth:1}}
                    placeholder={`Prep Time`}
                    placeholderTextColor={'#d3d3d3'}
                />

                <Input
                    style={{borderColor:"#e2e2e2", borderWidth:1}}
                    placeholder={`Cook Time`}
                    placeholderTextColor={'#d3d3d3'}
                />
            </Item>

            <Label style={{ paddingTop:10, paddingBottom:8}}>Ingredients</Label>
            {this.state.ingredients.map((ingredients, idx) => (
                <Item regular key={idx + 3} style={{ flex: 1, flexDirection:'row', marginTop:2,  marginLeft:10,  marginRight:10}} >
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

            <Label style={{ paddingTop:10, paddingBottom:8}}>Steps</Label>
            {this.state.steps.map((steps, idx) => (
                <Item regular key={idx + 3 + this.state.ingredients.length} style={{ flex: 1, flexDirection:'row', marginTop:2,  marginLeft:10,  marginRight:10}} >
                    <Left style={{flex:1}}>
                        <Text style={{paddingLeft:10}}>{idx+1}</Text> 
                    </Left>
                    <Body  style={{flex:15, flexDirection:'row'}}>
                        <Input
                            style={{flex:3}}
                            placeholder={`Step #${idx + 1} instructions`}
                            placeholderTextColor={'#d3d3d3'}
                            value={steps.name}
                            onChange={this.handleIngredientsNameChange(idx)}
                        />
                    </Body>
                    {idx+1 == this.state.steps.length ? (
                        <Right  style={{flex:3, paddingRight:5}}>
                            <Button transparent style={{height:"80%" }} onPress={this.handleAddStep}><Icon type="MaterialIcons" name="add"></Icon></Button>
                        </Right>
                    ) : (
                        <Right  style={{flex:3, paddingRight:5}}>
                            <Button transparent style={{height:"80%" }} onPress={this.handleRemoveStep(idx)}><Icon type="MaterialCommunityIcons" name="delete"></Icon></Button>
                        </Right>
                    )}
                </Item>
            ))}


            <Button style={{ marginTop:30}}>
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
