import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView  ,
  TouchableOpacity
} from 'react-native';
import { Card } from 'react-native-elements';
import { db } from '../data/FirebaseDb';

import patrocinadorService from '../services/PatrocinadorService';

export default class PatrocinadorScreen extends React.Component {
  static navigationOptions = {
    title: 'Patrocinadores',
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      dataSource: null
    }
  }

  async componentDidMount() {    
      db.app.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'Patrocinador' : 'Login')
      });

      const patrocinadores = await patrocinadorService.fetchPatrocinadores();
      this.setState({
        isLoading: false,
        dataSource: Object.values(patrocinadores),
      })
  }

  selectedItem(key) {        
    this.props.navigation.navigate('DetalhePatrocinador', { patrocinador: this.state.dataSource[key] })
  }

  render() {

    if(this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      );
    } else {
      let patrocinadores = this.state.dataSource.map((val, key) => {
        const urlImage = val.img_marca_patrocinador_png;
        return (
          <TouchableOpacity onPress={() => this.selectedItem(key)}>            
              <Card key={key} style={styles.item}>
                <Image style={styles.image} source={{ uri: urlImage }} />
                <Text>{val.descricao}</Text>              
              </Card>
          </TouchableOpacity>
        );
      });

      return (
        <ScrollView>
          <View style={styles.container}>
            { patrocinadores }
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  item: {
    flex: 1,
    flexDirection: 'row'
    },
  title: {
    fontSize: 38,
    backgroundColor: 'red'
  },
  button: {
    marginRight: 10
  },
  image: {
    width: 72,
    height: 72
  },
});
