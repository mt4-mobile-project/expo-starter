export interface ProfileResponse {
  id: number;
  username: string;
  description: string;
  instrument_played: string;
  musical_influence: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProfileData {
  username: string;
  description: string;
  instrument_played: string;
  musical_influence: string;
}
