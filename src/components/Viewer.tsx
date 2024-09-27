import type { Note } from "@/types/NotesForm";
import DeleteButton from "./client/DeleteButton";
import CopyButton from "./client/CopyButton";

export default function Viewer({
  note,
  noteId,
}: {
  note: Note;
  noteId: string;
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row">
        <div className="mt-4 mx-8 border-double border-4 rounded border-neutral-300 flex flex-col p-4 gap-5 sm:w-3/4">
          <div className="break-words border-b-2 border-b-white pb-1">
            {note.title && (
              <h2 className="text-4xl font-extrabold flex flex-row justify-between dark:text-white">
                <span className="break-words">{note.title}</span>
                {note.allow_delete && <DeleteButton noteId={noteId} />}
              </h2>
            )}
            <div className="flex flex-row justify-between my-2">
              {note.nickname ? (
                <span className="text-gray-300">
                  By: <i>{note.nickname}</i>
                </span>
              ) : (
                <p></p>
              )}
              <CopyButton note={note.note} />
            </div>
          </div>
          <pre className="whitespace-pre-wrap break-words text-gray-500 dark:text-white">
            {note.note}
          </pre>
        </div>
      </div>
    </>
  );
}
