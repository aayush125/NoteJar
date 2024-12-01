import { Timestamp } from "firebase/firestore";

export interface Note {
  title: string;
  note: string;
  password: string;
  nickname: string;
  keep: boolean;
  allow_delete: boolean;
  expirationTimestamp?: Timestamp;
}

export interface NoteData {
  password_verified: boolean;
  note: Note;
}
