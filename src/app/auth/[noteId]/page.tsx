"use client";

import PasswordCard from "@/components/PasswordCard";
import { FormEvent } from "react";
import { verify } from "@/app/actions";
import { useState } from "react";
import type { NoteData } from "@/types/NotesForm";
import Viewer from "@/components/Viewer";

export default function AuthenticateNote({
  params,
}: {
  params: { noteId: string };
}) {
  async function verifyPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWrongTextVisible(false);

    const formData = new FormData(event.currentTarget);

    console.log(formData.get("password"));

    const password = formData.get("password");
    if (password !== null) {
      const res = await verify(params.noteId, password.toString());
      if (res.password_verified) {
        const receivedData: NoteData = {
          password_verified: res.password_verified,
          note: res.note,
        };
        setNoteData(receivedData);
        console.log("Successfully run password verification!");
      } else {
        setWrongTextVisible(true);
        (event.target as HTMLFormElement).reset();
        console.log("Passwords do not match.");
      }
    } else {
      console.error("Null password error.");
    }
  }

  const [wrongTextVisible, setWrongTextVisible] = useState<boolean>(false);
  const [noteData, setNoteData] = useState<NoteData>({
    password_verified: false,
    note: {
      title: "",
      note: "",
      password: "",
      nickname: "",
      keep: false,
      allow_delete: false,
    },
  });

  if (noteData.password_verified) {
    return <Viewer note={noteData.note} />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-10">
        <form id="password-form" onSubmit={verifyPassword}>
          <PasswordCard noteId={params.noteId} />
        </form>
        <p className="m-2 text-red-600" hidden={!wrongTextVisible}>
          Incorrect password. Please try again.
        </p>
      </div>
    </>
  );
}
