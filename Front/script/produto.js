var dirImposto = '/../back/imposto.php';
var dirProduto = '/../back/produto.php';
var dirTipoProduto = '/../back/tipoProduto.php';
listImposto = null;
listTipo = null;

function limparImposto(){
  document.getElementById("formImposto").reset();
}

function buscarImposto(){
    var data = {
          funcao: 'getList'
        }
        $.ajax({
            data:  data,
            type:  "GET",
            url:   dirImposto,
            success: function (res) {
              res = JSON.parse(res);
              listImposto = res;
              atualizaSelectImposto();
              if(res){
                html = '<div class="col-5 border">Nome</div><div class="col-4 border">Porcentagem</div><div class="col-3 border">Ação</div>';
                $(res).each(function( k, v ) {
                  html += '<div class="col-5 border pt-2">'+v.nome+'</div>';
                  html += '<div class="col-4 border pt-2">'+v.valor+'</div>';
                  html += '<div class="col-3 border p-1"><select class="form-control-sm" im_id="'+v.id+'" im_nome="'+v.nome+'" im_valor="'+v.valor+'" onchange="impostoFunc(this)">';
                  html +=   '<option selected >Selecione </option>';
                  html +=   '<option value="1">Editar</option>';
                  html +=   '<option value="2">Excluir</option>';
                  html += '</select></div>';
                });
                $('#listaImposto').empty().append(html);
              }
            }, error: function (err){
                console.log(err);
            }
        });
}

function atualizaSelectImposto(){
  html = '<option selected> Selecione </option>';
  $(listImposto).each(function( k, v ) {
    html += "<option value='"+v.id+"'>"+v.nome+"</option>";
  });
  $('#idTipoImposto').empty().append(html);
}

function impostoFunc(el){
  var id = $(el).attr('im_id');
  var nome = $(el).attr('im_nome');
  var valor = $(el).attr('im_valor');
  var opcaoSelecionada = $(el).val();
  if(opcaoSelecionada == 1){
    $('#idImposto').val(id);
    $('#nomeImposto').val(nome);
    $('#porcentagem').val(valor);
  }
  if(opcaoSelecionada == 2 ){
    var item = {
      funcao : 'getImpostoUtilizado',
      id : id
    }
    $.ajax({
        data:  item,
        type:  "GET",
        url:   dirImposto,
        success: function (item) {
          item = JSON.parse(item);
          console.log(item);
          if(!item){
            var data = {
                funcao: 'remover',
                id: id
              }
              $.ajax({
                  data:  data,
                  type:  "GET",
                  url:   dirImposto,
                  success: function (res) {
                    avisos("Imposto removido com sucesso!", 'text-success', "Cadastro do Imposto");
                    buscarImposto();
                  }, error: function (err){
                    avisos('Erro ao remover imposto!', 'text-danger','Cadastro do Imposto');s
                    console.log(err);
                  }
              });
          }else{
            avisos("Imposto não pode ser removido pois é utilizado em algum tipo de produto!", 'text-warning', "Cadastro do Imposto");
          }
        }
    });
  }
}

function salvarIposto(){
  erro = '';
  id = $('#idImposto').val();
  nome = $('#nomeImposto').val();
  porcentagem = $('#porcentagem').val();
  if(!nome || ! porcentagem < 0 || ! porcentagem > 101 ){
    avisos("Favor verificar os campos do Imposto!", 'text-Danger', "Cadastro do Imposto");
  }else{
    var data = {
        funcao: 'save',
        id : id,
        nome : nome,
        valor : porcentagem
      }
      $.ajax({
          data:  data,
          type:  "GET",
          url:   dirImposto,
          success: function (res) {
            if(res){
              avisos("Imposto salvo com sucesso!", 'text-success', "Cadastro do Imposto");
              buscarImposto();
              limparImposto();
            }
          }, error: function (err){
            avisos('Erro ao salvar o Imposto!', 'text-danger','Cadastro do Imposto');
            console.log(err);
          }
      });
  }
}


