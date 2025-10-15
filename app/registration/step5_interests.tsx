import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';

const base = ['#taxi', '#student', '#life', '#bmw', '#tech', '#music'];

export default function Step5Interests({ draft, onNext, onBack }: any) {
  const [selected, setSelected] = useState<string[]>(draft.interests ?? []);
  const [custom, setCustom] = useState('');

  const toggle = (t:string) => setSelected(s => s.includes(t) ? s.filter(x=>x!==t) : [...s,t]);
  const addCustom = () => { let v = custom.trim(); if (!v) return; if (!v.startsWith('#')) v = '#'+v; if (!selected.includes(v)) setSelected(s=>[...s,v]); setCustom(''); };
  const [error, setError] = useState<string | null>(null);

  return (
    <View style={{flex:1,padding:24}}>
      <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Выберите интересы</Text>
      <ScrollView style={{marginTop:12}}>
        <View style={{flexDirection:'row',flexWrap:'wrap',gap:8}}>
          {Array.from(new Set([...base,...selected])).map(t=> (
            <TouchableOpacity key={t} onPress={()=>toggle(t)} style={{padding:8,margin:6,backgroundColor:selected.includes(t)?'#1E88E5':'#222',borderRadius:12}}>
              <Text style={{color:'#fff'}}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TextInput value={custom} onChangeText={setCustom} placeholder="Добавить интерес" style={{backgroundColor:'#222',color:'#fff',padding:8,borderRadius:8,marginTop:8}} />
      <Button title="Добавить" onPress={addCustom} />
      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:12}}>
        {error ? <Text style={{color:'red',marginTop:8}}>{error}</Text> : null}
        <Button title="Назад" onPress={onBack} />
        <Button title="Далее" onPress={()=>{ if (selected.length===0) { setError('Выберите хотя бы один интерес'); return; } setError(null); draft.interests = selected; onNext(); }} />
      </View>
    </View>
  );
}
