import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, Button, TextInput, TouchableOpacity, Image, FlatList} from 'react-native';
import database, {firebase} from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';

const regImage = (image) => {
  let key = Math.floor(+ new Date() / 1000);
  storage()
  .ref(image)
  .getDownloadURL()
  .then((url) => {
    database()
    .ref('/album/' + key)
    .set({
      url: url,
      regDate: new Date().toString(),
    })
  })
}


const putFile = async(filename, uploadUri, image) => {
  await storage().ref(`images/${filename}`).putFile(uploadUri);
  regImage(image)
}


const Album = () => {
  const [data, setData] = useState('');

  const addImage = () => {
    launchImageLibrary({}, response => {
      const uri = response.assets[0].uri
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const image = `images/${filename}`
      putFile(filename, uploadUri, image)
    })
  }
  

  useEffect(() => {
    let changeDataRef = firebase.database().ref('album');
    changeDataRef.on("value", (snapshot) => {
      let tmp = []

        snapshot.forEach(child => {
          tmp.push({
            url : child.val().url,
          })
        })
      
      setData(tmp.reverse())
    })
  }, [])

  const renderItem = ({item}) => {
    return (
      <Image style={{height: 400, width: "100%"}} source={{uri: item.url}} />      
    );
  }
  
  return(
    <SafeAreaView>
        <View>
          <FlatList data={data} renderItem={renderItem}/>
        </View>
        <View style={{display:"flex", position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: "white", padding: 20, flexDirection: 'row'}}>
          <View style = {{flex: 1, backgroundColor: "blue"}}>
            <Button
              title="사진 등록"
              onPress={() => addImage()}
            />
          </View>
        </View>
          
    </SafeAreaView>
  )
}

export default Album;