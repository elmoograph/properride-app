export type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  instagram: string | null;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateProfilePayload = {
  id: string;
  username: string;
  full_name: string;
  bio?: string | null;
  location?: string | null;
};
