import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { loadCurrentUser } from '../lib/services/userStorage';
import { loadMessages, addMessage, Message } from '../lib/services/messageStorage';

export default function Chat() {
  const params = useLocalSearchParams<{ other?: string }>();
  const otherEmail = typeof params.other === 'string' ? params.other : '';
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [current, setCurrent] = useState<{ email: string } | null>(null);

  const loadThread = async (meEmail: string, other: string) => {
    const all = await loadMessages();
    const thread = all.filter(m =>
      (m.sender === meEmail && m.recipient === other) ||
      (m.sender === other && m.recipient === meEmail)
    );
    setMessages(thread);
  };

  useEffect(() => {
    (async () => {
      const me = await loadCurrentUser();
      if (me?.email && otherEmail) {
        setCurrent({ email: me.email });
        await loadThread(me.email, otherEmail);
      }
    })();
  }, [otherEmail]);

  const send = async () => {
    if (!current || !otherEmail || !text.trim()) return;
    const m: Message = { sender: current.email, recipient: otherEmail, text: text.trim(), timestamp: new Date().toISOString() };
    await addMessage(m);
    setMessages(prev => [...prev, m]);
    setText('');
  };

  return (
    <View style={{flex:1,padding:12}}>
      <FlatList
        data={messages}
        keyExtractor={(i,idx)=> i.id ?? String(idx)}
        renderItem={({item})=> (
          <View style={{paddingVertical:6, alignItems: item.sender===current?.email ? 'flex-end' : 'flex-start'}}>
            <Text style={{color:'#fff', backgroundColor: item.sender===current?.email ? '#2d6cdf' : '#333', padding:8, borderRadius:8}}>
              {item.text}
            </Text>
          </View>
        )}
      />
      <TextInput value={text} onChangeText={setText} placeholder="Напишите сообщение..." style={{borderWidth:1,borderColor:'#ccc',padding:8,borderRadius:6,marginTop:8}} />
      <Button title="Отправить" onPress={send} />
    </View>
  );
}
