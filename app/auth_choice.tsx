import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function AuthChoice() {
  const router = useRouter();

  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center',padding:24}}>
      <Text style={{fontSize:22,marginBottom:16}}>Welcome to MeetPlace</Text>
  <Button title="Login" onPress={() => router.push('/login' as any)} />
      <View style={{height:8}} />
  <Button title="Register" onPress={() => router.push('/registration' as any)} />
    </View>
  );
}
