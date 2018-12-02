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
import { register } from '../actions'
import {EMAIL,NAME,PASSWORD} from '../constants/Validation'


class RegistrationScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      nameFocus:false,
      emailFocus:false,
      passwordFocus:false,
      nameError:false,
      emailError:false,
      passwordError:false,
      errorMessage:"",
      error:true,
      name: "",
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

  updateName(name) {
    this.setState({ name });
   this.validate();
  }

  updateEmail(email){
    this.setState({ email });
    this.validate();
  }

  updatePassword(password) {
    this.setState({ password});
    this.validate();
  }


  render() {
    
    const { name,email, password, nameError,emailError,passwordError, error , errorMessage } = this.state;
    return (

      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.companyLogoContainer}>
             <Text style={styles.logoText}>Unicorn</Text>
          </View>

          <View style={styles.registrationFormContainer}>

             <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInput}
                value={name}
                placeholder="Name"
                onBlur={()=>{this.setState({nameFocus:true});this.validate();}}
                onChangeText={(text) => this.updateName(text)}
              />
            </View>
            {nameError ? <Text style={styles.errorMessage} >Name can only contain letters</Text> : null}
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

            <View style={styles.registrationButtonWrapper}>
              <Button style={styles.registrationButton}
                title="Register"
                color="#ffff"
                disabled={error}
                onPress={() => this.onPressRegistrationButton()}
              />
            </View>
            {errorMessage != "" ? <Text style={styles.errorMessage} >{errorMessage}</Text> : null}

            <View style={styles.companyLogoContainer}>
              <Text style={{marginBottom: 10}}>
                Don't have a account? 
                <Text style = {styles.goToLoginButton} onPress={()=> {}}> Login</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  onPressRegistrationButton = async () => {
    if(this.validate()){
      
      let user = { name: this.state.name, email:this.state.email, password: this.state.password };
      this.props.dispatch(register(user));
    }
    else{
      this.setState({ error: true });
    }

  }

  validate(){
    let valid = true;
    
    //Validate Name
    if(NAME.test(this.state.name) === false){
      valid = false;
      this.state.nameFocus ? this.setState({nameError:true}) : null;
    }else{
      this.setState({nameError:false})
    }

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
  registrationFormContainer: {
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
  registrationButtonWrapper: {
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


export default connect(mapStateToProps)(RegistrationScreen)

