import React, { Component } from 'react'
import {Text} from 'react-native'
import Firebase from 'firebase'

//components
import {Button,Card,CardSection,Input,Spinner} from './common'

class LoginForm extends Component{
    state = {
        email:'',
        pswd:'',
        backMsg:'',
        clicked:false,
        logged:false
        
    }
    login(){
        this.setState({clicked:true});
        const {email,pswd} = this.state;
        Firebase.auth().signInWithEmailAndPassword(email,pswd)
        .catch((err)=> {
            if(err)
                this.register(email,pswd);
                
        })
    }
    onFailed(err){
        this.setState({backMsg:err.message,clicked:false});
    }

    register(email,pswd){
        Firebase.auth().createUserWithEmailAndPassword(email,pswd).catch((err)=> {
            if(err){
                console.log(err);
                this.onFailed(err);
            }
        });
    }
    renderButtonOrSpinner(){
        if(this.state.clicked){
            return(
                <Spinner size="small" />
            );
        }else{
            return(
                    <Button onPress={this.login.bind(this)}>
                        Login
                    </Button>
                );
            }
        
    }
    render(){
        return(
            <Card>
                {/* email input */}
                <CardSection>
                    <Input
                    label="Email" 
                    value={this.state.email}
                    onChangeText = {email => this.setState({email})}
                    placeholder="username@gmail.com"
                    />
                </CardSection>

                <CardSection>
                    <Input 
                    label="Password"
                    value={this.state.pswd}
                    onChangeText={pswd => this.setState({pswd})}
                    placeholder="password"
                    secureTextEntry={true}
                
                    />
                </CardSection>

                <Text style={{justifyContent:'center',flexDirection:'row',alignSelf:'center'}}>{this.state.backMsg}</Text>

                <CardSection>
                    {this.renderButtonOrSpinner()}
                </CardSection>
            </Card>
        );
    }
}

export default LoginForm;