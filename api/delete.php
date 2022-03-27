<?php
require "./config.php";

if ($method === "DELETE") {
  parse_str(file_get_contents("php://input"), $input);

  $id = $input["id"] ?? null;

  $id = filter_var($id);

  if ($id) {
    $sql = $pdo->prepare("SELECT * FROM notes WHERE id = :id");
    $sql->bindValue(":id", $id);
    $sql->execute();

    if ($sql->rowCount() > 0) {
      $sql = $pdo->prepare("DELETE FROM notes WHERE id = :id");
      $sql->bindValue(":id", $id);
      $sql->execute();

      $array["result"] = "Nota excluída com sucesso!";
    } else {
      $array["error"] = "ID inexistente";
    }
  } else {
    $array["error"] = "ID não enviado";
  }
} else {
  $array["error"] = "Método $method não permitido! (apenas DELETE)";
}

require "./return.php";
