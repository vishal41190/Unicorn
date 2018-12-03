
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  Animated,
  Easing,
  Image,
  AsyncStorage,
  Platform,
  Alert

} from 'react-native';
import { connect } from 'react-redux'
import { getUser } from '../actions'
import { Icon } from 'react-native-elements';
import TrackPlayer from 'react-native-track-player';


const url = "https://www.dropbox.com/s/zrl1jsdk29qdv5r/Pink%20Fluffy%20Unicorns%20Dancing%20on%20Rainbows%20-%20Fluffle%20Puff%20.mp3?raw=1";
class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      error: false,
      errorMessage: false,
      musicLoaded:false,
      playing:false
    }
    this.animatedValue = new Animated.Value(0)


  }

  componentDidMount() {
    this.props.dispatch(getUser());
    TrackPlayer.registerEventHandler(this.playerEvents);
    TrackPlayer.setupPlayer().then(() => {
      var track = {
        id: 'Unicorn',
        url: url,
        title: 'Unicorn',
        artist: 'Unicorn'
      };

      TrackPlayer.add([track]).then(function () {
        // this.setState({musicLoaded:true});
        // TrackPlayer.play();
      }).catch(error => {
        console.log(error);
      });
    });
    this.setState({musicLoaded:true});
    // this.animate()
  }

  animate() {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear
      }
    ).start(() =>  {  if(this.state.playing){
     
      this.animate();
    }
   
  
  })
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.user) {
      this.setState({ user: nextProps.user });
    }
  }

  playerEvents =  async (data) => {
    // Handles the player event
    
    if(data.type == "playback-queue-ended" && Platform.OS == 'ios'){
        TrackPlayer.seekTo(0);
        TrackPlayer.play();
    }
};

  render() {
    const { user,musicLoaded,playing} = this.state;
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [width, -width]
    })
    return (

      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.welcomeTextWrapper}>
            <Text style={styles.welcomeText}>HI, {user.name}</Text>
          </View>
          <View style={styles.playerWrapper}>

            {!playing ? <Icon
              name="play"
              type="font-awesome"
              size={40}
              color="black"
              raised={true}
              disabled={!musicLoaded}
              containerStyle={styles.playerIcons}
              onPress={() => this.playMusic()} /> :null}
           {playing? <Icon
              name="pause"
              type="font-awesome"
              size={40}
              color="black"
              raised={true}
              disabled={!musicLoaded}
              containerStyle={styles.playerIcons}
              onPress={() => this.pauseMusic()} /> : null}
            <Icon
              name="stop"
              type="font-awesome"
              size={40}
              color="black"
              raised={true}
              disabled={!playing}
              containerStyle={!playing ? [styles.playerIcons,styles.disabledPlayerIcons] :styles.playerIcons}

              onPress={() => this.stopButtonPressed()} />


          </View>
        </View>
        <View style={styles.animationContainer}>
          <Animated.View style={{position:'absolute',marginLeft:marginLeft,flexDirection: 'row'}}>
          <Image source={
              require('../assets/images/unicorn.png')
            }
            style={{
              marginLeft : (width-120)/3 ,
              height: 30,
              width: 40,
            }} />
          <Image
            source={
              require('../assets/images/unicorn.png')
            }
            style={{
              marginLeft: (width-120)/3,
              height: 30,
              width: 40,
            }} />
           <Image
            source={
              require('../assets/images/unicorn.png')
            }
            style={{
              marginLeft : (width-120)/3,
              height: 30,
              width: 40,
            }} />
            </Animated.View>
        </View>

        <View style={styles.logOutButtonWrapper}>
              <Text style={{marginBottom: 10}}>
                <Text onPress={()=>this.logOut()}> Log Out </Text>
              </Text>
            </View>

      </SafeAreaView>
    )




  };

  pauseMusic(){
    TrackPlayer.pause();
    this.setState( {playing:false});
  }
  playMusic(){
    this.setState( {playing:true});
    TrackPlayer.play();
    // TrackPlayer.seekTo(3630.0); For testing loop for IOS and Android
    this.animate();
  }

  stopButtonPressed() {
    TrackPlayer.stop();
    this.setState( {playing:false})
  };

  logOut = async () => {

    TrackPlayer.stop();
    this.setState( {playing:false})

    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('LogIn');


    Alert.alert(
      'You got logged out!',
      '',
      [
        {text: 'OK', onPress: () => {}},
      ],
      { cancelable: false }
    )
    // nevigate('Settings');
  }

}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    alignItems: 'center'
  },
  welcomeTextWrapper: {
    marginTop: 20,
    fontSize: 46
  },
  welcomeText: {
    fontSize: 46,
  },
  playerWrapper: {
    flexDirection: 'row',
    marginTop: 20
  },
  playerIcons: {

    backgroundColor: '#fb1577',

  },
  disabledPlayerIcons:{
    backgroundColor: '#d3d3d3',
  },
  playerIconsDisabled: {
    backgroundColor: 'black'
  },
  animationContainer: {
    flex: 1,
    marginTop: 20,
    height:100,
    flexDirection: 'row',
  },
  logOutButtonWrapper:{
    marginBottom:100,
    alignItems: 'center',
  }

});


const mapStateToProps = (state) => {

  return {
    user: state.user.user.user,
    error: state.user.user.error,
    errorMessage: state.user.user.errorMessage
  }
};

export default connect(mapStateToProps)(HomeScreen)


{/* <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */ }
