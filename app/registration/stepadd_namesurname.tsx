import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { RegistrationDraft } from '../../lib/registrationTypes';

export default function StepAddNameSurname({ draft, onNext }: { draft: any; onNext: () => void }) {
  const [firstName, setFirstName] = useState(draft.firstName ?? '');
  const [lastName, setLastName] = useState(draft.lastName ?? '');

  const next = () => {
    const e = [] as string[];
    if (!firstName.trim()) e.push('Имя');
    if (!lastName.trim()) e.push('Фамилия');
    if (e.length) { setError(`Заполните: ${e.join(', ')}`); return; }
    setError(null);
    draft.firstName = firstName.trim();
    draft.lastName = lastName.trim();
    onNext();
  };

  const [error, setError] = useState<string | null>(null);

  return (
    <View style={{flex:1,padding:24,justifyContent:'center'}}>
      <Text style={{fontSize:20,marginBottom:12}}>Ваше имя</Text>
      <TextInput placeholder="Имя" value={firstName} onChangeText={setFirstName} style={{backgroundColor:'#222',color:'#fff',padding:8,borderRadius:6}} />
      <View style={{height:12}} />
      <TextInput placeholder="Фамилия" value={lastName} onChangeText={setLastName} style={{backgroundColor:'#222',color:'#fff',padding:8,borderRadius:6}} />
      <View style={{height:12}} />
  {error ? <Text style={{color:'red',marginTop:8}}>{error}</Text> : null}
  <Button title="Далее" onPress={next} />
    </View>
  );
}
