import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, Button, ScrollView, FlatList} from 'react-native';
import database, { firebase } from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Jutin = ({ navigation }) => {

  const text1 = useRef(null);
  const [jutin, setJutin] = useState('');
  const [data, setData] = useState('');

  const regJutin = (jutin) => {
    if(jutin != "") {
      let key = Math.floor(+ new Date() / 1000);
      AsyncStorage.getItem('userData')
        .then(data =>   
          database()
          .ref('/jutins/' + key)
          .set({
            id : JSON.parse(data).id,
            jutin: jutin,
            regDate: new Date().toString(),
          })
        )
    }
    setJutin("")
    text1.current.clear();
  }

    useEffect(() => {
    let changeDataRef = firebase.database().ref('jutins');
    changeDataRef.on("value", (snapshot) => {
      let tmp = []

        snapshot.forEach(child => {
          tmp.push({
            key : child.key,
            id : child.val().id,
            jutin : child.val().jutin,
            regDate: child.val().regDate
          })
        })
      
      setData(tmp.reverse())
    })
    
  }, [])

  const renderItem = ({item}) => {
    return (
      <View style={{
        marginTop: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: 70,
        paddingTop: 5,
        paddingBottom: 5,
      }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Text>
              {item.id}
            </Text>
            <Text>
            </Text>
          </View>
          <View>
            <Text>
              {item.jutin}
            </Text>
          </View>
      </View>
    );
  }

  return(
    <SafeAreaView style={{flex: 1}}>
      <View>
        <FlatList data={data} renderItem={renderItem}/>
      </View>
      <View style={{display:"flex", position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: "white", paddingRight: 20, paddingLeft: 20, flexDirection: 'row'}}>
        <TextInput
          ref={text1}
          style = {{flex: 4}}
          multiline ={true}
          onChangeText={text => setJutin(text)}
        ></TextInput>
        <View style = {{flex: 1}}>
          <Button
            onPress={() => regJutin(jutin)}
            title="등록"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Jutin;