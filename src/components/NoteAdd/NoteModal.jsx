import { useEffect, useState } from "react";

import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "./NoteModal.css";

import Quill from "quill";

const FontAttributor = Quill.import("formats/font");
FontAttributor.whitelist = ["sans-serif", "roboto", "mirza"];
Quill.register(FontAttributor, true);

const FontStyle = Quill.import("attributors/style/font");
FontStyle.whitelist = ["sans-serif", "roboto", "mirza"];
Quill.register(FontStyle, true);

const modules = {
  toolbar: [
    [{ font: ["sans-serif", "roboto", "mirza"] }],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["image", "clean"],
  ],
};

const formats = ["font", "header", "bold", "italic", "underline", "list", "bullet", "image"];

export const NoteModal = ({ isOpen, mode, note, onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editMode, setEditMode] = useState(mode !== "view");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
    } else {
      setTitle("");
      setBody("");
    }
    setEditMode(mode !== "view");
  }, [mode, note]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim() && !body.trim()) return;

    onSave({
      title: title.trim(),
      body,
    });
    setEditMode(false);
  };

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2 className="modal__title">
          {mode === "create" ? "Новая заметка" : editMode ? "Редактирование заметки" : "Просмотр заметки"}
        </h2>

        {editMode ? (
          <>
            <input
              className="modal__input"
              placeholder="Название заметки"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />  
            <ReactQuill
              theme="snow"
              value={body}
              onChange={setBody}
              modules={modules}
              formats={formats}
              placeholder="Напишите текст для вашей заметки..."
            />
          </>
        ) : (
          <>
            <h3 className="modal__name">{title}</h3>
            <div
            className="modal__text"
            dangerouslySetInnerHTML={{
              __html: body || "<p></p>",
            }}
          />
          </>
        )}

        <div className="modal__actions">
          {editMode ? (
            <button className="btn btn-primary" onClick={handleSave}>Сохранить</button>
          ) : (
            <button className="btn btn-primary" onClick={() => setEditMode(true)}>Редактировать</button>
          )}
          <button className="btn btn-secondary" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
};
