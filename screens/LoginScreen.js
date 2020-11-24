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
    login=async(emailId, password)=>{
        if(emailId && password)
        {
            try{
                const response=await firebase.auth().signInWithEmailAndPassword(emailId, password)
                console.log(response)
                console.log(emailId)
                if(emailId==='abc@example.com')
                {
                    this.props.navigation.navigate(Read);
                    
                }
            }
            catch(error)
            {
                console.log(error.code)
                switch(error.code)
                {
                    case 'auth/user-not-found':Alert.alert('user Not found!!')
                    break;
                    case 'auth/wrong-password':Alert.alert('Incorrect password!!')
                    break;
                }
            }
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
                   onPress={()=>
                    {
                    this.login(this.state.emailId,this.state.password)
                    
                    
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