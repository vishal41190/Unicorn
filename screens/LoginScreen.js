import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Button,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux'
import { login } from '../actions'
import {EMAIL,PASSWORD} from '../constants/Validation'


class LoginScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      emailFocus:false,
      passwordFocus:false,
      emailError:false,
      passwordError:false,
      errorMessage:"",
      error:true,
      email:"",
      password: "" };
  }


  componentWillReceiveProps(nextProps) {
  
    if (nextProps.token != undefined) {

      AsyncStorage.setItem('userToken', nextProps.token);
      this.props.navigation.navigate('Home');
    }

    if (nextProps.error != undefined) {
      this.setState({ errorMessage: nextProps.errorMessage });
    }else{
      this.setState({ errorMessage: "" });
    }
  }

  updateEmail(email){
    this.setState({ email });
    this.validate();
  }

  updatePassword(password) {
    this.setState({ password});
    this.validate();
  }

  goToSignUp(){
    this.props.navigation.navigate('Registration');
  }

  render() {
    
    const { email, password, emailError,passwordError, error , errorMessage } = this.state;
    return (

      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.companyLogoContainer}>
             <Text style={styles.logoText}>Unicorn</Text>
          </View>

          <View style={styles.loginFormContainer}>

            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInput}
                value={email}
                placeholder="Email"
                autoCapitalize='none'
                onBlur={()=>{this.setState({emailFocus:true});this.validate();}}
                onChangeText={(text) => this.updateEmail(text)}
              />
            </View>
            {emailError ? <Text style={styles.errorMessage} >Not a valid email</Text> : null}

            <View style={styles.textInputWrapper}>
              <TextInput
                secureTextEntry={true}
                style={styles.textInput}
                value={password}
                placeholder="Password"
                onFocus ={()=>this.setState({passwordFocus:true})}
                onBlur={()=>{this.validate();}}
                onChangeText={(text) => this.updatePassword(text)}
              />
            </View>
            {passwordError ? <Text style={styles.errorMessage} >Password needs to be at least 6 character long</Text> : null}

            <View style={styles.loginButtonWrapper}>
              <Button style={styles.LoginButton}
                title="LogIn"
                color="#ffff"
                disabled={error}
                onPress={() => this.onPressLoginButton()}
              />
            </View>
            {errorMessage != "" ? <Text style={styles.errorMessage} >{errorMessage}</Text> : null}

            <View style={styles.companyLogoContainer}>
              <Text style={{marginBottom: 10}}>
                Don't have a account? 
                <Text style = {styles.goToSignUpButton} onPress={()=>this.goToSignUp()}> Sign up</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  onPressLoginButton = async () => {
    if(this.validate()){
      
      let user = { email:this.state.email, password: this.state.password };
      this.props.dispatch(login(user));
    }
    else{
      this.setState({ error: true });
    }

  }

  goToSignUp(){
    this.props.navigation.navigate('Registration');
  }

  validate(){
    let valid = true;

    //Validate Email
    if(EMAIL.test(this.state.email) === false){
        valid = false;
       this.state.emailFocus ?  this.setState({emailError:true}): null;
    }else{
      this.setState({emailError:false})
    }

    //Validate password
    if(PASSWORD.test(this.state.password) == false){
      valid = false;
     this.state.passwordFocus ?  this.setState({passwordError:true}) : null;

    }else{
      this.setState({passwordError:false})
    }

    this.setState({error:!valid})
    return valid;
  }
}

var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  errorMessage: {
    color: "red"
  },
  contentContainer: {
    paddingTop: 30,
  },
  companyLogoContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
  },
  logoText: {
    fontSize:46,
    marginTop: 3,
    color:'#fb1577'
  },
  loginFormContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  textInputWrapper: {
    width: width - 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  textInput: {
    padding: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20
  },
  loginButtonWrapper: {
    width: 150,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "#fb1577"
  }
});


const mapStateToProps = (state) => {

  return {
    token: state.user.user.token,
    error: state.user.user.error,
    errorMessage:state.user.user.errorMessage
  }
};


export default connect(mapStateToProps)(LoginScreen)

