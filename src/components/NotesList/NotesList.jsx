import "./NotesList.css";

import { NoteItem } from "../NoteItem/NoteItem.jsx";

export const NotesList = ({notes, onCreate, onView, onDelete}) => {
    return(
        <>
        <h1 className="list__title">Заметки</h1>
        <div className="list">
            {notes.map(note =>
                <NoteItem 
                    key={note.id}
                    note={note}
                    onView={onView}
                    onDelete={() => onDelete(note)}
                />
            )}
            <button onClick={onCreate}>Новая заметка</button>
        </div>
        </>
    );
};