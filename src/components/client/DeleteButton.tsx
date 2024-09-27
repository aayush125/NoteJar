"use client";

import Image from "next/image";
import { deleteNote } from "@/app/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ noteId }: { noteId: string }) {
  const [deleting, setDeleting] = useState(false);
  const [deletePressed, setDeletePressed] = useState(false);
  const router = useRouter();

  async function handleNoteDelete(noteId: string) {
    const res = await deleteNote(noteId);
    console.log(res);
    if (res?.success) {
      setDeleting(false);
      router.push("/");
    }
  }

  return (
    <>
      <span>
        {deletePressed ? (
          <button
            className="btn"
            onClick={async () => {
              await handleNoteDelete(noteId);
              setDeleting(true);
            }}
          >
            {!deleting && (
              <Image
                src="/delete.svg"
                alt="Delete button"
                width={20}
                height={20}
              />
            )}
            {deleting && <span className="loading loading-spinner"></span>}
            {deleting ? "Deleting..." : "Sure?"}
          </button>
        ) : (
          <button
            className="btn"
            onClick={() => {
              setDeletePressed(true);
            }}
          >
            <Image
              src="/delete.svg"
              alt="Delete button"
              width={20}
              height={20}
            />
            Delete
          </button>
        )}
      </span>
    </>
  );
}
