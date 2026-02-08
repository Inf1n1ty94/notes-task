import React from "react";

import "./NoteItem.css";

export const NoteItem = ({ note, onView, onDelete }) => {
  
  return(
    <div className="note__item" onClick={() => onView(note)}>
      <div className="note__content">
        <h2 className="note__title">{note.title}</h2>
        <div
          className="note__text"
          dangerouslySetInnerHTML={{
            __html: note.body || "<p></p>",
          }}
        />

        <button
          className="delete__btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};