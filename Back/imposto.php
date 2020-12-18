<?php
  include "conexao.php";
  class Imposto{
    public function getList($conexao){
      $sql = "Select * FROM IMPOSTO";
      $result = pg_query($conexao, $sql);
      $arr = pg_fetch_all($result);
      return json_encode($arr);
    }

    public function getImpostoUtilizado($conexao, $id){
      $sql = "Select t.id FROM IMPOSTO i inner join Tipo t on t.\"idTipoImposto\" = i.id where i.id=".$id;
      $result = pg_query($conexao, $sql);
      $arr = pg_fetch_all($result);
      return json_encode($arr);
    }

    public function save($conexao, $id, $nome, $valor){
      $sql = "";
      if($id){
        $sql = " UPDATE imposto SET id=".$id.", nome='".$nome."', valor='".$valor."' WHERE id = ".$id;
      }else{
        $sql = " INSERT INTO imposto(nome, valor) VALUES ('".$nome."','".$valor."')";
      }
      $result = pg_query($conexao, $sql);
      echo true;
    }
    public function remover($conexao,$id){
      $sql = "DELETE FROM imposto WHERE id = ".$id;
      $result = pg_query($conexao, $sql);
      return true;
    }
  }
  $imposto = new Imposto;
  $funcao = $_GET['funcao'];
  if($funcao == "getList"){
    echo $imposto->getList($conexao);
  }
  if($funcao == "remover"){
    $id = $_GET['id'];
    echo $imposto->remover($conexao, $id);
  }
  if($funcao == "save"){
    $id = $_GET['id'];
    $nome = $_GET['nome'];
    $valor = $_GET['valor'];
    echo $imposto->save($conexao, $id, $nome, $valor);
  }
  if($funcao == "getImpostoUtilizado"){
    $id = $_GET['id'];
    echo $imposto->getImpostoUtilizado($conexao, $id);
  }
  
?>
