import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const  Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{    
      backgroundColor: "rgb(237, 237, 237)"
    }}>
      <View style={item.purple}>
        <TouchableOpacity onPress={ () => { navigation.navigate("Comment") }} style={item.size_harf}>
          <View style={{
                    marginTop: "40%",
                    justifyContent: 'center',
                    marginLeft: 80
          }}>
            <Icon name="ios-chatbox-ellipses-outline"  size={100} color="black"/>
          </View>
          
          <View>
            <Text style={{fontSize: 30, margin :10, color: "black"}}>나도 한마디</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => { navigation.navigate("Album") }} style={item.size_harf}>
          <View style={{
                    marginTop: "40%",
                    justifyContent: 'center',
                    marginLeft: 80
          }}>
            <Icon name="ios-images-outline"  size={100} color="black"/>
          </View>
          
          <View>
            <Text style={{fontSize: 30, margin :10, color: "black"}}>다비앨범</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={item.blue}>
        <TouchableOpacity onPress={ () => { navigation.navigate("Jutin") }} style={item.size_harf}>
          <View>
            <Text style={{marginTop: "25%", fontSize: 30, margin :10, color: "black"}}>주틴나눔</Text>
          </View>
          <View style={{justifyContent: 'center', marginLeft: 60}}>
            <Icon name="ios-heart-outline"  size={120} color="black"/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => { navigation.navigate("Event") }} style={item.size_harf}>
          <View>
            <Text style={{marginTop: "25%", fontSize: 30, margin :10, color: "black"}}>이벤트</Text>
          </View>
          <View style={{justifyContent: 'center', marginLeft: 60}}>
            <Icon name="ios-thumbs-up-outline"  size={110} color="black"/>
          </View>
        </TouchableOpacity>
      </View>

      <View style={item.yellow}>
        <TouchableOpacity onPress={ () => { navigation.navigate("Notice") }} style={item.size_full}>
          <View>
            <Icon name="ios-megaphone-outline" size={100} color="black" style={{marginLeft:40}}></Icon>
          </View>
          <View>
            <Text style={{
              fontSize: 50, 
              color: "black", 
              justifyContent: 'center',
              marginLeft: 20}}>공지사항</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={item.green}>
          <Text style={{textAlign: "center",}}>2022.02.15. made by. WAW beta</Text>
      </View>

    </SafeAreaView>
  );
};

const item = StyleSheet.create({
  purple: {
    height: "37%",
    display: "flex",
    flexDirection: "row"
  },
  
  blue: {
    height: "35%",
    display: "flex",
    flexDirection: "row"
  },

  yellow: {
    height: "21%"
  },

  green: {
    marginTop: 10,
    height: "5%"
  },

  size_full: {
    width: "97%",
    height: "100%",
    backgroundColor: "white",
    margin: 5,
    background: '#ffffff',
	  shadowColor: "#000000", 
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
    display: "flex",
    flexDirection: "row",
    alignItems: 'center', //Centered vertically
    flex:1,

  },

  size_harf: {
    width: "47%",
    height: "97%",
    backgroundColor: "white",
    margin: 5,
    background: '#ffffff',
	  shadowColor: "#000000", 
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
  },
});

export default Home;
