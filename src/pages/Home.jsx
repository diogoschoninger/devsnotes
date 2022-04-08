import { useState, useEffect } from "react";
import "../styles/Home.css";

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
          <table className="table table-hover table-striped table-sm caption-top">
            <caption>Listagem de anotações</caption>
            <thead>
              <tr>
                <th scope="col" className="p-1 align-middle">ID</th>
                <th scope="col" className="p-1 align-middle">Título</th>
                <th scope="col" className="p-1 align-middle">Descrição</th>
                <th scope="col" className="p-1 align-middle">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.error ? <tr><td colSpan="3">{data.error}</td></tr> : null}
              {Object.values(data).map(note => (
                <tr key={note.id}>
                  <th scope="row">{note.id}</th>
                  <td>{note.title}</td>
                  <td>{note.body}</td>
                  <td>
                    <button className="btn btn-sm py-0 btn-warning">Editar</button>
                    <button className="btn btn-sm py-0 btn-danger">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
