import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

type Props = {
  draft: any;
  onNext: () => void;
  onBack?: () => void;
};

export default function Step1EmailPassword({ draft, onNext }: Props) {
  const [email, setEmail] = useState(draft.email ?? '');
  const [password, setPassword] = useState(draft.password ?? '');

  const [error, setError] = useState<string | null>(null);

  const next = () => {
    const e = [] as string[];
    if (!email.trim()) e.push('Email');
    if (!password) e.push('Пароль');
    if (e.length) { setError(`Заполните: ${e.join(', ')}`); return; }
    setError(null);
    // store values into the shared draft and advance
    draft.email = email.trim();
    draft.password = password;
    onNext();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Регистрация — шаг 1</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ backgroundColor: '#222', color: '#fff', padding: 8, borderRadius: 6 }}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <View style={{ height: 12 }} />
      <TextInput
        placeholder="Пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ backgroundColor: '#222', color: '#fff', padding: 8, borderRadius: 6 }}
      />
      <View style={{ height: 12 }} />
      {error ? <Text style={{color:'red',marginTop:8}}>{error}</Text> : null}
      <Button title="Далее" onPress={next} />
    </View>
  );
}
