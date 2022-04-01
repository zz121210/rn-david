// In App.js in a new project

import React, {useEffect} from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';	// 라이브러리 추가!!
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './src/screens/Login'
import Join from './src/screens/Join'

import Home from './src/screens/Home'

import Comment from './src/screens/Comment'
import Album from './src/screens/Album'
import Jutin from './src/screens/Jutin'
import Event from './src/screens/Event'
import Notice from './src/screens/Notice'

const Stack = createNativeStackNavigator();

// const loginCheck = () => {
//   return new Promise(resolve => {
//     AsyncStorage.getItem('userData')
//     .then(data => resolve(data))
//   });
// }

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ title: '메인' }}
        />

        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{ title: '로그인' }}
        />

        <Stack.Screen 
          name="Join" 
          component={Join}
          options={{ title: '회원가입' }}
        />

        <Stack.Screen 
          name="Comment" 
          component={Comment}
          options={{ title: '나도 한마디' }}
        />

        <Stack.Screen 
          name="Album" 
          component={Album}
          options={{ title: '다비 앨범' }}
        />

        <Stack.Screen 
          name="Jutin" 
          component={Jutin}
          options={{ title: '주틴나눔' }}
        />


        <Stack.Screen 
          name="Event" 
          component={Event}
          options={{ title: '이벤트' }}
        />

        <Stack.Screen 
          name="Notice" 
          component={Notice}
          options={{ title: '공지사항' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;