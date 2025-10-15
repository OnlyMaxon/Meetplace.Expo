import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { loadCurrentUser } from '../lib/services/userStorage';
import { useRouter } from 'expo-router';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => { (async ()=> setUser(await loadCurrentUser()))(); }, []);

  if (!user) return <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>Not logged in</Text></View>;

  return (
    <View style={{flex:1,padding:16}}>
      {user.photoPath ? <Image source={{uri:user.photoPath}} style={{width:120,height:120,borderRadius:60}} /> : null}
      <Text style={{color:'#fff',fontSize:18,marginTop:12}}>{user.nickname ?? user.email}</Text>
      <Text style={{color:'#ccc',marginTop:6}}>{user.status ?? ''}</Text>
      <View style={{height:12}} />
      <Button title="Edit profile" onPress={()=>router.push('/edit_profile' as any)} />
    </View>
  );
}
