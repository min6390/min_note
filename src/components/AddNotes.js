import React from 'react';
import {View, Text, Dimensions, StyleSheet, Modal, TouchableOpacity, TextInput, Image} from 'react-native';
import colors from '../asset/elements/colors';
import textSize from '../asset/elements/textSize';
import {EventRegister} from "react-native-event-listeners";
import Schema from '../database/Schema';

export default class AddNotes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  toggleModalVisible() {
    this.setState({isModalVisible: !this.state.isModalVisible});
  }

  onChangTextTitle = (name) => {
    this.setState({name});
  };
  onChangTextContent = (content) => {
    this.setState({content});
  };

  onPress = () => {
    this.toggleModalVisible();
    const {name, content} = this.state;
    const object = {
      id: new Date().getTime(),
      created : new Date(),
      name: name,
      content: content,
      colors: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256) + ',' + (Math.floor(Math.random() * 256))) + ')',
      time: new Date().toISOString()
    };
    const db = new Schema();
    db.create('NotesSchema', object, (result) => {
      if (result) {
        EventRegister.emitEvent('arrNotes');
        this.setState({
          name: '',
          content: '',
          backgroundColor: '',
        });
      }
    });
  };
  onPressCancel = () => {
    this.toggleModalVisible();
  };

  renderItem() {
    const {name, content} = this.state;
    const isCheck = name && content && name.length && content.length > 0;
    return (
      <View style={styles.container}>
        <View style={[styles.viewModal]}>
          <TouchableOpacity style={styles.buttonCancel}
                            onPress={this.onPressCancel}>
            <Image source={require('../asset/image/stop.png')}/>
          </TouchableOpacity>
          <TextInput
            placeholder={'Tiêu đề'}
            style={[styles.textInputTitle, {fontSize: textSize.largeSize}]}
            multiline={true}
            onChangeText={this.onChangTextTitle}
            value={this.state.name}/>
          <TextInput
            placeholder={'Nội dung'}
            style={styles.textInputContent}
            multiline={true}
            onChangeText={this.onChangTextContent}
            value={this.state.content}/>
          <View style={{alignItems: 'center', flex: 1, justifyContent: 'flex-end'}}>
            <TouchableOpacity style={isCheck ? styles.button : ''}
                              onPress={this.onPress}>
              <Text style={[{fontSize: textSize.smallSize}]}>{isCheck ? 'Xác nhận' : ''}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Modal
        visible={this.state.isModalVisible}
        animationType={'slide'}
        transparent>
        {this.renderItem()}
      </Modal>
    );
  }
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.placeholderTextColor,
    opacity: 0.86,
  },
  viewModal: {
    padding: 10,
    position: 'absolute',
    borderRadius: 10,
    height: '60%',
    width: '90%',
    backgroundColor: 'white',
  },
  textInputTitle: {
    marginTop: 10,
    borderBottomWidth: 1 / 2,
    borderColor: 'black',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInputContent: {
    marginTop: 10,
    flex: 1,
    textAlignVertical: 'top',
  },
  button: {
    alignItems: 'center',
    margin: 10,
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'green',
    height: '30%',
    width: '40%',
  },
  buttonCancel: {
    position: 'absolute',
    left: '90%',
    width: 30,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    margin: 10,
  },
});
