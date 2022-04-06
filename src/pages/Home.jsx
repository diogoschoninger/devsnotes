import { useState, useEffect } from "react";

export function Home() {
  const [data, setData] = useState({});

  async function getNotes() {
    await fetch("http://localhost/devsnotes/api/getall.php")
    .then(resp => resp.json())
    .then(resp => {
      if (resp.error !== "") setData({error: resp.error})
      else setData(resp.result);
    })
    .catch(() => setData({error: "Não foi possível conectar à API. Tente novamente."}));
  }

  useEffect(() => {
    getNotes();
  }, []);

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
        {data.error ? <tr><td colSpan="3">{data.error}</td></tr> : null}
        {Object.values(data).map(note => (
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