import React,{Component} from  'react';
import {View,Text} from 'react-native';

class Home extends Component{
    render(){
        return(<View style={{flex:1,flexDirection:'column',justifyContent:'center'}}>
            <Text>
                You just Logged in as 
            </Text>
        </View>);
    }
}

export default Home;