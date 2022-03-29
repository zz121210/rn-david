import React, { useState  } from 'react';
import { View, SafeAreaView, StyleSheet, Text, Button, Alert, TextInput, TouchableOpacity} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import database from '@react-native-firebase/database';

function idCheck(id) {
  return new Promise(resolve => {
    database()
    .ref('/users')
    .once('value')
    .then(data => {
      return resolve(data.val()[id] != undefined);
    })
    .catch(() => {
      return resolve(false)
    });
  });
}

function createId(id, pw, nickname, role) {
  database()
    .ref('/users/' + id)
    .set({
      pw: pw,
      nickname: nickname,
      role: role
    })
}

async function joinProcess(id, pw, nickname, role) {
  if(id == "" || pw == "" || nickname == "" || role == "") {
    alert("모든 양식을 작성해주세요.")
    return false
  }

  const idcheck = await idCheck(id);
  if(idcheck == true) {
    alert("사용중인 아이디입니다.");
    return false
  } else {
    createId(id, pw, nickname, role);
    alert("회원가입을 축하드립니다.")
    return true
  }
}

// == true ? navigation.navigate("Login") : alert('회원가입 실패')


const Join = ({ navigation }) => {

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [nickname, setNickname] = useState('');
  const [role, setRole] = useState('');
  return(
    <SafeAreaView>
      <View style={{marginTop: "5%"}}>
        <TextInput placeholder='아이디를 입력하세요.' onChangeText={text => setId(text)} />
        <TextInput placeholder='비밀번호를 입력하세요.' secureTextEntry={true} onChangeText={text => setPw(text)} />
        <TextInput placeholder='닉네임을 입력하세요.' onChangeText={text => setNickname(text)} />
        <RNPickerSelect
          onValueChange={value => setRole(value)}
          placeholder={{
            label: "역할을 선택해주세요."
          }}
          items={[
            { label: '학생', value: 'student' },
            { label: '선생님', value: 'teacher' }
          ]}
        />
        <Button title="회원가입" onPress={() => joinProcess(id, pw, nickname, role).then(bool => {if(bool == true) navigation.navigate("Login")}) }/>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{textAlign:"center", marginTop:20}}>로그인</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default Join;