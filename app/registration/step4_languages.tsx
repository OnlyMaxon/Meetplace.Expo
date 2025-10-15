import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Button } from 'react-native';

const allLanguages = ['Русский','Польский','Английский','Украинский','Немецкий','Французский','Испанский','Итальянский','Китайский','Японский','Корейский','Чешский','Словацкий','Литовский','Латышский','Эстонский','Турецкий','Арабский','Португальский','Греческий'];

export default function Step4Languages({ draft, onNext, onBack }: any) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<string[]>(allLanguages);
  const [selected, setSelected] = useState<string[]>(draft.languages ?? []);

  useEffect(()=>{ setFiltered(allLanguages); },[]);

  useEffect(()=>{ setFiltered(allLanguages.filter(l=> l.toLowerCase().includes(query.toLowerCase()))); }, [query]);

  const toggle = (lang: string) => {
    setSelected(s => {
      const next = s.includes(lang) ? s.filter(x=>x!==lang) : [...s, lang];
      draft.languages = next;
      return next;
    });
  };

  const [error, setError] = useState<string | null>(null);

  const next = () => {
    if (!selected || selected.length === 0) { setError('Выберите хотя бы один язык'); return; }
    setError(null);
    onNext();
  };

  return (
    <View style={{flex:1,padding:24}}>
      <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Какие языки вы знаете?</Text>
      <TextInput placeholder="Поиск языка..." value={query} onChangeText={setQuery} style={{backgroundColor:'#222',color:'#fff',padding:8,borderRadius:8,marginTop:12}} />
      <FlatList data={filtered} keyExtractor={i=>i} renderItem={({item})=> (
        <TouchableOpacity onPress={()=>toggle(item)} style={{padding:12,backgroundColor: selected.includes(item) ? '#1E88E5':'#111',marginVertical:6,borderRadius:8}}>
          <Text style={{color:'#fff'}}>{item}</Text>
        </TouchableOpacity>
      )} />
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        {error ? <Text style={{color:'red',marginTop:8}}>{error}</Text> : null}
        <Button title="Назад" onPress={onBack} />
        <Button title="Далее" onPress={next} />
      </View>
    </View>
  );
}
