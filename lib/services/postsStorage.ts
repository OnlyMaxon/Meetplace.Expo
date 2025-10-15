import AsyncStorage from '@react-native-async-storage/async-storage';

export type Post = {
  id: string;
  author: string;
  text: string;
  timestamp: string;
};

const POSTS_KEY = 'MP_POSTS';

export async function loadPosts(): Promise<Post[]> {
  const raw = await AsyncStorage.getItem(POSTS_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as Post[]; } catch { return []; }
}

export async function savePosts(posts: Post[]) {
  await AsyncStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export async function addPost(post: Post) {
  const list = await loadPosts();
  list.unshift(post);
  await savePosts(list);
}

export async function seedMockPosts() {
  const existing = await loadPosts();
  if (existing.length > 0) return existing;
  const now = new Date().toISOString();
  const seed: Post[] = [
    { id: 'p1', author: 'MeetPlace', text: 'Welcome to MeetPlace — your community app (mock post).', timestamp: now },
    { id: 'p2', author: 'Alice', text: 'Hello everyone! This is a sample post.', timestamp: now },
  ];
  await savePosts(seed);
  return seed;
}
