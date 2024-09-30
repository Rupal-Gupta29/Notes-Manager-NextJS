"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import AddNote from "./AddNote";

export default function NoteCard({ note }) {
  const router = useRouter();

  const handleDelete = async (currentNoteId) => {
    try {
      const apiResponse = await fetch(`/api/delete-note?id=${currentNoteId}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();
      if (result.success) {
        router.refresh();
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>Created on: {note.createdDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{note.description}</p>
      </CardContent>
      <CardFooter className="gap-4">
        <AddNote modalType={"edit"} noteData={note} />
        <Button onClick={() => handleDelete(note._id)} className="bg-red-700">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
