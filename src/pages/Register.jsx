import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import "../styles/Global.css";

export function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState(false)

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  

  async function registerNote(e) {
    e.preventDefault();

    setLoading(true);

    await fetch(`http://localhost/devsnotes/api/insert.php`, {
      method: "POST",
      body: new URLSearchParams({
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

  return (
    <div className="window">
      <Sidebar/>
      <div className="content pt-3">
        <div className="container">
          {loading ?
            <div className="alert mb-3 alert-secondary">Carregando...</div> : null}
          
          {error ?
            <div className="alert mb-3 alert-danger alert-dismissible fade show">
              {error}
              <a href="/register">
                <button className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </a>
            </div> : null}
          
          {success ? 
            <div className="alert mb-3 alert-success alert-dismissible fade show">
              {result}
              <a href="/register">
                <button className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </a>
            </div>
          : loading || error ? null :
            <form onSubmit={registerNote}>
              <h1 className="mb-3">Cadastrar nova anotação</h1>

              <div className="mb-3">
                <label className="form-label mb-1">Título da anotação</label>
                <input className="form-control" value={title} onChange={e => setTitle(e.target.value)}></input>
              </div>

              <div className="mb-3">
                <label className="form-label mb-1">Descrição da anotação</label>
                <textarea className="form-control" value={body} onChange={e => setBody(e.target.value)}></textarea>
              </div>

              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-sm btn-success">Cadastrar</button>
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  );
}
