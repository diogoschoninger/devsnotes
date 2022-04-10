import { useState } from "react";
import { Link } from "react-router-dom";

export function Register() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({});

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
      if (resp.error !== "") {
        setData({error: resp.error});
        setLoading(false);
      } else {
        setSuccess(true);
        setLoading(false);
      }
    })
    .catch(() => {
      setData({error: "Não foi possível conectar à API. Tente novamente."});
      setLoading(false);  
    })
  }

  function cleanInputs() {
    setTitle("");
    setBody("");
    setSuccess(false);
  }

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
          {loading ? <div className="alert my-3 alert-secondary">Carregando...</div> : null}

          {success ? 
            <div className="alert my-3 alert-success alert-dismissible fade show">
              Anotação cadastrada com sucesso!
              <button className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={cleanInputs}></button>
            </div>
          : null}

          {data.error ?
            <div className="alert my-3 alert-secondary alert-dismissible fade show">
              {data.error}
              {/* ARRUMAR O BOTÃO DE ERRO PARA DAR REFRESH */}
              <Link to="/">
                <button className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </Link>
            </div> :
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
              <div className="d-grid">
                <button type="submit" className="btn btn-sm btn-success">Cadastrar</button>
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  );
}
