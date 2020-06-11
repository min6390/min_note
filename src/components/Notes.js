import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity, Dimensions,
} from 'react-native';
import textSize from '../asset/elements/textSize';

export default class Notes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      arr: DATA,
    };
  }

  render() {
    const {arr} = this.state;
    return (
      <View style={styles.container}>
        {arr.map((values, index) => {
          return (
            <View key={index} style={{flexDirection: 'row'}}>
              <TouchableOpacity style={[styles.content, styles.shadowButton]}>
                <Text style={{fontSize: textSize.largeSize}}>{values.id}</Text>
                <View style={styles.lines}/>
                <Text>{values.title}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }
}
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    padding: 10,
    height: width / 2.2,
    width: width / 2.2,
    backgroundColor: 'pink',
    margin: 5,
    borderRadius: 10,

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