//-------------------------- Tipo De Produto ---------------------

function limparTipo(){
  document.getElementById("formTipo").reset();
}

function buscarTipoDeProduto(){
    var data = {
          funcao: 'getList'
        }
        $.ajax({
            data:  data,
            type:  "GET",
            url:   dirTipoProduto,
            success: function (res) {
              res = JSON.parse(res);
              listTipo = res;
              atualizaSelectTipo();
              if(res){
                html = '<div class="col-6 border">Nome</div><div class="col-3 border">Imposto</div><div class="col-3 border">Ação</div>';
                $(res).each(function( k, v ) {
                  html += '<div class="col-6 border pt-2">'+v.nome+'</div>';
                  html += '<div class="col-3 border pt-2">'+v.nomeimposto+'</div>';
                  html += '<div class="col-3 border p-1"><select class="form-control-sm" tp_id="'+v.id+'" tp_nome="'+v.nome+'" tp_imposto="'+v.idTipoImposto+'" onchange="tipoFunc(this)">';
                  html +=   '<option selected >Selecione </option>';
                  html +=   '<option value="1">Editar</option>';
                  html +=   '<option value="2">Excluir</option>';
                  html += '</select></div>';
                });
                $('#listaTipo').empty().append(html);
              }
            }, error: function (err){
                console.log(err);
            }
        });
}
function atualizaSelectTipo(){
  html = '<option selected> Selecione </option>';
  $(listTipo).each(function( k, v ) {
    html += "<option value='"+v.id+"'>"+v.nome+"</option>";
  });
  $('#produtoTipo').empty().append(html);
}


function tipoFunc(el){
  var id = $(el).attr('tp_id');
  var nome = $(el).attr('tp_nome');
  var idImposto = $(el).attr('tp_imposto');
  var opcaoSelecionada = $(el).val();

  if(opcaoSelecionada == 1){
    $('#idTipo').val(id);
    $('#nomeTipo').val(nome);
    $('#idTipoImposto').val(idImposto);
  }
  if(opcaoSelecionada == 2 ){
    var item = {
      funcao : 'getTipoUtilizado',
      id : id
    }
    $.ajax({
      data:  item,
      type:  "GET",
      url:   dirTipoProduto,
      success: function (r) {
        r = JSON.parse(r);
        console.log(r);
        if(!r){
          var data = {
              funcao: 'remover',
              id: id
            }
            $.ajax({
                data:  data,
                type:  "GET",
                url:   dirTipoProduto,
                success: function (res) {
                  avisos("Tipo de produto removido com sucesso!", 'text-success', "Cadastro do Tipo de produto");
                  buscarTipoDeProduto();
                }, error: function (err){
                  avisos('Erro ao remover Tipo de produto!', 'text-danger','Cadastro do Tipo de produto');
                  console.log(err);
                }
            });
          }else{
            avisos("Tipo de Produto não pode ser removido pois é utilizado em algum produto!", 'text-warning', "Cadastro do Tipo de produto");
          }
        }
    });
  }
}

function salvarTipo(){
  erro = '';
  id = $('#idTipo').val();
  nome = $('#nomeTipo').val();
  idTipoImposto = $('#idTipoImposto').val();
  if(!nome || !idTipoImposto){
    avisos("Favor verificar os campos de Cadastro!", 'text-Danger', "Cadastro do Tipo de produto");
  }else{
    var data = {
        funcao: 'save',
        id : id,
        nome : nome,
        idTipoImposto : idTipoImposto
      }
      $.ajax({
          data:  data,
          type:  "GET",
          url:   dirTipoProduto,
          success: function (res) {
            if(res){
              avisos("Tipo de produto salvo com sucesso!", 'text-success', "Cadastro do Tipo de produto");
              buscarTipoDeProduto();
              limparTipo();
            }
          }, error: function (err){
            avisos('Erro ao salvar o tipo do produto!', 'text-danger','Cadastro do Tipo de produto');
            console.log(err);
          }
      });
  }
}


