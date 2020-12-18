<?php
  $conexao = pg_connect("host=localhost port=5432 dbname=lojinha user=postgres password=123")or
  die ("Não foi possível conectar ao servidor PostGreSQL");
?>
