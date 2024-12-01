import { getNote } from "@/app/actions";
import type { Note } from "@/types/NotesForm";
import Viewer from "@/components/Viewer";
import PasswordProtected from "@/components/client/PasswordProtected";

export default async function Note({ params }: { params: { noteId: string } }) {
  const res = await getNote(params.noteId);

  if (res.password_required) {
    return <PasswordProtected noteId={params.noteId} />;
  }

  if (!res.success) {
    return (
      <div className="w-screen h-screen flex justify-center fixed my-4 text-3xl">
        Note not found.
      </div>
    );
  }

  const note: Note = {
    title: res.title,
    note: res.note,
    password: res.password,
    nickname: res.nickname,
    keep: res.keep,
    allow_delete: res.allow_delete,
  };

  return <Viewer note={note} noteId={params.noteId} />;
}
