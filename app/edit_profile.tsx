import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { loadCurrentUser, saveCurrentUser } from '../lib/services/userStorage';
import { useRouter } from 'expo-router';

export default function EditProfile(){
  const [user, setUser] = useState<any>(null);
  const [nickname, setNickname] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  useEffect(()=>{ (async ()=>{ const u = await loadCurrentUser(); setUser(u); setNickname(u?.nickname ?? ''); setStatus(u?.status ?? ''); })(); },[]);

  const save = async ()=>{
    if (!user) return;
    const updated = { ...user, nickname, status };
    await saveCurrentUser(updated);
    router.back();
  };

  if (!user) return null;

  return (
    <View style={{flex:1,padding:24}}>
      <Text style={{fontSize:18,color:'#fff'}}>Nickname</Text>
      <TextInput value={nickname} onChangeText={setNickname} style={{backgroundColor:'#222',color:'#fff',padding:8,borderRadius:8,marginTop:8}} />
      <Text style={{fontSize:18,color:'#fff',marginTop:12}}>Status</Text>
      <TextInput value={status} onChangeText={setStatus} style={{backgroundColor:'#222',color:'#fff',padding:8,borderRadius:8,marginTop:8}} />
      <View style={{height:12}} />
      <Button title="Save" onPress={save} />
    </View>
  );
}
