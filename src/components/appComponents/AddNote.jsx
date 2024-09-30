"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddNote({ modalType, noteData }) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [openDialogue, setOpenDialogue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notesData, setNotesData] = useState(
    modalType == "edit"
      ? { title: noteData.title, description: noteData.description }
      : { title: "", description: "" }
  );

  const handleSaveNote = async () => {
    try {
      if (!notesData.title.trim() || !notesData.description.trim()) {
        setErrorMsg("Please fill all the fields.");
      } else {
        setLoading(true);
        if (modalType === "add") {
          var res = await fetch("/api/add-note", {
            method: "POST",
            body: JSON.stringify(notesData),
          });
        } else if (modalType === "edit") {
          var res = await fetch(`/api/edit-note?id=${noteData._id}`, {
            method: "PUT",
            body: JSON.stringify(notesData),
          });
        }
        const result = await res.json();
        if (result.success) {
          setOpenDialogue(false);
          setNotesData({ title: "", description: "" });
          setErrorMsg("");
          setLoading(false);
          router.refresh();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setOpenDialogue(true)}
        className={modalType == "add" ? "bg-slate-800" : "bg-amber-500"}
      >
        {modalType == "add" ? "Add a Note" : "Edit"}
      </Button>
      <Dialog open={openDialogue} onOpenChange={() => setOpenDialogue(false)}>
        <DialogContent className="sm:max-w-[425px] bg-zinc-50">
          <DialogHeader>
            <DialogTitle>
              {modalType == "add" ? "Add a Note" : "Edit Note"}
            </DialogTitle>
            <DialogDescription>
              {modalType == "add" ? "Add a" : "Edit your"} note here. Click save
              when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                value={notesData.title}
                onChange={(e) =>
                  setNotesData({ ...notesData, title: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descrition" className="text-right">
                Description
              </Label>
              <Textarea
                id="descprition"
                className="col-span-3"
                value={notesData.description}
                onChange={(e) =>
                  setNotesData({ ...notesData, description: e.target.value })
                }
              />
            </div>
            <div>
              <p className="text-red-700">{errorMsg && errorMsg}</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleSaveNote}
              className="bg-green-600"
            >
              {loading ? "Saving" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
