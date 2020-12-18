var dirTipoProduto = 'back/produto.php';
var produtoLista = '';

function valorTotalProduto(valor,imposto){
  valortotal = 0;
  imposto = imposto / 100;
  valorImposto = valor * imposto;
  valorTotal = valor + valorImposto;
  return valorTotal.toFixed(2);
}

function buscarProduto(){
  var data = {
      funcao: 'getListLojinha'
  }
  $.ajax({
      data:  data,
      type:  "GET",
      url:   dirTipoProduto,
      success: function (res) {
        res = JSON.parse(res);
        produtoLista = res;
        if(res){
          html="";
          $(res).each(function( k, v ) {
            html += '<div class="card m-2" style="width: 14rem;">';
            html += ' <div class="card-body">';
            html += '   <h5 class="card-title">'+v.nome+'</h5>';
            html += '   <h6 class="card-subtitle mb-2 text-muted">'+v.nometipo+'</h6>';
            html += '   <p class="card-text">R$ '+valorTotalProduto(parseFloat(v.valor), parseFloat(v.valorimposto))+'</p>';
            html += '   <a class="card-link" style="cursor: pointer;" onclick=\'addItem('+v.id+','+v.idProdutoTipo+', "'+v.nome+'", "'+v.nomeimposto+'", "'+v.nometipo+'" ,'+v.valor+','+v.valorimposto+');\'>Adicionar</a>';
            html += ' </div>';
            html += '</div>';
          });
          $('#listaProdutos').empty().append(html);
        }
      }, error: function (err){
          console.log(err);
      }
  });
}

itens = [];

function buscaItemCarrinho(id){
  var result = [];
  itens.forEach(function(o){if (o.id == id) result.push(o);} );
  return result ? result[0] : null;
}

function calculoQuantidade(id, valor, imposto){
  item = buscaItemCarrinho(id);
  qtd = $('#qtd'+id).val();
  valortotal = 0;
  imposto = imposto / 100;
  valorSemImp = valor * qtd;
  valTotalImposto = valorSemImp * imposto;
  valorTotal = valTotalImposto + valorSemImp;
  $('#imp'+id).empty().append("Valor total do Imposto: R$ "+ valTotalImposto.toFixed(2));
  $('#total'+id).empty().append("Valor total do Produto: R$ "+ valorTotal.toFixed(2));
  item.qtd = qtd;
  item.valor = valorTotal;
  pos = itens.findIndex(x => x.id === id);
  itens[pos] = item;
  calValorTotal();
}

function addItem(id, idTipo, nome, nomeImposto, nomeTipo, valor, valorImposto){
  verificar = buscaItemCarrinho(id);
  if(verificar){
    alert('Está tentando adicionar um item já existente no carrinho de compras');
  }else{
    impostoval = valorImposto / 100;
    impostoval = valor * impostoval;
    total = valor + impostoval;
    impostoval = impostoval.toFixed(2);
    item = {
      id : id,
      qtd : 1,
      valor: total
    };
    html = '<div id='+id+'>';
    html += '<h6 class="card-subtitle mb-2 text-muted">'+nome+' / <a class="text-danger" onclick="remover('+id+')" style="cursor: pointer;"> Remover</a></h6>';
    html += '<p class="card-text">';
    html += '  Valor Do Produto: R$ '+valor+'<br/>';
    html += '  Valor Do Imposto: '+valorImposto+'% = R$ '+impostoval+'<br/>';
    html += '  Quantidade <input id="qtd'+id+'" type="number" class="form-control form-control-sm" min="1" value="1" onchange="calculoQuantidade('+id+','+valor+','+valorImposto+')">';
    html += '  <p id="imp'+id+'">Valor total do Imposto: R$'+impostoval+'</p>';
    html += '  <p id="total'+id+'">Valor total do Produto: R$'+total.toFixed(2)+'</p>';
    html += '</p>';
    html += '<hr/>';
    html += '</div>';
    $('#listaCompras').append(html);
    itens.push(item);
    calValorTotal()
  }
  /*
  calculoQuantidade(id, valor, 1, valorImposto);*/
}

function calValorTotal(){
  total = 0;
  for (i = 0; i < itens.length; i++) {
    total = total + itens[i].valor;
  }
  $('#totalCarrinho').empty().append("Total R$"+total.toFixed(2));
}
function remover(id){
  pos = itens.findIndex(x => x.id === id);
  itens.splice(pos, 1);
  calValorTotal();
  $('#'+id).remove();
}

$(document).ready(function(){
  buscarProduto();

});
