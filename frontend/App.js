import React from "react";
import { Provider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./core/theme";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import Login from './pages/Login'
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Start from './pages/Start';
import Home from './pages/Home';
import Appts from './pages/Appts';
import Browse from './pages/Browse';
import Details from './pages/Details';
import Categories from "./pages/Categories";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const StackForLogin = createStackNavigator();

{/* Home Pages: Summary and Detailed View */}
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Summary" component={Home}/>
      <Stack.Screen name="Details" component={Details}/>
    </Stack.Navigator>
  );
}

function BrowseStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TAH Categories" component={Browse}/>
      <Stack.Screen name="Categories" component={Categories}/>
    </Stack.Navigator>
  )
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Appointments') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Browse') {
            iconName = focused ? 'search' : 'search-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Appointments" component={Appts} />
      <Tab.Screen name="Browse" component={BrowseStack} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <StackForLogin.Navigator
          initialRouteName="Start"
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Login Screens */}
          <StackForLogin.Screen name="Start" component={Start} />
          <StackForLogin.Screen name="Login" component={Login} />
          <StackForLogin.Screen name="Register" component={Register} />
          <StackForLogin.Screen name="ResetPassword" component={ResetPassword} />

          {/* After login, navigate to the main app with tabs */}
          <StackForLogin.Screen 
            name="MainTabs" 
            component={MainTabs} 
            options={{headerShown: false}} 
          />
        </StackForLogin.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
