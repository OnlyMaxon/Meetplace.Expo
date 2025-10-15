import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { loadCurrentUser } from '../lib/services/userStorage';
import { loadMessages, addMessage } from '../lib/services/messageStorage';

export default function Chat({ route }: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');
  const [current, setCurrent] = useState<any>(null);

  useEffect(() => {
    (async () => {
      setCurrent(await loadCurrentUser());
      const all = await loadMessages();
      setMessages(all);
    })();
  }, []);

  const send = async () => {
    if (!current) return;
    const m = { sender: current.email, recipient: 'someone@example.com', text, timestamp: new Date().toISOString() };
    await addMessage(m);
    setMessages(prev => [...prev, m]);
    setText('');
  };

  return (
    <View style={{flex:1,padding:12}}>
      <FlatList data={messages} keyExtractor={(i,idx)=>String(idx)} renderItem={({item})=> <Text>{item.sender}: {item.text}</Text>} />
      <TextInput value={text} onChangeText={setText} placeholder="Напишите сообщение..." style={{borderWidth:1,borderColor:'#ccc',padding:8,borderRadius:6,marginTop:8}} />
      <Button title="Отправить" onPress={send} />
    </View>
  );
}
