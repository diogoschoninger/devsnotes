import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import "../styles/Global.css";

export function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState(false);

  async function getNotes() {
    await fetch("http://localhost/devsnotes/api/getall.php", {method: "GET"})
    .then(resp => resp.json())
    .then(resp => {
      if (resp.error !== "") setError(resp.error);
      else setResult(resp.result);
      setLoading(false);
    })
    .catch(() => {
      setError("Não foi possível conectar à API. Tente novamente.");
      setLoading(false);
    });
  }

  async function deleteNote(id) {
    setResult(false);
    setLoading(true);
    
    await fetch(`http://localhost/devsnotes/api/delete.php`, {
      method: "POST",
      body: new URLSearchParams({
        id: id
      })
    })
    .then(resp => resp.json())
    .then(resp => {
      setSuccess({text: resp.result});
      setResult(null);
    })
    .catch(() => {
      setError("Não foi possível conectar à API. Tente novamente.");
      setLoading(false); 
    });
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="window">
      <Sidebar/>
      <div className="content pt-3">
        <div className="container">
          {success ? 
            <div className="alert alert-success alert-dismissible fade show">
              {success.text}
              <Link to="/">
                <button className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </Link>
            </div>
          :
            <table className="table table-hover table-striped table-sm caption-top">
              <caption>Listagem de anotações</caption>
              <thead>
                <tr>
                  <th className="p-1 align-middle">ID</th>
                  <th className="col-3 p-1 align-middle">Título</th>
                  <th className="p-1 align-middle">Descrição</th>
                  <th className="col-2 p-1 align-middle">Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? <tr><td colSpan="4" className="text-center">Carregando...</td></tr> : null}

                {error ? <tr><td colSpan="4" className="text-center">{error}</td></tr> : null}

                {result ? Object.values(result).map(note => (
                  <tr key={note.id}>
                    <th scope="row">
                      <Link to={"/view/" + note.id} className="nav-link p-0 text-dark">
                        {note.id}
                      </Link>
                    </th>
                    <td>
                      <Link to={"/view/" + note.id} className="nav-link p-0 text-dark">
                        {note.title}
                      </Link>
                    </td>
                    <td>
                      <Link to={"/view/" + note.id} className="nav-link p-0 text-dark">
                        {note.body.length > 75 ? note.body.slice(0, 75) + "..." : note.body}
                      </Link>
                    </td>
                    <td>
                      <Link to={"/edit/" + note.id} className="btn btn-sm py-0 btn-warning">Editar</Link>
                      <button className="btn btn-sm py-0 btn-danger ms-1" onClick={() => deleteNote(note.id)}>Excluir</button>
                    </td>
                  </tr>
                )) : null }
              </tbody>
            </table>
          }
        </div>
      </div>
    </div>
  );
}
