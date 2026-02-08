import { useState, useEffect } from "react";

import { NotesList } from "./components/NotesList/NotesList.jsx";
import { NoteModal } from "./components/NoteAdd/NoteModal.jsx";

import { loadNotes, saveNotes } from "./utils/storage.js";

import "./assets/styles/index.css";

export const App = () => {

  const savedNotes = loadNotes();

  const [notes, setNotes] = useState( savedNotes ?? [] );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); 
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    const hasInitialized = localStorage.getItem("hasInitializedNotes");

    if (!hasInitialized && notes.length === 0) {
      setNotes([
        {
          id: Date.now(),
          title: "Первая заметка",
          body: "Описание первой заметки",
        },
      ]);

      localStorage.setItem("hasInitializedNotes", "true");
    }
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const openCreateModal = () => {
    setModalMode("create");
    setEditingNote({ title: "", body: "" });
    setIsModalOpen(true);
  };

  const openViewModal = (note) => {
  setModalMode("view"); 
  setEditingNote(note);
  setIsModalOpen(true);
};

  const handleSaveNote = ({ title, body }) => {
    if (modalMode === "create") {
      const newNote = {
        id: Date.now(),
        title,
        body,
      };
      setNotes([newNote, ...notes]);
    }

    {modalMode === 'view' && editingNote && (
        setNotes(notes.map(n => n.id === editingNote.id ? { ...n, title, body } : n))
      );
    }

    setIsModalOpen(false);
    setEditingNote(null);
  };

  const removeNote = (note) => {
    setNotes(notes.filter(n => n.id !== note.id))
  }

  return (
    <div>
      <NotesList
        notes={notes}
        onCreate={openCreateModal}
        onDelete={removeNote}
        onView={openViewModal}
      />

      <NoteModal
        isOpen={isModalOpen}
        mode={modalMode}
        note={editingNote}
        onSave={handleSaveNote}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null); 
        }}
      />
    </div>
  );
};
