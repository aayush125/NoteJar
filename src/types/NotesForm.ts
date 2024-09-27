export interface Note {
  title: string;
  note: string;
  password: string;
  nickname: string;
  keep: boolean;
  allow_delete: boolean;
}

export interface NoteData {
  password_verified: boolean;
  note: Note;
}
