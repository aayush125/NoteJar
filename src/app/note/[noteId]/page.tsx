import { getNote } from "@/app/actions";
import type { Note } from "@/types/NotesForm";
import Viewer from "@/components/Viewer";
import PasswordProtected from "@/components/client/PasswordProtected";

export default async function Note({ params }: { params: { noteId: string } }) {
  const res = await getNote(params.noteId);

  console.log(res);

  if (res.password_required) {
    return <PasswordProtected noteId={params.noteId} />;
  }

  if (!res.success) {
    return <div>Note not found.</div>;
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
