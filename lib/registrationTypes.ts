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

export function validateRegistrationDraft(d: RegistrationDraft) {
  const missing: string[] = [];
  if (!d.email) missing.push('email');
  if (!d.password) missing.push('password');
  if (!d.firstName) missing.push('firstName');
  if (!d.lastName) missing.push('lastName');
  if (!d.nationality) missing.push('nationality');
  if (!d.languages || d.languages.length === 0) missing.push('languages');
  if (!d.interests || d.interests.length === 0) missing.push('interests');
  // nickname and photo are optional but you can enable if needed
  return { ok: missing.length === 0, missing };
}
