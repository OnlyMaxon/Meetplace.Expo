import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const users = [{email:'alice@example.com', nickname:'@alice'},{email:'bob@example.com', nickname:'@bob'}];

export default function ChatList(){
  const router = useRouter();
  return (
    <View style={{flex:1,padding:12}}>
      <FlatList data={users} keyExtractor={(i)=>i.email} renderItem={({item})=> (
        <TouchableOpacity onPress={()=>router.push({pathname:'/chat',params:{other:item.email}})} style={{padding:12,borderBottomWidth:1,borderColor:'#222'}}>
          <Text style={{color:'#fff'}}>{item.nickname} — {item.email}</Text>
        </TouchableOpacity>
      )} />
    </View>
  );
}
