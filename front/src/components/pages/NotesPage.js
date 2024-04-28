import { useEffect } from "react";
import notesStore from "../store/notesStore";
import Notes from "../Notes";
import UpdateForm from "../updateForm";
import CreateForm from "../createForm";

export default function NotesPage() {
    const store= notesStore();

  

    useEffect(() => {
      store.fetchNotes();
    }, [store]);
  return (
    <div><Notes/>

    <UpdateForm/>
    
    <CreateForm/></div>
  )
}
