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

import React from 'react';
const _Noop: React.FC = () => null;
export default _Noop;
