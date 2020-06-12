import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity, Dimensions, Animated,
} from 'react-native';
import textSize from '../asset/elements/textSize';
import {EventRegister} from 'react-native-event-listeners';
import Schema from '../database/Schema';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import colors from '../asset/elements/colors';


export default class Notes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      arr: [],
    };
  }

  componentDidMount() {
    this.arr = EventRegister.addEventListener('arrNotes', this.reload);
    this.load();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    EventRegister.removeEventListener(this.arr);
  }

  load() {
    const db = new Schema();
    const array = db.read('NotesSchema');
    this.setState({
      arr: array,
    });
  }

  reload = () => {
    this.load();
  };



  renderSwipeableRightRow = (progress) => {
    const trans = progress.interpolate({inputRange: [0, 1], outputRange: [75, 0]});
    return (
      <View style={{width: 75,marginVertical:3 }}>
        <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
          <RectButton style={[styles.action,{backgroundColor:colors.secondaryFirstColor}]} onPress={() => {
            console.log('aaa');
          }}>
            <Text style={{color:'white',fontWeight:'bold'}}>Xóa</Text>
          </RectButton>
          <RectButton style={[styles.action,{backgroundColor:colors.secondaryThirdColor}]} onPress={() => {
            console.log('aaa');
          }}>
            <Text  style={{color:'white',fontWeight:'bold'}}>Sửa</Text>
          </RectButton>
        </Animated.View>
      </View>
    );
  };


  render() {
    const {arr} = this.state;
    return (
      <View style={styles.container}>
        {arr.map((values, index) => {
          return (
            <View key={index}>
              <Swipeable key={index} renderRightActions={this.renderSwipeableRightRow}>
                <TouchableOpacity style={[styles.content, styles.shadowButton, {backgroundColor: values.colors}]}>
                  <Text style={{fontSize: textSize.largeSize}}>{values.name}</Text>
                  <View style={styles.lines}/>
                  <Text>{values.content}</Text>
                  <Text>{values.time.toString()}</Text>
                </TouchableOpacity>
              </Swipeable>
            </View>
          );
        })}
      </View>
    );
  }
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
  },

  action: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'pink',
    marginLeft:3,
    marginVertical:1.5
  },

  content: {
    marginVertical: 5,
    padding: 10,
    minHeight: width / 2,
    maxHeight: width,
    width: width - 25,
    backgroundColor: 'pink',
  },
  lines: {
    borderWidth: 1 / 2,
    marginVertical: 5,
    borderColor: 'white',
  },
  shadowButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
