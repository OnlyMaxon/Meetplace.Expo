import React from 'react';
import { View, Text, FlatList } from 'react-native';

const items = [{id:'1',title:'First Post',text:'Hello world'},{id:'2',title:'Second',text:'More text'}];

export default function Posts(){
  return (
    <View style={{flex:1,padding:12}}>
      <FlatList data={items} keyExtractor={i=>i.id} renderItem={({item})=> (
        <View style={{padding:12,borderBottomWidth:1,borderColor:'#222'}}>
          <Text style={{color:'#fff',fontWeight:'bold'}}>{item.title}</Text>
          <Text style={{color:'#ccc'}}>{item.text}</Text>
        </View>
      )} />
    </View>
  );
}
