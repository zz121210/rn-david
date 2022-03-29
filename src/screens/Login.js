import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, Button, TextInput, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

function loginCheck(id, pw) {
  return new Promise(resolve => {
    database()
    .ref('/users')
    .once('value')
    .then(data => {
      return resolve(data.val()[id]['pw'] == pw);
    })
    .catch(() => {
      return resolve(false)
    });
  });
}

function accountInfoAsyncStorage(id, pw) {
  database()
    .ref('/users')
    .once('value')
    .then(data => {
      AsyncStorage.setItem(
        'userData',
        JSON.stringify({
          id: id,
          pw: pw,
          nickname: data.val()[id]['nickname'],
          role: data.val()[id]['role']
        })
      );
  })

}

async function loginProcess(id, pw) {
  const loginChk = await loginCheck(id, pw);
  if(loginChk == true) {
    accountInfoAsyncStorage(id, pw)
    return true
  } else {
    return false
  }
}



const Login = ({ navigation }) => {

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  
  return(
    <SafeAreaView>
      <View style={{marginTop: "5%"}}>
        <TextInput placeholder='아이디를 입력하세요.' onChangeText={text => setId(text)}/>
        <TextInput placeholder='비밀번호를 입력하세요.' secureTextEntry={true} onChangeText={text => setPw(text)}/>
        <Button title="로그인" onPress={() => loginProcess(id, pw).then(bool => {bool == true ? navigation.navigate("Home") : alert("로그인 실패") })} />
        <TouchableOpacity onPress={() => navigation.push("Join")}>
          <Text style={{textAlign:"center", marginTop:20}}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Login;