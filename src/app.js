import React,{Component} from 'react'
import {View, Text} from 'react-native'
import Firebase from 'firebase'

// other Components
import {Header,Button,Spinner,CardSection,Card} from './components/common'
import LoginForm from './components/LoginForm'
import Home from './Home'

class App extends Component{
    state = {
        logged:undefined,
        backMsg:''
    }
    componentWillMount(){
        // initialize firebase config
        Firebase.initializeApp({
                apiKey: 'AIzaSyANTia53lK0m0u73ovn5Qw87rcQ66VmL7k',
                authDomain: 'loginapp-72050.firebaseapp.com',
                databaseURL: 'https://loginapp-72050.firebaseio.com',
                projectId: 'loginapp-72050',
                storageBucket: '',
                messagingSenderId: '89985634260'
        });
        //Auth checked
        Firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({logged:true})
            }else{
                this.setState({logged:false})
            }
        });
    }
    logout(){
        console.log('logged out');
        Firebase.auth().signOut();
    }

    renderFormOrHome(){

        switch(this.state.logged){
            case true:
                return(
                <CardSection>
                    <Home />
                    <Button onPress={()=>this.logout()}>
                        logout
                    </Button>
                </CardSection>
                );

            case false:
                return(
                    <LoginForm style={{flex:3}} />
                );
            case undefined:
            return (
            <Spinner style={{paddingTop:50}} size="large" />
            );
        }

    }
    render(){
        return(
            <View>
                <Header style={{flex:1}} title="Authentication App Firebase" />
                {this.renderFormOrHome()}
            </View>
        );
    }
}

export default App;