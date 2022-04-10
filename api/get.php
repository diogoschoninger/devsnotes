<?php
require "./config.php";

if ($method === "GET") {
  $id = filter_input(INPUT_GET, "id") ?? null;

  if ($id) {
    $sql = $pdo->prepare("SELECT * FROM notes WHERE id = :id");
    $sql->bindValue(":id", $id);
    $sql->execute();

    if ($sql->rowCount() > 0) {
      $data = $sql->fetch(PDO::FETCH_ASSOC);
      $array["result"] = [
        "id" => $data["id"],
        "title" => $data["title"],
        "body" => $data["body"]
      ];
    } else {
      $array["error"] = "ID inexistente";
    }
  } else {
    $array["error"] = "ID não enviado";
  }
} else {
  $array["error"] = "Método $method não permitido! (apenas GET)";
}

require "./return.php";
