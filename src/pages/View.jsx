import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import "../styles/Global.scss";

export function View() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
              <a href="/">
                <button className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </a>
            </div>
          : loading ? null :
            <div>
              <h1 className="mb-3">Visualizar anotação</h1>

              <div className="mb-3">
                <label className="form-label mb-1">Título da anotação</label>
                <div className="border rounded p-1 px-2" style={{backgroundColor: "rgb(233, 236, 239)", borderColor: "rgb(206, 212, 218)"}}>
                  {title}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label mb-1">Descrição da anotação</label>
                <div className="border rounded p-1 px-2" style={{backgroundColor: "rgb(233, 236, 239)", borderColor: "rgb(206, 212, 218)"}}>
                  {body}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
