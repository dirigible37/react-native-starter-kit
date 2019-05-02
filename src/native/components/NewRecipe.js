import React from 'react';
import ReactDOM from 'react-dom';
import signup_style from '../styles/my_styles.js';
import { Constants, ImagePicker, Permissions, FileSystem } from 'expo';
import {Container, Header, Content, Form, Item, Input, Button, Label, Text, Left, Right, Body, Icon, Title, Card, CardItem } from 'native-base';
import mime from 'mime-types';
import { Stitch, AnonymousCredential } from 'mongodb-stitch-react-native-sdk';
import Storage from '@aws-amplify/storage'

export default class NewRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      photo: null,
      description: '',
      cook_time: '',
      ingredients: [{ Name: '', Quantity: '' }],
      steps: [{ step_text: '', step_ingredients: [{ Name: '', Quantity: '' }], Photo: '', Duration: '' }],
      client: undefined
    };
  }

  handleNameChange = val => {
    this.setState({ name: val });
  };

  handleDescriptionChange = val => {
    this.setState({ description: val });
  };
 
  handleIngredientsChange = val => {
    this.setState({ name: val });
  };

  handleStepInstructionChange = idx => val => {
    const newSteps = this.state.steps;
    newSteps[idx].step_text = val;
    this.setState({ steps: newSteps });
  };

  handleIngredientsNameChange = idx => val => {
    const newIngredients = this.state.ingredients;
    newIngredients[idx].Name = val;
    this.setState({ ingredients: newIngredients });
  };

  handleIngredientsAmountChange = idx => val => {
    const newIngredients = this.state.ingredients;
    newIngredients[idx].Quantity = val;
    this.setState({ ingredients: newIngredients });
  };

  handleStepIngredientsNameChange = (idx,idx2) => val => {
    const newStepIngredients = this.state.steps;
    newStepIngredients[idx].step_ingredients[idx2].Name = val;
    this.setState({ steps: newStepIngredients });
  };

  handleStepIngredientsAmountChange = (idx,idx2) => val => {
    const newStepIngredients = this.state.steps;
    newStepIngredients[idx].step_ingredients[idx2].Quantity = val;
    this.setState({ steps: newStepIngredients });
  };

  handleSubmit = client => evt => {
    client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
        console.log(`Successfully logged in as user ${user.id}`);
    }).catch(err => {
        console.log(`Failed to log in anonymously: ${err}`);
    });
    console.log(this.state.ingredients);
    client.callFunction("setRecipe", [this.state.name, this.state.photo, this.state.description, this.state.cook_time, this.state.ingredients, this.state.steps]).then(welcomeMessage => {
        console.log(welcomeMessage);
    });
  };

  handleAddIngredient = () => {
    this.setState({
      ingredients: [...this.state.ingredients, { name: '', amount: '' }],
    });
  };

  handleAddStep = () => {
    this.setState({
        steps: [...this.state.steps, { step_text: '', step_ingredients: [{ Name: '', Quantity: '' }], Photo: '', Duration: '' }],
    });
  };

  handleAddStepIngredient = idx => () => {
    const newSteps = this.state.steps;
    newSteps[idx].step_ingredients = [...newSteps[idx].step_ingredients, { Name: '', Quantity: '' }];
    this.setState({ steps: newSteps });
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

  handleRemoveStepIngredient = (idx,idx2) => () => {
    const newSteps = this.state.steps;
    newSteps[idx].step_ingredients = newSteps[idx].step_ingredients.filter((s, sidx) => idx2 !== sidx),
    this.setState({ steps: newSteps });
  };
/* 
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ photo: result.uri });
      this._handleImagePicked(result);
    }
  };
*/
  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      console.log(pickerResult);
      this._handleImagePicked(pickerResult);
    }
  };

  // this handles the image upload to S3
  _handleImagePicked = async (pickerResult) => {
    const imageName = "testing.png";
    const fileType = mime.lookup(pickerResult.uri);
    const access = { level: "public", contentType: fileType };
    const imageData = await FileSystem.readAsStringAsync(pickerResult.uri, { encoding: FileSystem.EncodingTypes.Base64, });
    console.log("yeet?");
    try {
      await Storage.put(imageName, imageData, access)
    } catch (err) {
      console.log('error: ', err)
    }
  }

  render() {
    const { navigation } = this.props;
    //Gotta make a default "error" recipe in case no load
    const client = navigation.getParam('client');

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
                onChangeText={this.handleNameChange}
              />
            </Item>
            <Item  style={{ marginTop:10,  marginLeft:10,  marginRight:10}} regular key={1}>
              <Input
                placeholder="Description"
                placeholderTextColor={'#d3d3d3'}
                onChangeText={this.handleDescriptionChange}
              />
            </Item>
            {/*
            <Item>
              <Button onPress={this._pickImage}><Text>YEEEET</Text></Button>
            </Item>
            */}
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
                            onChangeText={this.handleIngredientsNameChange(idx)}
                        />

                        <Input
                            style={{flex:1, borderLeftWidth: 1, borderLeftColor:"#e2e2e2"}}
                            placeholder={`Quantity`}
                            placeholderTextColor={'#d3d3d3'}
                            onChangeText={this.handleIngredientsAmountChange(idx)}
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
            {this.state.steps.map((step, idx) => (
                <Card>
                    <CardItem key={idxheader style={{ flex: 1, flexDirection:'row'}}>
                        <Body style={{flex:1}}>
                            <Text style={{paddingLeft:10}}>{idx+1}</Text> 
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
                    </CardItem>
                    <Item regular key={idx + 3 + this.state.ingredients.length} style={{ flex: 1, flexDirection:'row', marginTop:2,  marginLeft:10,  marginRight:10}} >
                        <Input
                            style={{flex:3}}
                            placeholder={`Step #${idx + 1} instructions`}
                            placeholderTextColor={'#d3d3d3'}
                            onChangeText={this.handleStepInstructionChange(idx)}
                        />
                    </Item>
                    {step.step_ingredients.map((step_ingredient, idx2) => (
                        <Item regular key={idx2 + 3} style={{ flex: 1, flexDirection:'row', marginTop:2,  marginLeft:10,  marginRight:10}} >
                            <Left style={{flex:1}}>
                              <Text style={{paddingLeft:10}}>{idx2+1}</Text> 
                            </Left>
                            <Body  style={{flex:15, flexDirection:'row'}}>
                                <Input
                                    style={{flex:3}}
                                    placeholder={`Step #${idx + 1} Ingredient #${idx2 + 1}`}
                                    placeholderTextColor={'#d3d3d3'}
                                    onChangeText={this.handleStepIngredientsNameChange(idx, idx2)}
                                />
                                <Input
                                    style={{flex:1, borderLeftWidth: 1, borderLeftColor:"#e2e2e2"}}
                                    placeholder={`Quantity`}
                                    placeholderTextColor={'#d3d3d3'}
                                    onChangeText={this.handleStepIngredientsAmountChange(idx, idx2)}
                                />
                            </Body>
                            <Right style={{flex:3, paddingRight:5}}>
                              {idx2+1 == step.step_ingredients.length ? (
                                  <Button transparent style={{height:"80%" }} onPress={this.handleAddStepIngredient(idx)}><Icon type="MaterialIcons" name="add"></Icon></Button>
                                ) : (
                                  <Button transparent style={{height:"80%" }} onPress={this.handleRemoveStepIngredient(idx, idx2)}><Icon type="MaterialCommunityIcons" name="delete"></Icon></Button>
                              )}
                            </Right>
                        </Item>
                    ), this)}
                </Card>
            ), this)}


            <Button style={{ marginTop:30}} onPress={this.handleSubmit(client)}>
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
