import AddNote from "@/components/appComponents/AddNote";
import NoteList from "@/components/appComponents/NoteList";

async function fetchAllNotes() {
  let apiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/get-notes`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  let noteList = await apiResponse.json();
  return noteList?.data;
}

export default async function Home() {
  const notes = await fetchAllNotes();

  return (
    <main className="p-4">
      <div className="text-center">
        <AddNote modalType={"add"} noteData={{}} />
      </div>
      <div>
        <NoteList notes={notes} />
      </div>
    </main>
  );
}
