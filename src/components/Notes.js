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
import AddNotes from './AddNotes';


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
  // ()=>()=>{} - kiểu arrow function cho thêm giá trị đầu vào
  onPress =(values)=> () => {
 //   console.log(JSON.stringify(values));
    const db = new Schema();
    db.remove(values, ()=>{this.load()})
    // db.delete('NotesSchema');
    // this.load();
  };

  renderSwipeableRightRow= (values)=>  (progress) => {
    const trans = progress.interpolate({inputRange: [0, 1], outputRange: [75, 0]});
    return (
      <View style={{width: 75, marginVertical: 3}}>
        <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
          <RectButton style={[styles.action, {backgroundColor: colors.secondaryFirstColor}]} onPress={this.onPress(values)}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Xóa</Text>
          </RectButton>
          <RectButton style={[styles.action, {backgroundColor: colors.secondaryThirdColor}]} onPress={() => {
            if (this.addNotes) {
              this.addNotes.toggleModalVisible();
            }
          }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Sửa</Text>
          </RectButton>
        </Animated.View>
        <AddNotes ref={ref => this.addNotes = ref}/>
      </View>
    );
  };


  render() {
    const {arr} = this.state;
    return (
      <View style={styles.container}>
        {arr.map((values, index) => {
          const date = values.time.getDate() + '/' + values.time.getMonth() + '/' + values.time.getFullYear();
          const time = values.time.getHours() + ':' + values.time.getMinutes() + ':' + values.time.getSeconds();
          return (
            <View key={index}>
              <Swipeable key={index} renderRightActions={this.renderSwipeableRightRow(values)}>
                <TouchableOpacity style={[styles.content, styles.shadowButton, {backgroundColor: values.colors}]}>
                  <Text style={{fontSize: textSize.largeSize}}>{values.name}</Text>
                  <View style={styles.lines}/>
                  <Text>{values.content}</Text>
                  <View style={{alignItems: 'flex-end', justifyContent: 'flex-end', flex: 1}}>
                    <Text>{time + ' ' + date}</Text>
                  </View>
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
    marginLeft: 3,
    marginVertical: 1.5,
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
