import { db } from "@/lib/firebase/config";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const noteToPost = await request.json();
  noteToPost.expirationTimestamp = new Timestamp(
    noteToPost.expirationTimestamp.seconds,
    noteToPost.expirationTimestamp.nanoseconds
  );
  try {
    const docref = await addDoc(collection(db, `notes`), noteToPost);

    if (docref.id) {
      return NextResponse.json({
        success: true,
        id: docref.id,
        note: noteToPost,
      });
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return NextResponse.json({
    success: false,
    message: "Something seems to have gone wrong.",
  });
}

export async function GET(request: NextRequest) {
  const noteId = request.nextUrl.searchParams.get("noteId");

  if (!noteId) {
    return NextResponse.json({
      success: false,
      message: "noteId not received.",
    });
  }

  const docRef = doc(db, "notes", noteId);

  let docSnap;
  try {
    docSnap = await getDoc(docRef);
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Database internal error.",
    });
  }

  if (docSnap?.exists()) {
    if (docSnap.data().password) {
      return NextResponse.json({ password_required: true });
    } else {
      return NextResponse.json({ password_required: false, ...docSnap.data() });
    }
  }

  return NextResponse.json({
    success: false,
    messsage: "Failed to fetch note.",
  });
}

export async function DELETE(request: NextRequest) {
  const noteId = request.nextUrl.searchParams.get("noteId");

  if (!noteId) {
    return NextResponse.json({
      success: false,
      message: "noteId not received.",
    });
  }

  try {
    const noteRef = doc(db, "notes", noteId);
    await deleteDoc(noteRef);
    return NextResponse.json({
      success: true,
      message: "Note deleted successfully.",
    });
  } catch (e) {
    console.error("Error deleting note: ", e);
    return NextResponse.json({
      success: false,
      message: "Failed to delete note.",
    });
  }
}
