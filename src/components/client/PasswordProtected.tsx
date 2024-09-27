"use client";

import PasswordCard from "@/components/PasswordCard";
import { FormEvent } from "react";
import { verify } from "@/app/actions";
import { useState } from "react";
import type { NoteData } from "@/types/NotesForm";
import Viewer from "@/components/Viewer";

export default function PasswordProtected({ noteId }: { noteId: string }) {
  async function verifyPassword(event: FormEvent<HTMLFormElement>) {
    setButtonText("Submitting...");
    event.preventDefault();
    setWrongTextVisible(false);

    const formData = new FormData(event.currentTarget);

    const password = formData.get("password");
    if (password !== null) {
      const res = await verify(noteId, password.toString());
      if (res.password_verified) {
        const receivedData: NoteData = {
          password_verified: res.password_verified,
          note: res.note,
        };
        setNoteData(receivedData);
      } else {
        setWrongTextVisible(true);
        (event.target as HTMLFormElement).reset();
      }
    } else {
      console.error("Null password error.");
    }
    setButtonText("Submit");
  }

  const [wrongTextVisible, setWrongTextVisible] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Submit");
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
    return <Viewer note={noteData.note} noteId={noteId} />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-10">
        <form id="password-form" onSubmit={verifyPassword}>
          <PasswordCard noteId={noteId} buttonText={buttonText} />
        </form>
        <p className="m-2 text-red-600" hidden={!wrongTextVisible}>
          Incorrect password. Please try again.
        </p>
      </div>
    </>
  );
}
