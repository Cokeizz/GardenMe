import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, ImageBackground, ScrollView, Image, TextInput, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { auth } from '../firebase'
import { db } from '../firebase'
import { Card } from 'react-native-paper'


const HomeScreen = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login')
      })
      .catch(error => alert(error.message))
  }
  let userName = "Login As : "+auth.currentUser?.email;


  return (

    <ImageBackground source={require('../assets/bgHome.jpeg')} style={styles.background}>

      
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity onPress={handleSignOut} style={styles.buttonLogOut}>
          <Image source={require('../assets/signoutBtn.png')} style={styles.buttonImage} />
        </TouchableOpacity>
      
        <Card style={styles.card}>
          <Card.Title title={userName} subtitle="" />
          <Card.Content>
            <TextInput placeholder="Enter text..." style={styles.input} multiline={true} numberOfLines={4}/>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles} onPress={() => {}}>
              <Image source={require('../assets/addImgBtn.png')} style={{width: 75, height: 70}} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.postBtn} onPress={() => {}}>
               <Image source={require('../assets/postBtn.png')} style={{width: 120, height: 70}} />
            </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

      </ScrollView>
     
    </ImageBackground>
    
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  buttonLogOut: {
    marginHorizontal:25,
    marginTop:35,
    padding: 10,
    
  },
  buttonImage: {
    height:65,
    width:250,
    marginLeft:-30
  },
  scrollView: {
    marginHorizontal: 20,
    padding: 10,
    width: '100%',

  },
  card: {
    borderRadius:20,
    elevation: 4,
    flexGrow: 1 ,
    height:"80%"
  },
  input: {
    height: '50%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
   
    
  },
  buttonAddImg: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    width: '20%'
  },
  postBtn:{
    marginLeft:180
  },
  
  
  
  
})
