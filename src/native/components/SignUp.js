import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Text, Form, Item, Label, Input, Button, Header,Title, List, ListItem, InputGroup, Icon, Picker
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import styles from '../styles/my_styles.js';

class SignUp extends React.Component {
  static propTypes = {
    error: PropTypes.string,
  }

  static defaultProps = {
    error: null,
  }

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
      <Container style={styles.container}>
        <Content>
          <List>
            <ListItem>
              <InputGroup>
              <Icon name="ios-person" style={{ color: '#0A69FE' }} />
              <Input placeholder={"Email Address"}/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
              <Input/>
              </InputGroup>
            </ListItem>
          </List>
          <Button onPress={() => {this.props.navigation.navigate("SignedIn");}}>
            <Text>Login</Text>
          </Button>
          <Button>
            <Text>New Here?</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

export default SignUp;
