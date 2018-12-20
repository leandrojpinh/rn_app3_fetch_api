import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { FormLabel } from 'react-native-elements';
import { db } from '../data/FirebaseDb'

export default class LogoutScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: ''
        }
    }

    componentDidMount() {
        this.setState({
            usuario: db.app.auth().currentUser.email
        });
    }

    onLogoutPress() {        
        db.app.auth().signOut().then(() => {
            this.props.navigation.navigate('Login');
        });
    }

    render() {
        return(
            <View style={styles.container}>
                <FormLabel>Logado como { this.state.usuario }</FormLabel>
                <FormLabel></FormLabel>
                <Button style={styles.button} onPress={() => this.onLogoutPress()} title='Logout'></Button>
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