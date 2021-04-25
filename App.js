/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  ScrollView,
  FlatList,
  Keyboard,
} from 'react-native';
import {
  Container,
  Item,
  Icon,
  Input,
  Header,
  List,
  ListItem,
  Left,
  Body,
} from 'native-base';
import {Icons} from 'react-native-vector-icons/Feather';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data1: [],
      searchText: '',
      modalVisible: false,
      searchTitle: '',
    };
  }

  fetchData = async () => {
    const apiURL = await fetch(
      `https://api.stackexchange.com/2.2/similar?pagesize=20&order=desc&sort=relevance&title=${this.state.searchText}&site=stackoverflow`,
    );
    const json = await apiURL.json();
    this.setState({data: json.items});
  };

  fetchAnswer = async () => {
    const apiURL1 = await fetch(
      `https://api.stackexchange.com/2.2/search/excerpts?order=desc&sort=relevance&title=${this.state.searchTitle}&site=stackoverflow`,
    );
    const json1 = await apiURL1.json();
    this.setState({data1: json1.items});
  };
  setUsername = value => {
    Keyboard.dismiss();
    this.setState({searchText: value});
    this.fetchData();
  };
  render() {
    return (
      <Container>
        {this.state.modalVisible ? (
          <Modal visible={true}>
            <Header>
              <View style={styles.buttonView}>
                <Button
                  icon={{
                    name: 'chevron-left',
                    size: 15,
                    color: 'white',
                  }}
                  title="Back"
                  onPress={() => {
                    this.setState({
                      searchTitle: null,
                      modalVisible: false,
                    });
                  }}
                />
              </View>
            </Header>
            <ScrollView>
              <View style={styles.question1}>
                <Text style={styles.textQuestion}>
                  {this.state.searchTitle}
                </Text>
              </View>
              {this.state.data1.map((item, key) => (
                <List style={styles.ansContainer}>
                  <Text style={styles.heading}>Answer {key + 1}</Text>
                  <Text style={styles.answer}>{item.body}</Text>
                  <ScrollView style={styles.codeBg}>
                    <Text style={styles.code}>{item.excerpt}</Text>
                  </ScrollView>
                </List>
              ))}
            </ScrollView>
          </Modal>
        ) : null}
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              onChangeText={searchText => this.setState({searchText})}
              value={this.state.searchText}
            />
            <Button
              title="search"
              onPress={() => {
                this.setUsername();
              }}
            />
          </Item>
        </Header>
        <List style={styles.container}>
          <FlatList
            data={this.state.data}
            keyExtractor={({item, index}) => index}
            renderItem={({item}) => (
              <ListItem avatar>
                <Left style={styles.left}>
                  <Text>{item.score}</Text>
                  <Icon name="triangle" />
                </Left>
                <Body>
                  <Button
                    title={item.title}
                    onPress={() => {
                      this.setState({searchTitle: item.title});
                      if (this.state.searchTitle) {
                        this.fetchAnswer();
                        this.setState({modalVisible: true});
                      }
                    }}
                  />
                  <View style={styles.bottomContainer}>
                    <Text style={styles.name}>{item.owner.display_name}</Text>
                  </View>
                </Body>
              </ListItem>
            )}
          />
        </List>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  question: {
    color: '#165CAA',
    fontWeight: '600',
    fontSize: 20,
  },
  left: {
    backgroundColor: 'white',
    width: 40,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'flex-start',
    paddingRight: 30,
  },
  bottom: {
    backgroundColor: '#dfe8fa',
    width: 40,
    height: 20,
  },
  bottomText: {
    color: '#429bea',
  },
  bottomContainer: {
    flexDirection: 'row',
    width: '50%',
    height: 20,
    justifyContent: 'space-between',
  },
  time: {
    color: 'gray',
  },
  name: {
    color: '#2e90e8',
  },
  buttonView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingRight: 300,
  },
  question1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textQuestion: {
    fontSize: 30,
    color: 'black',
  },
  answer: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  code: {
    fontSize: 16,
    fontStyle: 'normal',
  },
  ansContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 30,
  },
  heading: {
    fontSize: 20,
  },
  codeBg: {
    backgroundColor: '#d8d8d8d8',
  },
});
