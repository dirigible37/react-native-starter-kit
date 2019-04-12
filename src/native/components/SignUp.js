import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Container, View, Content, Text, Form, Item, Label, Input, Button, Header,Title, List, ListItem, InputGroup, Icon, Picker
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import signup_style from '../styles/my_styles.js';
/*
function SignUp(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  function loginClick() {
    props.navigation.navigate("SignedIn");
  }

  return (
    <Container style={signup_style.body}>
    <Content>
      <List>
        <ListItem>
          <InputGroup>
          <Icon name="ios-person" style={{ color: '#0A69FE' }} />
          <Input  
            placeholder={"Email Address"} 
            placeholderTextColor={"#d3d3d3"}/>
          </InputGroup>
        </ListItem>
        <ListItem>
          <InputGroup>
            <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
          <Input  
            placeholder={"Password"} 
            placeholderTextColor={"#d3d3d3"}
            secureTextEntry={true}/>
          </InputGroup>
        </ListItem>
      </List>
      <Button style={signup_style.primaryButton} onPress={loginClick()}>
        <Text>Login</Text>
      </Button>
      <Button style={signup_style.primaryButton} >
        <Text>New Here?</Text>
      </Button>

    </Content>
    </Container>
  );
}
*/

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
    };
  }

  render() {
    return (
      <Container style={signup_style.body}>
        <Content>
          <List>
            <ListItem>
              <InputGroup>
              <Icon name="ios-person" style={{ color: '#0A69FE' }} />
              <Input  
                placeholder={"Email Address"} 
                placeholderTextColor={"#d3d3d3"}/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
              <Input  
                placeholder={"Password"} 
                placeholderTextColor={"#d3d3d3"}
                secureTextEntry={true}/>
              </InputGroup>
            </ListItem>
          </List>
          <Button style={signup_style.primaryButton} onPress={() => {this.props.navigation.navigate("SignedIn");}}>
            <Text>Recipe List Demo</Text>
          </Button>
          <Button style={signup_style.primaryButton} onPress={() => {this.props.navigation.navigate("RecipeView");}}>
            <Text>Recipe View Demo</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

export default SignUp;
