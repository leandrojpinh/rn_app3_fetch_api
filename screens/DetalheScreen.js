import React from 'react';
import { ScrollView, StyleSheet, Text, Button, Linking, TouchableOpacity, Alert } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { addFavorito } from '../services/FavoritoService';
import { db } from '../data/FirebaseDb';

export default class DetalheScreen extends React.Component {
  static navigationOptions = {
    title: 'Patrocinador',
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

  addToFavorito() {
    let favorito = {
      uid: db.app.auth().currentUser.uid,      
      urlLink: this.state.patrocinador.url_link,
      nome: this.state.patrocinador.nome_patrocinador,
      img_background: this.state.patrocinador.img_background,
      img_logo: this.state.patrocinador.img_marca_patrocinador_png,
      slug: this.state.patrocinador.slug,
      descricao: this.state.patrocinador.descricao
    }

    console.log(favorito);
    
    addFavorito(favorito);

    Alert.alert(
      'Favoritar',
      'Adicionado aos vaforitos',
      [
        {text: 'OK', onPress: () => console.log('Favoritado!')},
      ],
      { cancelable: false }
    )
  }

  render() {
    if(this.state.patrocinador !== null) {
      const urlLink = this.state.patrocinador.url_link
      const nome = this.state.patrocinador.nome_patrocinador
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
              onPress={() => this.addToFavorito()}
              title='FAVORITE' />
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
