<?php
require "./config.php";

if ($method === "POST") {
  $id = filter_input(INPUT_POST, "id") ?? null;
  $title = filter_input(INPUT_POST, "title") ?? null;
  $body = filter_input(INPUT_POST, "body") ?? null;

  if ($id && $title && $body) {
    $sql = $pdo->prepare("SELECT * FROM notes WHERE id = :id");
    $sql->bindValue(":id", $id);
    $sql->execute();

    if ($sql->rowCount() > 0) {
      $sql = $pdo->prepare("UPDATE notes SET title = :title, body = :body WHERE id = :id");

      $sql->bindValue(":id", $id);
      $sql->bindValue(":title", $title);
      $sql->bindValue(":body", $body);

      $sql->execute();

      if ($sql->rowCount() === 1) $array["result"] = "Anotação editada com sucesso!";
      else if ($sql->rowCount() === 0) $array["result"] = "Não houveram alterações.";
      else $array["error"] = "Erro ao editar anotação. Tente novamente.";
    } else {
      $array["error"] = "ID inexistente";
    }
  } else {
    $array["error"] = "Dados não enviados";
  }
} else {
  $array["error"] = "Método $method não permitido! (apenas PUT)";
}

require "./return.php";
