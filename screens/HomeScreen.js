import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, ImageBackground, ScrollView, Image, TextInput, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { auth } from '../firebase'
import { getAuth } from 'firebase/auth';
import { Card } from 'react-native-paper'


const HomeScreen = () => {
  const navigation = useNavigation()
  const [user, setUser] = React.useState(null);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login')
      })
      .catch(error => alert(error.message))
  }

  function CurrentUser() {
    if (auth.currentUser?.email == null) {
      let userPhone = "Login As : " + auth.currentUser?.phoneNumber;
      return userPhone;
    }
    else if (auth.currentUser?.phoneNumber == null) {
      let userName = "Login As : " + auth.currentUser?.email;
      return userName
    }
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    // Load data from JSON file or API
    const jsonData = require('../data.json');
    setData(jsonData);
  }, []);
  const renderItem = ({ item }) => {
    return (
      <Card style={styles.card} onPress={() => navigation.navigate('Detail', { item })}>
        <Card.Cover source={{ uri: item.image }} />
        <Card.Title title={item.title} />
        <Card.Content>
          <Text>{item.description}</Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <ImageBackground
      source={require('../assets/bgHome.jpeg')}
      style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.buttonLogOut}>
          <Image
            source={require('../assets/signoutBtn.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }} style={styles.usernameLabel}>
          <Text>{CurrentUser()}</Text>
        </TouchableOpacity>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    height: '200%',
  },
  buttonLogOut: {
    marginHorizontal: 25,
    marginTop: 50,
    padding: 0,
  },
  buttonImage: {
    height: 65,
    width: 250,
    marginLeft: -30,
  },
  card: {
    borderRadius: 20,
    elevation: 5,
    flexGrow: 1,
    height: '30%',
    marginBottom: -60, // Change this to reduce the space between each card
    marginTop: 10
  },

  usernameLabel: {
    backgroundColor: 'white',
    height: 45,
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },

});