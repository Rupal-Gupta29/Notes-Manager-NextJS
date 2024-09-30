import dbConnect from "@/db/dbConnect";
import Note from "@/models/notes";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const getCurrentNoteId = searchParams.get("id");
    const res = await Note.findByIdAndDelete(getCurrentNoteId);
    if (res) {
      return NextResponse.json({
        success: true,
        message: "Note deleted successfully.",
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: "Error in deleting the node.",
    });
  }
}
