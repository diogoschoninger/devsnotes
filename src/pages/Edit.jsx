import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Edit() {
  const idNote = useParams().id;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [result, setResult] = useState({});

  async function getNote() {
    await fetch("http://localhost/devsnotes/api/get.php?id=" + idNote, {method: "GET"})
    .then(resp => resp.json())
    .then(resp => {
      if (resp.error !== "") {
        setResult({error: resp.result});
        console.log(resp.error);
      } else {
        setTitle(resp.result.title);
        setBody(resp.result.body);
        console.log(result);
      }
    })
    .catch(() => {
      setResult({error: "Não foi possível conectar à API. Tente novamente"});
    });
  }
  
  function editNote() {

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
            <a href="/" className="nav-link p-0 text-dark"><i className="bi-pen me-2"></i>Cadastro</a>
          </li>
        </ul>
      </div>
      <div className="content">
        <div className="container">
          <form onSubmit={editNote()}>
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
        </div>
      </div>
    </div>
  );
}
