import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import HomeScreen from '../screen/HomeScreen';
import NotesScreen from '../screen/NotesScreen';
import WeatherScreen from '../screen/WeatherScreen';
import {createStackNavigator} from 'react-navigation-stack';
import Notes from '../components/Notes';

const TabNavigator = createBottomTabNavigator({
  NotesScreen: NotesScreen,
  HomeScreen: HomeScreen,
  WeatherScreen: WeatherScreen,
});
const Navigator = createStackNavigator({
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: {header: () => false},
  },
  Notes: {
    screen: Notes,
    navigationOptions: {header: () => false},
  },

});
export default createAppContainer(Navigator);
