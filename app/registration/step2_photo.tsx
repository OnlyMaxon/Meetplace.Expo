import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, Alert } from 'react-native';

export default function Step2Photo({ draft, onSkip, onNext }: any) {
  const [uri, setUri] = useState<string | null>(draft.photoPath ?? null);

  useEffect(() => {
    if (draft.photoPath) setUri(draft.photoPath);
  }, []);

  const pick = async () => {
    const ImagePicker = await import('expo-image-picker');
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (perm.status !== 'granted') {
        Alert.alert('Разрешение', 'Требуется доступ к фото, чтобы выбрать изображение.');
        return;
      }
    } catch (e) {
      // ignore permission failures
    }

  // ImagePicker.MediaTypeOptions is deprecated; use ImagePicker.MediaType or an array of ImagePicker.MediaType
  const mediaType = (ImagePicker as any).MediaType ?? (ImagePicker as any).MediaTypeOptions;
  const res = await ImagePicker.launchImageLibraryAsync({ quality: 0.8, mediaTypes: mediaType?.Images ?? mediaType?.Image ?? mediaType });
    if (!res.canceled) {
      const p = res.assets?.[0]?.uri;
      setUri(p ?? null);
      draft.photoPath = p;
    }
  };

  return (
    <View style={{flex:1,padding:24}}>
      <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Добавьте фото профиля</Text>
      <View style={{height:24}} />
      {uri ? <Image source={{uri}} style={{width:120,height:120,borderRadius:60}} /> : <View style={{width:120,height:120,borderRadius:60,backgroundColor:'#222',alignItems:'center',justifyContent:'center'}}><Text style={{color:'#888'}}>No Photo</Text></View>}
      <View style={{height:16}} />
      <Button title="Выбрать фото" onPress={pick} />
      <View style={{flex:1,justifyContent:'flex-end'}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Button title="Пропустить" onPress={onSkip} />
          <Button title="Далее" onPress={onNext} />
        </View>
      </View>
    </View>
  );
}
