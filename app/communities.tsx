import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { loadPosts, Post, seedMockPosts } from '../lib/services/postsStorage';

export default function Communities() {
  const [items, setItems] = useState<Post[]>([]);
  useEffect(()=>{ (async ()=>{ await seedMockPosts(); setItems(await loadPosts()); })(); },[]);
  return (
    <View style={{flex:1,padding:12}}>
      <Text style={{fontSize:18,color:'#fff',marginBottom:8}}>Communities (mocked by posts)</Text>
      <FlatList data={items} keyExtractor={(i)=>i.id}
        renderItem={({item})=> (
          <View style={{paddingVertical:8, borderBottomWidth:1, borderColor:'#222'}}>
            <Text style={{color:'#fff',fontWeight:'600'}}>{item.author}</Text>
            <Text style={{color:'#ddd'}}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}
