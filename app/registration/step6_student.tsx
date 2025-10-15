import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export default function Step6Student({ draft, onNext, onBack }: any) {
  const [isStudent, setIsStudent] = useState<boolean | null>(draft.isStudent ?? null);
  useEffect(()=>{ setIsStudent(draft.isStudent ?? null); },[]);

  const [error, setError] = useState<string | null>(null);

  return (
    <View style={{flex:1,padding:24}}>
      <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Вы студент?</Text>
      <View style={{height:12}} />
      <Button title="Я студент" onPress={()=>setIsStudent(true)} />
      <View style={{height:8}} />
      <Button title="Я не студент" onPress={()=>setIsStudent(false)} />
      <View style={{flex:1,justifyContent:'flex-end'}}>
        {error ? <Text style={{color:'red',marginTop:8}}>{error}</Text> : null}
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Button title="Назад" onPress={onBack} />
          <Button title="Далее" onPress={()=>{ if (isStudent===null) { setError('Выберите вариант'); return; } setError(null); draft.isStudent = isStudent; onNext(); }} />
        </View>
      </View>
    </View>
  );
}
