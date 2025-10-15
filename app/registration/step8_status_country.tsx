import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Alert, ActivityIndicator } from 'react-native';

const countries = ['Россия','Польша','Украина','Беларусь','Казахстан','Германия','Франция','Италия','Испания','США','Канада','Китай','Япония','Турция'];

export default function Step8StatusCountry({ draft, onNext, onBack }: any) {
  const [selected, setSelected] = useState(draft.country ?? null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ setSelected(draft.country ?? null); },[]);

  return (
    <View style={{flex:1,padding:24}}>
      <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Выберите страну проживания</Text>
      <ScrollView style={{marginTop:12}}>
        {countries.map(c=> (
          <Button key={c} title={c} onPress={()=>setSelected(c)} color={selected===c? '#1E88E5': undefined} />
        ))}
      </ScrollView>
      <View style={{height:12}} />
      <Button title="Определить по GPS" onPress={async ()=>{
        setLoading(true);
        try {
          const Location = await import('expo-location');
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Разрешение', 'Необходимо разрешение на определение местоположения');
            setLoading(false);
            return;
          }
          const pos = await Location.getCurrentPositionAsync({});
          const geos = await Location.reverseGeocodeAsync({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
          if (geos && geos.length) {
            const country = geos[0].country;
            if (country) {
              setSelected(country);
              draft.country = country;
            }
          }
        } catch (e) {
          Alert.alert('Ошибка', 'Не удалось определить страну');
        } finally { setLoading(false); }
      }} />
      {loading ? <ActivityIndicator style={{marginTop:8}} /> : null}
      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:12}}>
        <Button title="Назад" onPress={onBack} />
        <Button title="Завершить" onPress={()=>{ if (!selected) { Alert.alert('Ошибка','Выберите страну проживания'); return; } draft.country = selected; onNext(); }} />
      </View>
    </View>
  );
}
