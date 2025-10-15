import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { loadCurrentUser } from '../lib/services/userStorage';
import { seedMockPosts } from '../lib/services/postsStorage';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      // ensure there's some initial posts seeded (non-blocking)
      seedMockPosts().catch(() => {});
      const u = await loadCurrentUser();
      setLoading(false);
      if (u && u.email) {
        router.replace('/(tabs)' as any);
      } else {
        router.replace('/auth_choice' as any);
      }
    })();
  }, []);

  if (loading) return <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><ActivityIndicator /></View>;
  return null;
}
