import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, Alert} from 'react-native';
import db from '../config'
import * as firebase from 'firebase'
import ReadScreen from './ReadScreen';
import WriteScreen from './WriteScreen';

export default class LoginScreen extends React.Component
{
    constructor()
    {
        super()
        this.state={
            emailId:'',
            password:'',
        }
    }
   
    render()
    {
        return(
           <KeyboardAvoidingView style={{alignItems:'center',marginTop:20}}>
               <View>
                   <TextInput
                   style={styles.loginBox}
                   placeholder="abc@example.com"
                   keyboardType='email-address'
                   onChangeText={(text)=>
                   {
                       this.setState({
                           emailId:text
                       })
                   }}/>

                    <TextInput
                   style={styles.loginBox}
                   placeholder="password"
                   secureTextEntry={true}
                   onChangeText={(text)=>
                   {
                       this.setState({
                           password:text
                       })
                   }}/>
                
               </View>
               <View>
                   <TouchableOpacity style={{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7}}
                  onPress = {async()=>{
                    var email  = await this.state.emailId;
                    var password = await this.state.password
                    firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(()=>{
                      this.props.navigation.navigate('Write')
                    })
                    .catch((error)=> {
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      return this.showAlert(errorCode)
                    })
                  }}
                   >
                       <Text style={{textAlign:'center'}}>
                        Login
                       </Text>

                   </TouchableOpacity>
               </View>

           </KeyboardAvoidingView>
        )
    }
}
const styles=StyleSheet.create({
    loginBox:
    {
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10,
    }
})
