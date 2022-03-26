<?php
require "./config.php";

if ($method === "POST") {
  $title = filter_input(INPUT_POST, "title");
  $body = filter_input(INPUT_POST, "body");

  if ($title && $body) {
    $sql = $pdo->prepare("INSERT INTO notes (title, body) VALUES (:title, :body)");
    $sql->bindValue(":title", $title);
    $sql->bindValue(":body", $body);
    $sql->execute();

    $id = $pdo->lastInsertId();

    $array["result"] = [
      "id" => $id,
      "title" => $title,
      "body" => $body
    ];
  } else {
    $array["error"] = "Parâmetros não enviados. Necessário 'body' e 'title'";
  }
} else {
  $array["error"] = "Método $method não permitido! (apenas POST)";
}

require "./return.php";
