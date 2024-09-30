import dbConnect from "@/db/dbConnect";
import Note from "@/models/notes";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    let allNotes = await Note.find({});
    if (allNotes) {
      return NextResponse.json({
        success: true,
        data: allNotes,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log("error");
    return NextResponse.json({
      success: false,
      message: "Error in fetching the notes",
    });
  }
}
