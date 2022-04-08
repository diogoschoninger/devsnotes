import { useState, useEffect } from "react";
import "../styles/Global.css";

export function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  async function getNotes() {
    await fetch("http://localhost/devsnotes/api/getall.php", {method: "GET"})
    .then(resp => resp.json())
    .then(resp => {
      if (resp.error !== "") setData({error: resp.error})
      else setData(resp.result);
      setLoading(false);
    })
    .catch(() => {
      setData({error: "Não foi possível conectar à API. Tente novamente."});
      setLoading(false);
    });
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
            <a href="/register" className="nav-link p-0 text-dark"><i className="bi-pen me-2"></i>Cadastro</a>
          </li>
        </ul>
      </div>
      <div className="content pt-3">
        <div className="container">
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
              {data.error ? <tr><td colSpan="4" className="text-center">{data.error}</td></tr> : null}
              {!data.error ? Object.values(data).map(note => (
                <tr key={note.id}>
                  <th scope="row">{note.id}</th>
                  <td>{note.title}</td>
                  <td>{note.body}</td>
                  <td>
                    <a href={"/edit/" + note.id} className="btn btn-sm py-0 btn-warning">Editar</a>
                    <button className="btn btn-sm py-0 btn-danger ms-1">Excluir</button>
                  </td>
                </tr>
              )) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
