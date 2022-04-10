<?php
require "./config.php";

if ($method === "POST") {
  $id = filter_input(INPUT_POST, "id") ?? null;

  if ($id) {
    $sql = $pdo->prepare("SELECT * FROM notes WHERE id = :id");
    $sql->bindValue(":id", $id);
    $sql->execute();

    if ($sql->rowCount() > 0) {
      $sql = $pdo->prepare("DELETE FROM notes WHERE id = :id");
      $sql->bindValue(":id", $id);
      $sql->execute();

      if ($sql->rowCount() > 0) {
        $array["result"] = "Anotação excluída com sucesso!";
      } else {
        $array["error"] = "Erro ao excluir a anotação. Tente novamente.";
      }
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
