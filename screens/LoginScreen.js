import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import { auth } from '../firebase'
import { Image } from 'react-native';


const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    <ImageBackground source={require('./bgLogin.png')} style={styles.background}>
    <KeyboardAvoidingView

      style={styles.container}
      behavior="padding"
    >
         <Image source={require('./logo.png')} style={styles.logo} />
         <View style={styles.overlay}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{}}
          style={styles.buttonPhone}
        >
          <Text style={styles.buttonText}>Login With Phone Number</Text>
        </TouchableOpacity>
        
      </View>
      

    </KeyboardAvoidingView>
    </ImageBackground>
    
  )
}
export default LoginScreen
const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 25,
        paddingVertical: 30,
        paddingHorizontal: 15,
        width: '80%',
        marginTop: 1,
        alignItems: 'center',
      },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
       
      },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        
        
      },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
  inputContainer: {
    width: '90%',
    
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 5,
   
    
    
  },
  buttonContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    
    
  },
  buttonPhone: {
    backgroundColor: '#0D375A',
    width: '100%',
    padding: 15,
    borderRadius: 177,
    alignItems: 'center',
    marginTop: 20,
    opacity:0.90,
    
  },
  button: {
    backgroundColor: '#23480C',
    width: '100%',
    padding: 15,
    borderRadius: 177,
    alignItems: 'center',
    marginTop: 5,
    opacity:0.95,
    
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#23480C',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#23480C',
    fontWeight: '700',
    fontSize: 16,
  },
})