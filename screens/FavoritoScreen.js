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

export default class FavoritoScreen extends React.Component {
  static navigationOptions = {
    title: 'Meus Favoritos',
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
      this.props.navigation.navigate(user ? 'Favorito' : 'Login')
    });

    db.ref(db.app.auth().currentUser.uid + '/favoritos/').on('value', (snapshot) => {
      if(snapshot.val() === null || snapshot.val() === undefined) {
        this.setState({
          isLoading: false,
          dataSource: null
        });
      } else if(snapshot.val() !== null) {
        this.setState({
          isLoading: false,
          dataSource: Object.values(snapshot.val())
        });
      }
    });
  }

  selectedItem(key) {        
    this.props.navigation.navigate('DetalheFavorito', { patrocinador: this.state.dataSource[key] })
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text style={{margin: 10}}>Loading</Text>
          <ActivityIndicator/>
        </View>
      );
    } else {
      if(this.state.dataSource === null) {
        return (
          <ScrollView>
            <View style={styles.container}>
              <Text>Nenhum favorito!</Text>
            </View>
          </ScrollView>);
      } else {
        render = this.state.dataSource.map((val, key) => {
          const urlImage = val.img_logo;
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
              { render }
            </View>
          </ScrollView>
        );
      }
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

