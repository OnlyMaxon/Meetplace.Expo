import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { loadUsers, saveCurrentUser } from '../lib/services/userStorage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const doLogin = async () => {
    const users = await loadUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      setError('Пользователь не найден или пароль неверный.');
      return;
    }
    await saveCurrentUser({ ...found, isLoggedIn: true });
    router.replace('/(tabs)');
  };

  return (
    <View style={{flex:1,backgroundColor:'#121212',padding:24,justifyContent:'center'}}>
      <Text style={{color:'#fff',fontSize:22,marginBottom:12}}>Вход</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{backgroundColor:'#222',color:'#fff',padding:8,borderRadius:6}} />
      <View style={{height:12}} />
      <TextInput placeholder="Пароль" value={password} onChangeText={setPassword} secureTextEntry style={{backgroundColor:'#222',color:'#fff',padding:8,borderRadius:6}} />
      {error ? <Text style={{color:'red',marginTop:8}}>{error}</Text> : null}
      <View style={{height:12}} />
      <Button title="Войти" onPress={doLogin} />
    </View>
  );
}
