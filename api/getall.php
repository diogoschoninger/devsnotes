<?php
require "./config.php";

if ($method === "GET") {
  $sql = $pdo->query("SELECT * FROM notes");
  if ($sql->rowCount() > 0) {
    $data = $sql->fetchAll(PDO::FETCH_ASSOC);

    foreach ($data as $item) {
      $array["result"][] = [
        "id" => $item["id"],
        "title" => $item["title"],
        "body" => $item["body"]
      ];
    }
  }
} else {
  $array["error"] = "Método $method não permitido! (apenas GET)";
}

require "./return.php";
