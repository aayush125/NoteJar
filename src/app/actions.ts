"use server";

import type { Note } from "@/types/NotesForm";
import { redirect } from "next/navigation";
import { hashPassword } from "@/lib/passwHashing";
import { Timestamp } from "firebase/firestore";

export async function deleteNote(noteId: string) {
  const res = await fetch(
    `${process.env.API_DOMAIN}/api/note?noteId=${noteId}`,
    {
      method: "DELETE",
    }
  );

  if (res.ok) {
    return { success: true };
  }

  const resData = await res.json();
  return { success: false, ...resData };
}

export async function verify(noteId: string, password: string) {
  const res = await fetch(`${process.env.API_DOMAIN}/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ noteId: noteId, password: password }),
    cache: "no-store",
  });

  if (res.ok) {
    const data = await res.json();
    if (data.success) {
      return { password_verified: true, note: data.note };
    }
  }

  return { password_verified: false, note: null };
}

export async function getNote(noteId: string) {
  const res = await fetch(
    `${process.env.API_DOMAIN}/api/note?noteId=${noteId}`,
    {
      cache: "no-store",
    }
  );
  let noteData = await res.json();

  noteData = { ...noteData, success: noteData.note ? true : false };

  return noteData;
}

function getExpirationTimestamp(daysToAdd: number): Timestamp {
  const now = Timestamp.now();
  const currentDate = now.toDate();
  currentDate.setDate(currentDate.getDate() + daysToAdd);
  return Timestamp.fromDate(currentDate);
}

export async function postNote(formData: FormData) {
  const rawFormData = Object.fromEntries(formData);

  const note: Note = {
    title: rawFormData.title.toString(),
    note: rawFormData.note.toString(),
    password: rawFormData.password
      ? await hashPassword(rawFormData.password.toString())
      : "",
    nickname: rawFormData.nickname.toString(),
    keep: rawFormData.keep ? true : false,
    allow_delete: rawFormData.allow_delete ? true : false,
    expirationTimestamp: rawFormData.keep
      ? getExpirationTimestamp(60)
      : getExpirationTimestamp(30),
  };

  const res = await fetch(`${process.env.API_DOMAIN}/api/note`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  if (res.ok) {
    const data = await res.json();
    redirect(`/note/${data.id}`);
  }
}
