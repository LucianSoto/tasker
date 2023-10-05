import React, {useState} from 'react'
import { Alert, SafeAreaView, Text } from 'react-native'
import auth from '@react-native-firebase/auth';
import Button from '../../../components/Button'
import styles from './styles'
import Title from '../../../components/Title'
import Input from '../../../components/Input'

const Signin = ({navigation}) => {
  const [values, setValues] = useState({})

  const onChange = (value, key) => {
    setValues(vals => ({
      ...vals,
      [key] : value,
    }))
  }
  
  const onSubmit = () => {
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        console.log('User signed in!');
      })
      .then(()=> {
        const user = auth().currentUser
        console.log(user,' user in signin')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        } else { Alert.alert(error.message) }
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title>Welcome back!</Title>
      <Button onPress={onSubmit}>Login</Button>
      <Input 
        keyboardType='email-address' 
        placeholder="email" 
        onChangeText={(val) => onChange(val, 'email')} 
        />
      <Input 
        secureTextEntry 
        placeholder="password" 
        onChangeText={(val) => onChange(val, 'password')} 
        />
      <Text style={styles.footerText}>Not Registered?
        <Text 
          onPress={()=> navigation.navigate('Signup')} 
          style={styles.footerLink}
          >
          {' '}Sign Up!
        </Text>
      </Text>
    </SafeAreaView>
  )
}

export default React.memo(Signin)