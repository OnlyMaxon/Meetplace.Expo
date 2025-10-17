import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRecord = {
  id?: string;
  email: string;
  password: string;
  nickname?: string | null;
  isLoggedIn?: boolean;
  [key: string]: any;
};

const USERS_KEY = 'MP_USERS';
const CURRENT_KEY = 'MP_CURRENT';

export async function loadUsers(): Promise<UserRecord[]> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as UserRecord[];
  } catch (e) {
    return [];
  }
}

export async function saveUsers(users: UserRecord[]) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function saveCurrentUser(user: UserRecord) {
  await AsyncStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  const users = await loadUsers();
  const idx = users.findIndex(u => u.email === user.email);
  if (idx >= 0) users[idx] = user; else users.push(user);
  await saveUsers(users);
}

export async function loadCurrentUser(): Promise<UserRecord | null> {
  const raw = await AsyncStorage.getItem(CURRENT_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as UserRecord; } catch { return null; }
}

export async function deleteAll() {
  await AsyncStorage.removeItem(USERS_KEY);
  await AsyncStorage.removeItem(CURRENT_KEY);
}

export async function addUser(user: UserRecord) {
  const users = await loadUsers();
  const exists = users.some(u => u.email === user.email);
  if (!exists) {
    users.push(user);
    await saveUsers(users);
  }
}

import React from 'react';

const _Noop: React.FC = () => null;
export default _Noop;
