import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView,FlatList } from 'react-native';
import { Header } from 'react-native-elements';
import db from '../config';
import * as firebase from 'firebase'
import { Searchbar } from 'react-native-paper';


export default class ReadScreen extends React.Component {
  constructor()
  {
    super()
    this.state={
      Search:'',
      Story:[],
    }
  }
  
  
  retrieveStories=async()=>{
    try {
      var allStories= []
      var stories = db.collection("Writers")
        .get().then((querySnapshot)=> {
          querySnapshot.forEach((doc)=> {
              // doc.data() is never undefined for query doc snapshots
              
              allStories.push(doc.data())
              console.log('this are the stories',allStories)
          })
          this.setState({Story:allStories})
        })
    }
    catch (error) {
      console.log(error);
    }
  };
componentDidMount()
  {
    this.retrieveStories()
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

    render(){
      const { search } = this.state;
    return (
      <KeyboardAvoidingView behavior='padding' enabled >
       <Header
    centerComponent={{text:'STORY HUB', style: { color: '#fff', fontSize: 20 }}}
    />
    <Searchbar
    placeholder="Search Story..."
    onChangeText={this.updateSearch}
    value={search}
    />
    <FlatList
    data={this.state.Story}
    renderItem={({item})=>
      (
        <View style={{borderBottomWidth:2,}}>
        <Text>{"Title: "+item.Title}</Text>
        <Text>{"Author: "+item.Author}</Text>
        <Text>{"Story: "+item.Story}</Text>
        </View>
      )}
    keyExtractor={(item,index)=>
       index.toString()}
    
    />

      </KeyboardAvoidingView>
    );
  }
  }
  const styles = StyleSheet.create({

  })
    