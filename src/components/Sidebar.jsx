import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <div className="sidebar p-1 d-flex flex-column bg-light">
      <ul className="nav nav-pills flex-column">
        <li className="nav-item p-1 px-2 mb-1">
          <Link to="/" className="nav-link p-0 text-dark"><i className="bi-card-list me-2"></i>Listagem</Link>
        </li>
        <li className="nav-item p-1 px-2 mb-1">
          <Link to="/register" className="nav-link p-0 text-dark"><i className="bi-pen me-2"></i>Cadastro</Link>
        </li>
      </ul>
    </div>
  );
}