//---------------- Produto -----------------------
function limparProduto(){
  document.getElementById("formProduto").reset();
}

function buscarProduto(){
    var data = {
          funcao: 'getList'
        }
        $.ajax({
            data:  data,
            type:  "GET",
            url:   dirProduto,
            success: function (res) {
              res = JSON.parse(res);
              if(res){
                html = '<div class="col-4 border">Nome</div><div class="col-3 border">Tipo</div><div class="col-2 border">Valor</div><div class="col-3 border">Ação</div>';
                $(res).each(function( k, v ) {
                  html += '<div class="col-4 border pt-2">'+v.nome+'</div>';
                  html += '<div class="col-3 border pt-2">'+v.nometipo+'</div>';
                  html += '<div class="col-2 border pt-2">'+v.valor+'</div>';
                  html += '<div class="col-3 border p-1"><select class="form-control-sm" pd_id="'+v.id+'" pd_nome="'+v.nome+'" pd_idTipo="'+v.idProdutoTipo+'" pd_valor="'+v.valor+'" onchange="produtoFunc(this)">';
                  html +=   '<option selected >Selecione </option>';
                  html +=   '<option value="1">Editar</option>';
                  html +=   '<option value="2">Excluir</option>';
                  html += '</select></div>';
                });
                $('#listaProdutos').empty().append(html);
              }
            }, error: function (err){
                console.log(err);
            }
        });
}
function produtoFunc(el){
  var id = $(el).attr('pd_id');
  var idTipo = $(el).attr('pd_idTipo');
  var nome = $(el).attr('pd_nome');
  var valor = $(el).attr('pd_valor');
  var opcaoSelecionada = $(el).val();
  if(opcaoSelecionada == 1){
    $('#idProduto').val(id);
    $('#nomeProduto').val(nome);
    $('#valorProduto').val(valor);
    $('#produtoTipo').val(idTipo);
  }
  if(opcaoSelecionada == 2){
    var data = {
        funcao: 'remover',
        id: id
      }
      $.ajax({
          data:  data,
          type:  "GET",
          url:   dirProduto,
          success: function (res) {
            avisos("Produto removido com sucesso!", 'text-success', "Cadastro de Produtos");
            buscarProduto();
          }, error: function (err){
            avisos('Erro ao remover produto!', 'text-danger','Cadastro de Produto');s
            console.log(err);
          }
      });
  }
}

function salvarProduto(){
  erro = '';
  id = $('#idProduto').val();
  nome = $('#nomeProduto').val();
  valor = $('#valorProduto').val();
  idProdutoTipo = $('#produtoTipo').val();
  if(!nome || !valor || !idProdutoTipo){
    avisos("Favor verificar os campos de Cadastro!", 'text-Danger', "Cadastro de Produtos");
  }else{
    var data = {
        funcao: 'save',
        id : id,
        nome : nome,
        valor : valor,
        idProdutoTipo : idProdutoTipo
      }
      $.ajax({
          data:  data,
          type:  "GET",
          url:   dirProduto,
          success: function (res) {
            if(res){
              avisos("Produto salvo com sucesso!", 'text-success', "Cadastro de Produtos");
              buscarProduto();
              limparProduto();
            }
          }, error: function (err){
            avisos('Erro ao salvar produto!', 'text-danger','Cadastro de Produto');s
            console.log(err);
          }
      });
  }
}


$(document).ready(function(){
  buscarProduto();
  buscarTipoDeProduto();
  buscarImposto();
});

//avisos("Cancelamento do contrato solicitado com sucesso!", 'text-success', "Meus Funcionários");
function avisos(msgm,status, avisoTitulo){
    $('#avisoTitulo').removeClass();
    $('#avisoTitulo').addClass("mr-auto "+ status);
    $('#avisoTitulo').empty().append( avisoTitulo );
    $('#avisoConteudo').empty().append( msgm );
    $('#avisos').show(800).delay(4000).hide(800);
}
