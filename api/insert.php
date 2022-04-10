<?php
require "./config.php";

if ($method === "POST") {
  $title = filter_input(INPUT_POST, "title") ?? null;
  $body = filter_input(INPUT_POST, "body") ?? null;

  if ($title && $body) {
    $sql = $pdo->prepare("INSERT INTO notes (title, body) VALUES (:title, :body)");
    $sql->bindValue(":title", $title);
    $sql->bindValue(":body", $body);
    $sql->execute();

    if ($sql->rowCount() !== 1) $array["error"] = "Erro ao cadastrar a anotação. Tente novamente.";
    else $array["result"] = "Anotação cadastrada com sucesso!";
  } else {
    $array["error"] = "Parâmetros não enviados. Necessário 'title' e 'body'";
  }
} else {
  $array["error"] = "Método $method não permitido! (apenas POST)";
}

require "./return.php";
