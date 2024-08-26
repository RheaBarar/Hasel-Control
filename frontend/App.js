import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from './pages/Home';
import Appts from './pages/Appts';
import Browse from './pages/Browse';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Navigation Bar Customisations */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Appointments') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Browse') {
              iconName = focused ? 'search' : 'search-outline'
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'black',
        })}
      >

        {/* Pages */}
        <Tab.Screen name="Home" component={Home}></Tab.Screen>
        <Tab.Screen name="Appointments" component={Appts}></Tab.Screen>
        <Tab.Screen name="Browse" component={Browse}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}