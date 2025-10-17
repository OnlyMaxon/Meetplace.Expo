// This file was a duplicate of lib/registrationTypes.ts
// Keep a default export so expo-router won't warn about missing default export for files under `app/`.
import React from 'react';

export type RegistrationDraft = {
  email?: string;
  password?: string;
  photoPath?: string | null;
  coverPath?: string | null;
  nationality?: string | null;
  languages?: string[];
  nickname?: string | null;
  status?: string | null;
  country?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

const _Noop: React.FC = () => null;
export default _Noop;
