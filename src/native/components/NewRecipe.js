import React from 'react';
import ReactDOM from 'react-dom';

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Label,
  Text,
  Left,
  Right,
  Body,
  Icon,
  Title,
} from 'native-base';

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
            <Item stackedLabel key={0}>
              <Label>Recipe Name</Label>
              <Input
                placeholder="Recipe Name"
                placeholderTextColor={'#d3d3d3'}
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </Item>
            {this.state.ingredients.map((ingredients, idx) => (
              <Item stackedLabel key={idx + 1}>
                <Icon name={`share`}/>
                <Input
                  placeholder={`Ingredient #${idx + 1} name`}
                  placeholderTextColor={'#d3d3d3'}
                  value={ingredients.name}

                  onChange={this.handleIngredientsNameChange(idx)}
                />

              </Item>
            ))}
            <Button onPress={this.handleAddIngredient}>
              <Text>Add Ingredient</Text>
            </Button>
            <Button>
              <Text>Incorporate</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
