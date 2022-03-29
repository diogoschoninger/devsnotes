import { useState, useEffect } from "react";

export function Home() {
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState(null);

  async function getNotes() {
    await fetch("http://localhost/devsnotes/api/getall.php", {
      method: "GET"
    })
    .then(response => response.json())
    .then(response => {
      setNotes(response);
      console.log(notes);
    })
    .catch(() => {
      setError("Não foi possível conectar à API. Tente novamente");
    })
  };

  useEffect(() => {
    getNotes();
  }, [])

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
        {/* {error ? <tr><td>{error}</td></tr> : ""}

        {notes.map(note => (
          <tr key={note.id}>
            <td>{note.id}</td>
            <td>{note.title}</td>
            <td>{note.body}</td>
          </tr>
        ))} */}
      </tbody>
    </table>
  );
}