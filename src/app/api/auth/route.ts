import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase/config";
import { getDoc, doc } from "firebase/firestore";

export async function POST(request: NextRequest) {
  const data = await request.json();
  let noteId: string = data.noteId;
  let password: string = data.password;

  const docRef = doc(db, "notes", noteId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    if (docSnap.data().password) {
      let verified: boolean = docSnap.data().password === password;
      if (verified) {
        return NextResponse.json({
          success: true,
          note: docSnap.data(),
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Authorization failed. Passwords do not match.",
        });
      }
    }
  }

  return NextResponse.json({
    success: false,
    message: "Something went wrong during authorization.",
  });
}
