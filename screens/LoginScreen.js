import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { FormLabel, FormInput } from 'react-native-elements';
import { db } from '../data/FirebaseDb'

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '', loading: false, user: '' };
    }

    onLoginPress() {
        this.setState({error: '', loading: true});
        const{email, password} = this.state;
        db.app.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({error: '', loading: false});
            this.props.navigation.navigate('Main');
        })
        .catch(() => {
            this.setState({error: 'Autenticação falhou.', loading: false});
        });
    }

    onSignUpPress() {
        this.setState({error: '', loading: true});

        const{email, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({error: '', loading: false});
            this.props.navigation.navigate('Main');
        })
        .catch(() => {
            this.setState({error: 'Cadastro feito!',  loading: false});
        });
    }

    renderButtonOrLoading() {
        if(this.state.loading) {
            return <Text> Loading... </Text>
        }

        return(
            <View>  
                <Button onPress={this.onLoginPress.bind(this)} title='Login'></Button>
                <Text />
                <Button onPress={this.onSignUpPress.bind(this)} title='Sign Up'></Button>
            </View>
        );
    }

    render() {
        return(
            <View style={styles.container}>
                <FormLabel>Email</FormLabel>
                <FormInput value={this.state.email} placeholder='joao@icloud.com' onChangeText={email => this.setState({email})}/>
                <FormLabel>Password</FormLabel>
                <FormInput value={this.state.password} secureTextEntry placeholder='*******' onChangeText={password => this.setState({password})}/>
                {this.renderButtonOrLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: 15,
      backgroundColor: '#fff',
      margin: 10,
    }
  });