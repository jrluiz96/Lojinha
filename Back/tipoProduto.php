<?php
  include "conexao.php";
  class Tipo{
    public function getList($conexao){
      $sql = 'SELECT t.*, i.nome as nomeImposto FROM tipo t inner join imposto i on t."idTipoImposto" = i.id';
      $result = pg_query($conexao, $sql);
      $arr = pg_fetch_all($result);
      return json_encode($arr);
    }
    public function getTipoUtilizado($conexao, $id){
      $sql = 'SELECT p.id FROM tipo t inner join produto p on p."idProdutoTipo" = t.id WHERE t.id = '.$id;
      $result = pg_query($conexao, $sql);
      $arr = pg_fetch_all($result);
      return json_encode($arr);
    }

    public function save($conexao, $id, $nome, $idTipoImposto){
      $sql = "";
      if($id){
        $sql = " UPDATE Tipo SET id=".$id.", nome='".$nome."', \"idTipoImposto\" =".$idTipoImposto." WHERE id = ".$id;
      }else{
        $sql = " INSERT INTO Tipo(nome, \"idTipoImposto\") VALUES ('".$nome."',".$idTipoImposto.")";
      }
      $result = pg_query($conexao, $sql);
      echo true;
    }
    public function remover($conexao,$id){
      $sql = "DELETE FROM Tipo WHERE id = ".$id;
      $result = pg_query($conexao, $sql);
      return true;
    }
  }
  $tipo = new Tipo;
  $funcao = $_GET['funcao'];
  if($funcao == "getList"){
    echo $tipo->getList($conexao);
  }
  if($funcao == "remover"){
    $id = $_GET['id'];
    echo $tipo->remover($conexao, $id);
  }
  if($funcao == "save"){
    $id = $_GET['id'];
    $nome = $_GET['nome'];
    $idTipoImposto = $_GET['idTipoImposto'];
    echo $tipo->save($conexao, $id, $nome, $idTipoImposto);
  }
  if($funcao == "getTipoUtilizado"){
    $id = $_GET['id'];
    echo $tipo->getTipoUtilizado($conexao, $id);
  }

?>
