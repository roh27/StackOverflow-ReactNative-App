import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Keyboard,
} from 'react-native';

export default class Answer extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Answers',
    headerRight: (
      <Button title="Back" onPress={() => navigation.goBack()} />
    ),
  });
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Details</Text>
      </View>
    );
  }
}
