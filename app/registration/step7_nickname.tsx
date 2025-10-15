import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function Step7Nickname({ draft, onNext, onBack }: any) {
  const [nick, setNick] = useState(draft.nickname ?? '');
  useEffect(()=>{ setNick(draft.nickname ?? ''); },[]);

  const [error, setError] = useState<string | null>(null);
  const submit = () => {
    if (!nick.trim()) { setError('Введите никнейм'); return; }
    setError(null);
    draft.nickname = nick.trim();
    onNext();
  };

  return (
    <View style={{flex:1,padding:24}}>
      <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Придумайте никнейм</Text>
      <TextInput placeholder="@Nick" value={nick} onChangeText={setNick} style={{backgroundColor:'#222',color:'#fff',padding:8,borderRadius:8,marginTop:12}} />
      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:12}}>
        {error ? <Text style={{color:'red',marginTop:8}}>{error}</Text> : null}
        <Button title="Назад" onPress={onBack} />
        <Button title="Далее" onPress={submit} />
      </View>
    </View>
  );
}
