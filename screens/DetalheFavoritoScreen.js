import React from 'react';
import { ScrollView, StyleSheet, Text, Button, Linking, TouchableOpacity, Alert } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { removeFavorito } from '../services/FavoritoService';
import { db } from '../data/FirebaseDb';

export default class DetalheFavoritoScreen extends React.Component {
  static navigationOptions = {
    title: 'Favorito',
  };

  constructor(props) {
    super(props)

    this.state = {
      patrocinador: null
    }
  }

  componentDidMount() {
    const patrocinador = this.props.navigation.getParam('patrocinador');
    this.setState({patrocinador});
  }

  removeToFavorite() {
    let favorito = {
      uid: db.app.auth().currentUser.uid,
      nome: this.state.patrocinador.nome,
    }
    
    removeFavorito(favorito);

    Alert.alert(
      'Desfavoritar',
      'Removido!',
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate('Favorito')},
      ],
      { cancelable: false }
    )
  }

  render() {
    if(this.state.patrocinador !== null) {
      const urlLink = this.state.patrocinador.urlLink
      const nome = this.state.patrocinador.nome
      const img = this.state.patrocinador.img_background
      const slug = this.state.patrocinador.slug
      const descricao = this.state.patrocinador.descricao
      
      return (
        <ScrollView style={styles.container}>        
          <Card
            title={nome}
            image={{uri: img}}
            imageStyle={styles.imagem}>
              
            <Text style={{marginBottom: 10, color: '#abc', fontSize: 22}}>{slug}</Text>
            <Text style={{marginBottom: 10}}>
              {descricao}
            </Text>
            <TouchableOpacity onPress={() => {(urlLink !== null) ? Linking.openURL(urlLink) : '' }} 
              style={styles.btn}>
              <Text style={{color: 'blue', fontSize: 16}}>Site</Text>            
            </TouchableOpacity>
            <Button
              icon={<Icon name='code' color='#ffffff' />}
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              onPress={() => this.removeToFavorite()}
              title='REMOVE' />
          </Card>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={styles.container}>        
          <Text>Loading...</Text>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#fff',
    },
    imagem: {
      width: '100%'
    },
    btn: {
      borderColor: '#03A9F4',
      padding: 10,
    }
  });
  