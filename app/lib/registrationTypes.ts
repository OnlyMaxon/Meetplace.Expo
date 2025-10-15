// Duplicate of root lib/registrationTypes.ts. Keep a default export so expo-router treats this as a valid route file.
import React from 'react';

export type RegistrationDraft = {
  email?: string;
  password?: string;
  photoPath?: string | null;
  coverPath?: string | null;
  nationality?: string | null;
  languages?: string[];
  interests?: string[];
  isStudent?: boolean;
  nickname?: string | null;
  status?: string | null;
  country?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

const _Noop: React.FC = () => null;
export default _Noop;
