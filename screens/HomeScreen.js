import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput,  } from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends Component{
    constructor(){
        super();
        this.state={
            text:"",
        }
    }
    getWord=(word)=>{
        var searchKeyWord=word.toLowerCase()
        var url = "https://rupinwhitehatjr.github.io/dictionary/with.json"+searchKeyWord+".json"
        console.log(url)
        return fetch(url)
        .then((data)=>{
            if(data.status===200){
                return data.json()
            }else{
                return null
            }
        })
        .then((response)=>{
            var responseObject = response
            if(responseObject){
                var wordData = responseObject.definition[0]
                var definition=wordData.description
                var lexicalCategory=wordData.wordtype
                this.setState({
                    "word" :this.state.text,
                    "definition" :definition,
                    "lexicalCategory" : lexicalCategory,
                })
            }
            else{
                this.setState({
                    "word" :this.state.text,
                    "definition" :"Not Found",
                })
            }
        })
    }
    render(){
        return(
            <View>
                <Header
                    backgroundColor='purple'
                    centerComponent={{
                        text: 'Pocket Dictionary',
                        style: { color: '#fff', fontSize: 20},
                    }}/>
                <TextInput
                    style={StyleSheet.inputBoxContainer}
                    onChangeText={text =>{
                        this.setState({
                            text:text,
                            isSearchPressed: false,
                            word: "Loading...",
                            lexicalCategory:'',
                            examples: [],
                            definition:"",
                        });
                    }}
                    value={this.state.text}
                />
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={()=>{
                        this.setState({ isSearchPressed: true });
                        this.getWord(this.state.text)
                    }}>
                    <Text style={styles.text}>Search</Text>
                </TouchableOpacity>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                        Word :{""}
                    </Text>
                    <Text style={{fontSize:15}}>
                        {this.state.word}
                    </Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                        Type :{""}
                    </Text>
                    <Text style={{fontSize:15}}>
                        {this.state.lexicalCategory}
                    </Text>
                </View>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.detailsTitle}>
                        Definition :{""}
                    </Text>
                    <Text style={{fontSize:15}}>
                        {this.state.definition}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputBoxContainer:{
        flex:0.3,
        alignItems:'center',
        textAlign:'center',
        justifyContent:'center',
        borderWidth:5,
    },
    inputBox:{
        borderWidth:1,
        borderRadius:3,
        width:'80%',
        alignSelf:'center',
        marginTop:15,
    },
    searchButton:{
        borderWidth:1,
        borderRadius:3,
        width:110,
        alignSelf:'center',
        marginTop:15,
    },
    text:{
        textAlign:'center',
    },
    detailsContainer:{
        textAlign:'center',
        marginTop:20,
    },
    detailsTitle:{
        textAlign:'left',
        color:'black',
        marginLeft:30,
    }
})