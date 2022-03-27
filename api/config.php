<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");

$db_host = "localhost";
$db_name = "devsnotes";
$db_user = "root";
$db_pass = "";

$pdo = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);

$array = [
  "error" => "",
  "result" => []
];

$method = strtoupper($_SERVER["REQUEST_METHOD"]);
