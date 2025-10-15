import AsyncStorage from '@react-native-async-storage/async-storage';

export type Message = {
  id?: string;
  sender: string;
  recipient: string;
  text: string;
  timestamp: string;
};

const MSG_KEY = 'MP_MESSAGES';

export async function loadMessages(): Promise<Message[]> {
  const raw = await AsyncStorage.getItem(MSG_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as Message[]; } catch { return []; }
}

export async function addMessage(msg: Message) {
  const list = await loadMessages();
  list.push(msg);
  await AsyncStorage.setItem(MSG_KEY, JSON.stringify(list));
}
