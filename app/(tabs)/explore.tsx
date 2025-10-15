import React, { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { Platform, StyleSheet, View, FlatList, Pressable, TextInput } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  const [posts, setPosts] = useState<Array<any>>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
  const ps = await (await import('../../lib/services/postsStorage')).loadPosts();
      if (mounted) setPosts(ps);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function addMock() {
  const mod = await import('../../lib/services/postsStorage');
    const newPost = {
      id: String(Date.now()),
      author: 'You',
      text: 'This is a quick mock post.',
      timestamp: new Date().toISOString(),
    };
    await mod.addPost(newPost);
    const ps = await mod.loadPosts();
    setPosts(ps);
  }

  const [draftText, setDraftText] = useState('');

  async function createPost() {
    if (!draftText.trim()) return;
  const mod = await import('../../lib/services/postsStorage');
    const newPost = { id: String(Date.now()), author: 'You', text: draftText.trim(), timestamp: new Date().toISOString() };
    await mod.addPost(newPost);
    const ps = await mod.loadPosts();
    setPosts(ps);
    setDraftText('');
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Explore
        </ThemedText>
        <Pressable onPress={addMock} style={{ marginLeft: 12 }}>
          <ThemedText type="link">+ Add mock</ThemedText>
        </Pressable>
      </ThemedView>

  <View style={{ padding: 12, flexDirection: 'row', gap: 8 }}>
        <TextInput
          value={draftText}
          onChangeText={setDraftText}
          placeholder="What's happening?"
          style={{ flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8 }}
        />
        <Pressable onPress={createPost} style={{ padding: 8 }}>
          <ThemedText type="link">Post</ThemedText>
        </Pressable>
  </View>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
  <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Posts">
        <View style={{ height: 12 }} />
        <FlatList
          data={posts}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <View style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
              <ThemedText type="defaultSemiBold">{item.author}</ThemedText>
              <ThemedText>{item.text}</ThemedText>
              <ThemedText type="subtitle">{new Date(item.timestamp).toLocaleString()}</ThemedText>
            </View>
          )}
        />
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful{' '}
          <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }}>
            react-native-reanimated
          </ThemedText>{' '}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
