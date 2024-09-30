import NoteCard from "./NoteCard";

export default function NoteList({ notes }) {
  return (
    <div className="mt-5">
      {notes.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
          {notes.map((note) => (
            <NoteCard note={note} key={note._id} />
          ))}
        </div>
      ) : (
        <h2 className="text-3xl">No notes to display. Please add one!</h2>
      )}
    </div>
  );
}
