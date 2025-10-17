import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { loadUsers, loadCurrentUser, UserRecord, saveUsers } from '../lib/services/userStorage';

export default function ChatList(){
  const router = useRouter();
  const [others, setOthers] = useState<UserRecord[]>([]);
  const [current, setCurrent] = useState<UserRecord | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    setRefreshing(true);
    const me = await loadCurrentUser();
    setCurrent(me);
    let all = await loadUsers();
    // If there is only the current user, you can seed demo contacts for testing
    if (all.length <= 1) {
      const seed: UserRecord[] = [
        { email: 'alice@example.com', password: 'x', nickname: '@alice' },
        { email: 'bob@example.com', password: 'x', nickname: '@bob' },
      ];
      // Do not duplicate if already present
      const emails = new Set(all.map(u => u.email));
      const toAdd = seed.filter(u => !emails.has(u.email));
      if (toAdd.length) {
        all = [...all, ...toAdd];
        await saveUsers(all);
      }
    }
    setOthers(all.filter(u => u.email !== me?.email));
    setRefreshing(false);
  };

  useEffect(() => { refresh(); }, []);

  return (
    <View style={{flex:1,padding:12}}>
      {others.length === 0 ? (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text style={{color:'#999'}}>Пока нет других пользователей</Text>
        </View>
      ) : (
        <FlatList
          data={others}
          keyExtractor={(i)=>i.email}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
          renderItem={({item})=> (
            <TouchableOpacity
              onPress={()=>router.push({pathname:'/chat',params:{other:item.email}} as any)}
              style={{padding:12,borderBottomWidth:1,borderColor:'#222'}}>
              <Text style={{color:'#fff'}}>{item.nickname ?? item.email} — {item.email}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
