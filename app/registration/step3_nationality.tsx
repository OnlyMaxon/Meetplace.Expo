import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const nationalities = ['Русский','Украинский','Польский','Белорусский','Казахский','Азербайджанский','Армянский','Грузинский','Латышский','Литовский','Эстонский','Немецкий','Французский','Итальянский','Испанский','Английский','Американский','Канадский','Турецкий','Китайский','Японский','Корейский','Индийский','Другое'];

export default function Step3Nationality({ draft, onChanged, onNext, onBack }: any) {
  const [selected, setSelected] = useState<string | undefined>(draft.nationality ?? undefined);

  useEffect(()=>{ setSelected(draft.nationality); }, []);

    const [error, setError] = useState<string | null>(null);
    const next = () => {
      const chosen = selected ?? draft.nationality;
      if (!chosen) { setError('Выберите национальность'); return; }
      setError(null);
      draft.nationality = chosen;
      onChanged?.(chosen);
      onNext();
    };

  return (
    <View style={{flex:1,padding:24}}>
      <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Выберите национальность</Text>
      <View style={{height:16}} />
      {/* Picker deprecated on some platforms; this is a simple placeholder */}
      <View style={{backgroundColor:'#222',borderRadius:12,padding:8}}>
            {nationalities.map(n=> (
              <Button
                key={n}
                title={n}
                onPress={() => {
                  setSelected(n);
                  draft.nationality = n;
                  onChanged?.(n);
                }}
                color={selected === n ? '#1E88E5' : undefined}
              />
            ))}
      </View>
          {error ? <Text style={{color:'red',marginTop:8}}>{error}</Text> : null}
      <View style={{flex:1,justifyContent:'flex-end'}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Button title="Назад" onPress={onBack} />
          <Button title="Далее" onPress={next} />
        </View>
      </View>
    </View>
  );
}
