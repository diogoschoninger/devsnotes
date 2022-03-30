import { useState, useEffect } from "react";

export function Home() {
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState(null);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        {error ? <tr><td>{error}</td></tr> : ""}

        {notes.map(note => (
          <tr key={note.id}>
            <td>{note.id}</td>
            <td>{note.title}</td>
            <td>{note.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}