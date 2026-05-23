import { MostrarModal, CloseModalFoto, AtivarBotaoModalFoto } from "../home/modalFoto.js";

const tabelasContainer = document.querySelector(".tabelas-container"); 

fetch("../jsons/produtosPromocao.json")
.then(response => response.json())
.then( tabelas => {
  
  
  if(tabelas.length > 0) {

  let texto = "";
      // parte de cima da tabela
      texto += `
      <div class="frete-container">
        <div class="frete-container-top">
          <h2>Produtos em PROMOÇÃO</h2>
          <p>Confira eles agora Mesmo!</p>
        </div>

        <table class="table-frete">
          <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
          </tr>
          </thead>

          <tbody>
      `;
    

    tabelas.forEach(produto => {
      
        texto += `
            <tr>
            <td class="frete-regiao">
              <div class="produto-ofertado-container">
                <div class="marca">${produto.marca}</div>
                <div class="produto-info" data-produto-descricao="${produto.descricao}">
                  <div class="foto">
                    <img src="${produto.foto}" alt="foto do produto" width="38">
                  </div>
                  <div class="info">
                    <div class="nome">${produto.nome}</div>
                    <div class="peso">${produto.peso}</div>
                    <div class="qtd">${produto.quantidade}</div>
                  </div>
                </div>
              </div>
            </td>
              <td class="frete-preco">
                <div class="preco-anterior">R$ ${produto.precoAnterior}</div>
                  ➜
                <div class="preco-atual">R$ ${produto.precoAtual}</div>
              </td>
          </tr>
        `;
      
   
      
    });

       // final da tabela
      texto += `
        </tbody>
        </table>
    </div>`;
    
    tabelasContainer.innerHTML = texto;



    // Pegar fotos
    const fotos = document.querySelectorAll(".produto-info .foto");
    fotos.forEach(foto => {
      
      foto.addEventListener('click', (e) => {
        const img = e.currentTarget.firstElementChild;
        const produtoNome = e.currentTarget.parentElement.children[1].firstElementChild;
        const descricao = e.currentTarget.parentElement.dataset.produtoDescricao;
        
        MostrarModal(img, produtoNome, descricao);
        
      });

    });
    

}
else {
  tabelasContainer.innerHTML = `
    <div class="nenhum-produto-ofertado">
        <div class="icon" style="font-size:48px;">🔥</div>
        <p>Nenhuma promoção ativa</p>
        <p>Fique de olho — as promoções aparecem aqui!</p>
        <a href="/html/index.html" class="botao">Ver todos produtos</a>
    </div>
    `;
}
  
});

AtivarBotaoModalFoto();