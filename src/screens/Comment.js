import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, Button, ScrollView, FlatList} from 'react-native';
import database, { firebase } from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Comment = () => {

  const text1 = useRef(null);
  const [comment, setComment] = useState('');
  const [data, setData] = useState('');

  const regComment = (comment) => {
    if(comment != "") {
      let key = Math.floor(+ new Date() / 1000);
      AsyncStorage.getItem('userData')
        .then(data =>   
          database()
          .ref('/comments/' + key)
          .set({
            id : JSON.parse(data).id,
            nickname : JSON.parse(data).nickname,
            comment: comment,
            regDate: new Date().toString(),
          })
        )
    }
    setComment("")
    text1.current.clear();
  }

    useEffect(() => {
    let changeDataRef = firebase.database().ref('comments');
    changeDataRef.on("value", (snapshot) => {
      let tmp = []

        snapshot.forEach(child => {
          tmp.push({
            key : child.key,
            nickname : child.val().nickname,
            comment : child.val().comment,
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
              {item.nickname}
            </Text>
            <Text>
            </Text>
          </View>
          <View>
            <Text>
              {item.comment}
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
          onChangeText={text => setComment(text)}
        ></TextInput>
        <View style = {{flex: 1}}>
          <Button
            onPress={() => regComment(comment)}
            title="??????"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Comment;