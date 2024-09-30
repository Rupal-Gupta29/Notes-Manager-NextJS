import dbConnect from "@/db/dbConnect";
import { NextResponse } from "next/server";
import Note from "@/models/notes";

export async function POST(req) {
  try {
    await dbConnect();
    const currentDate = new Date().toDateString();
    const { title, description } = await req.json();
    const addedNote = await Note.create({
      title: title,
      description: description,
      createdDate: currentDate,
    });
    if (addedNote) {
      return NextResponse.json({
        success: true,
        message: "Note added successfully",
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: "Error in saving the record.",
    });
  }
}
