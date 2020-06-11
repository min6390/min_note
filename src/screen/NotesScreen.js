import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, TouchableOpacity, Image,
} from 'react-native';
import Notes from '../components/Notes';
import colors from '../asset/elements/colors';
import AddNotes from '../components/AddNotes';


export default class NotesScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1, backgroundColor: colors.backgroundColor}}>
          <Notes/>
        </ScrollView>
        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <TouchableOpacity style={styles.buttonAdd}
                            onPress={() => {
                              if (this.addNotes) {
                                this.addNotes.toggleModalVisible();
                              }
                            }}>
            <Image source={require('../asset/image/add.png')}/>
          </TouchableOpacity>
        </View>
        <AddNotes ref={ref => this.addNotes = ref}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    backgroundColor: colors.backgroundColor,
    flex: 1,
  },
  buttonAdd: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'absolute',
    padding: 5,
  },
});
