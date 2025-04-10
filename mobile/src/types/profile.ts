export interface CreateProfileData {
  username: string;
  description: string;
  instrument_played: string;
  musical_influence: string;
}

export interface ProfileResponse {
  id: number;
  username: string;
  description: string;
  instrument_played: string;
  musical_influence: string;
  user_id: number;
}
