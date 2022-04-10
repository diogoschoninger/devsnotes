import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import "../styles/Global.scss";

export function Edit() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState(false);

  const id = useParams().id;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function getNote() {
    await fetch("http://localhost/devsnotes/api/get.php?id=" + id, {
      method: "GET"
    })
    .then(resp => resp.json())
    .then(resp => {
      if (resp.error !== "") setError(resp.error);
      else {
        setTitle(resp.result.title);
        setBody(resp.result.body);
      }
      setLoading(false);
    })
    .catch(() => {
      setError("Não foi possível conectar à API. Tente novamente.");
      setLoading(false);
    });
  }
  
  async function editNote(e) {
    e.preventDefault();

    setSuccess(false);
    setLoading(true);

    await fetch(`http://localhost/devsnotes/api/update.php`, {
      method: "POST",
      body: new URLSearchParams({
        id: id,
        title: title,
        body: body
      })
    })
    .then(resp => resp.json())
    .then(resp => {
      if (resp.error !== "") setError(resp.error);
      else {
        setResult(resp.result);
        setSuccess(true);
      }
      setLoading(false);
    })
    .catch(() => {
      setError("Não foi possível conectar à API. Tente novamente.");
      setLoading(false);
    })
  }

  useEffect(() => {
    getNote();
  }, []);

  return (
    <div className="window">
      <Sidebar/>
      <div className="content pt-3">
        <div className="container">
          {loading ?
            <div className="alert mb-3 alert-secondary">Carregando...</div> : null }

          {error ?
            <div className="alert mb-3 alert-danger alert-dismissible fade show">
              {error}
              <a href={"/edit/" + id}>
                <button className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </a>
            </div> : null }
          
          
          {success ? 
            <div className="alert mb-3 alert-success alert-dismissible fade show">
              {result}
              <a href={"/edit/" + id}>
                <button className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </a>
            </div>
          : loading || error ? null :
            <form onSubmit={editNote}>
              <h1 className="mb-3">Editar anotação</h1>

              <div className="mb-3">
                <label className="form-label mb-1">Título da anotação</label>
                <input className="form-control" value={title} onChange={e => setTitle(e.target.value)}></input>
              </div>

              <div className="mb-3">
                <label className="form-label mb-1">Descrição da anotação</label>
                <textarea className="form-control" value={body} onChange={e => setBody(e.target.value)}></textarea>
              </div>

              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-sm btn-primary">Editar</button>
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  );
}
