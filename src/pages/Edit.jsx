import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/Global.css";

export function Edit() {
  const id = useParams().id;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({});

  async function getNote() {
    await fetch("http://localhost/devsnotes/api/get.php?id=" + id, {method: "GET"})
    .then(resp => resp.json())
    .then(resp => {
      if (resp.error !== "") setData({error: resp.error});
      else {
        setTitle(resp.result.title);
        setBody(resp.result.body);
      }
      setLoading(false);
    })
    .catch(() => {
      setData({error: "Não foi possível conectar à API. Tente novamente."});
      setLoading(false);
    });
  }
  
  async function editNote(e) {
    e.preventDefault();
    setLoading(true);
    await fetch(`http://localhost/devsnotes/api/update.php`, {
      method: "PUT",
      body: JSON.stringify({id, title, body})
    })
    .then(resp => resp.json())
    .then(resp => {
      setSuccess(true);
      setLoading(false);
    })
    .catch(() => {
      setData({error: "Não foi possível conectar à API. Tente novamente."});
      setLoading(false);  
    })
  }

  useEffect(() => {
    getNote();
  }, []);

  return (
    <div className="window">
      <div className="sidebar p-1 d-flex flex-column">
        <ul className="nav nav-pills flex-column">
          <li className="nav-item p-1 px-2 mb-1">
            <a href="/" className="nav-link p-0 text-dark"><i className="bi-card-list me-2"></i>Listagem</a>
          </li>
          <li className="nav-item p-1 px-2 mb-1">
            <a href="/register" className="nav-link p-0 text-dark"><i className="bi-pen me-2"></i>Cadastro</a>
          </li>
        </ul>
      </div>
      <div className="content pt-3">
        <div className="container">
          {loading ? <div className="alert mb-3 alert-secondary">Carregando...</div> : null}

          {success ? 
            <div className="alert mb-3 alert-success alert-dismissible fade show">
              Anotação editada com sucesso!
              <button className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setSuccess(false)}></button>
            </div> : null}
          
          {data.error || loading ?
            <div className="alert mb-3 alert-secondary alert-dismissible fade show">
              {data.error}
              <Link to="/"><button className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></Link>
            </div> : 
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
              <div className="d-grid">
                <button type="submit" className="btn btn-sm btn-primary">Editar</button>
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  );
}
