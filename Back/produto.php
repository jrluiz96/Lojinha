<?php
  include "conexao.php";
  class Produto{
    public function getList($conexao){
      $sql = 'Select p.*, t.nome as nomeTipo FROM Produto p inner join tipo t on p."idProdutoTipo" = t.id';
      $result = pg_query($conexao, $sql);
      $arr = pg_fetch_all($result);
      return json_encode($arr);
    }

    public function save($conexao, $id, $nome, $valor, $idProdutoTipo){
      $sql = "";
      if($id){
        $sql = ' UPDATE Produto SET id='.$id.', nome=\''.$nome.'\', valor=\''.$valor.'\', "idProdutoTipo" ='.$idProdutoTipo.' WHERE id = '.$id;
      }else{
        $sql = ' INSERT INTO Produto(nome, valor, "idProdutoTipo") VALUES (\''.$nome.'\',\''.$valor.'\','.$idProdutoTipo.')';
      }
      $result = pg_query($conexao, $sql);
      echo true;
    }

    public function remover($conexao,$id){
      $sql = "DELETE FROM Produto WHERE id = ".$id;
      $result = pg_query($conexao, $sql);
      return true;
    }

    public function getListLojinha($conexao){
      $sql = 'Select p.*, t.nome as nomeTipo, i.nome as nomeImposto, i.valor as valorImposto
              FROM Produto p inner join tipo t on p."idProdutoTipo" = t.id
              inner join imposto i on t."idTipoImposto" = i.id';
      $result = pg_query($conexao, $sql);
      $arr = pg_fetch_all($result);
      return json_encode($arr);
    }

  }

  $produto = new Produto;
  $funcao = $_GET['funcao'];
  if($funcao == "getList"){
    echo $produto->getList($conexao);
  }
  if($funcao == "remover"){
    $id = $_GET['id'];
    echo $produto->remover($conexao, $id);
  }
  if($funcao == "save"){
    $id = $_GET['id'];
    $nome = $_GET['nome'];
    $valor = $_GET['valor'];
    $idProdutoTipo = $_GET['idProdutoTipo'];
    echo $produto->save($conexao, $id, $nome, $valor, $idProdutoTipo);
  }
  if($funcao == "getListLojinha"){
    echo $produto->getListLojinha($conexao);
  }

?>
