
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,

} from 'react-native';


export default class HomeScreen extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text>Home</Text> 
          </View>
      </SafeAreaView>
    )
  };

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});