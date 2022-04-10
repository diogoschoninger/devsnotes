<?php
require "./config.php";

if ($method === "POST") {
  $id = $_POST["id"] ?? null;

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
  $array["error"] = "Método $method não permitido! (apenas POST)";
}

require "./return.php";
