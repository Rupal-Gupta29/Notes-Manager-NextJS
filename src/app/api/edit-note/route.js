import dbConnect from "@/db/dbConnect";
import Note from "@/models/notes";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const getCurrentNoteId = searchParams.get("id");
    const { title, description } = await req.json();
    const res = await Note.findByIdAndUpdate(
      { _id: getCurrentNoteId },
      { title, description },
      { new: true }
    );
    if (res) {
      return NextResponse.json({
        success: true,
        message: "Note updated successfully.",
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: "Error in updating note.",
    });
  }
}
