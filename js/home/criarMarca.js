import { MostrarModal, CloseModalFoto, AtivarBotaoModalFoto } from "../home/modalFoto.js";

const categoria = document.querySelector(".categoria");
const footer = document.querySelector("footer > div > p");
let categorias;
let categoriaAtacado = [];
let atacado;

fetch("../jsons/produtos.json")
  .then(response => response.json()) // Converte o arquivo para objeto JS
  .then(data => {
    // Criar categorias;
    categorias = data.categorias;
   CriarCategorias(categorias);
  
  })

function ContarProdutosTotal(categoria) {
  let numProdutos = 0;
  categoria.forEach((marcas)=> {
    numProdutos += marcas.produtos.length;
    
  })
  
  return numProdutos;
}

function SeparandoCategoriaAtacado() {

    // reset da categoria
    categoriaAtacado = [];

    categorias.forEach(cate => {
    
      const {categoriaNome, categoriaAbreviacao, categoriaMarcas} = cate;

      const obj = {
        categoriaNome,
        categoriaAbreviacao,
        categoriaMarcas
      }
      
      obj.categoriaMarcas = [];
      
      // guardando as marcas do atacado.
      cate.categoriaMarcas.forEach((marca) => {
        
        if (marca.atacado) {
          obj.categoriaMarcas.push(marca)
        }
        
      });

      categoriaAtacado.push(obj)
      

    });
    
}

export function CriarCategorias() {

  SeparandoCategoriaAtacado()

    let numTotalProdutos = 0;

      categoria.innerHTML = "";

   // Passando pelo array de categorias
   categoria.innerHTML = `
    <div class="divisao-categoria">
      <div class="divisao-texto">
        <h2>VAREJO</h2>
        <p>Dê uma olha nos nossos produtos!</p>
      </div>
      <div class="divisao-icon">🛍️</div>
    </div>`;
    
    categorias.forEach((cate, index) => {
      
      const numMarcas = cate.categoriaMarcas.length;
      let numProdutos = ContarProdutosTotal(cate.categoriaMarcas);
      numTotalProdutos += numProdutos;
      
        categoria.innerHTML += `

        <div class="mostrar-marcas-container" data-atacado="${false}" data-categoria-id="${index}" data-ativar="${numProdutos > 0 ? true : false}">
          
          <!--Botão para acessar as marcas-->
          <button type="button" class="mostrar-marcas" style="position:relative;">
            <input class="categoria-radio" type="radio" name="categoria" style=" opacity: 0; position:absolute; left:0; width: 100%; height: 100%;">
      
            <div class="marca-tipo">
              <div class="marca-tipo-icon">
                ${cate.categoriaAbreviacao}
              </div>
              <div class="marca-tipo-text">
                <h2>${cate.categoriaNome}</h2>
                <p style="color: rgb(113, 113, 122);">${numMarcas > 0 ? numMarcas == 1? numMarcas + " Marca" : numMarcas + " Marcas" : "Nenhuma Marca"} • ${numProdutos > 0 ? numProdutos == 1 ? numProdutos + " Produto" : numProdutos + " Produtos": "Nenhum Produto"}</p>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="transition-transform" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="color: rgb(201, 162, 39);">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button> 

          <div class="marcas-container-js"></div>
        </div>`;
    });
    

    categoria.innerHTML += ` 
    <div class="divisao-categoria atacado">
      <div class="divisao-texto">
        <h2>ATACADO</h2>
        <p>A partir de 3.500 Reais em produtos!</p>
      </div>
      <div class="divisao-icon">🛒</div>
    </div> `;

  
    categoriaAtacado.forEach((cate, index) => {
      
      
      const numMarcas = cate.categoriaMarcas.length;
      let numProdutos = ContarProdutosTotal(cate.categoriaMarcas);
     
      
        categoria.innerHTML += `

        <div class="mostrar-marcas-container" data-atacado="${true}" data-categoria-id="${index}" data-ativar="${numProdutos > 0 ? true : false}">
          
          <!--Botão para acessar as marcas-->
          <button type="button" class="mostrar-marcas" style="position:relative;">
            <input class="categoria-radio" type="radio" name="categoria" style=" opacity: 0; position:absolute; left:0; width: 100%; height: 100%;">
      
            <div class="marca-tipo">
              <div class="marca-tipo-icon">
                ${cate.categoriaAbreviacao}
              </div>
              <div class="marca-tipo-text">
                <h2>${cate.categoriaNome}</h2>
                <p style="color: rgb(113, 113, 122);">${numMarcas > 0 ? numMarcas == 1? numMarcas + " Marca" : numMarcas + " Marcas" : "Nenhuma Marca"} • ${numProdutos > 0 ? numProdutos == 1 ? numProdutos + " Produto" : numProdutos + " Produtos": "Nenhum Produto"}</p>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="transition-transform" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="color: rgb(201, 162, 39);">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button> 

          <div class="marcas-container-js"></div>
        </div>`;
    });


    // pegando botão de mostrar as marcas da categoria
    const buttonMostrarMarcas = document.querySelectorAll(".categoria-radio");
    buttonMostrarMarcas.forEach(button => {
      button.addEventListener("click", function(evento) {
        
        
        const button = evento.currentTarget.parentElement;
        const mostrarMarcasContainer = button.parentElement;
        const ativar = JSON.parse(mostrarMarcasContainer.dataset.ativar);

        if (!ativar) {
          return;
        }

        // Pegando elementos
        const svg = button.lastElementChild;
        const marcasContainer = mostrarMarcasContainer.lastElementChild;
        
        atacado = JSON.parse(mostrarMarcasContainer.getAttribute('data-atacado'));
        
          let marcaInfo;
        if (atacado) {
           // pegando o id
          
           
          const categoriaId = mostrarMarcasContainer.getAttribute('data-categoria-id');
          marcaInfo = categoriaAtacado[categoriaId].categoriaMarcas;
        } 
        else 
        {
          
          
          // pegando o id
          const categoriaId = mostrarMarcasContainer.getAttribute('data-categoria-id');
          marcaInfo = categorias[categoriaId].categoriaMarcas;

        }
        // Alterando classes
        svg.classList.toggle("rotate-180");
        button.classList.toggle("apareceu-marcas");
        marcasContainer.innerHTML = '';

        // Resetar Categorias sem uso
        ResetarCategoriasSemUso()
          

       if (svg.classList.contains("rotate-180")) {
        CriarMarcas(marcaInfo, marcasContainer);
         
       }
 
      });

      
    });

    // passando para o footer
    footer.textContent = "CLUB MEDELLÍN • ";
    footer.textContent += numTotalProdutos > 0 ? numTotalProdutos == 1 ? numTotalProdutos + " Produto" : numTotalProdutos + " Produtos" : "Nenhum Produto"

}  

function ResetarCategoriasSemUso() {
   const buttonMostrar = document.querySelectorAll(".categoria-radio");
        buttonMostrar.forEach(botao => {
          
          if (!botao.checked) {
            
            const button = botao.parentElement;
            const mostrarMarcasContainer = button.parentElement;
            
            const svg = button.lastElementChild;
            const marcasContainer = mostrarMarcasContainer.lastElementChild;

            svg.classList.remove("rotate-180");
            button.classList.remove("apareceu-marcas");
            marcasContainer.innerHTML = '';
          }
        });
}

function ContarProdutosIndisponiveis(produtos){
  let numProdutos = 0;
   produtos.forEach((e) => {
      if (!e.disponivel) {
        numProdutos++;
      }
    })

    return numProdutos;
}

function CriarMarcas(marcaInfo, marcasContainer) {
     
  
  
  marcaInfo.forEach((marca, marcaIndex) => {
    
    
    const numProdutos = marca.produtos.length;
    let numProdutosIndisponiveis = ContarProdutosIndisponiveis(marca.produtos);

      marcasContainer.innerHTML += `
          <div class="marca-container-js">
            <div class="marca" data-marca-id="${marcaIndex}" style="position: relative;">
              <input class="marca-radio" type="radio" name="marca" style=" opacity:0; position:absolute; left:0; width: 100%; height: 100%;">
      
              <div class="marca-text">
                <p class="marca-name">${marca.marca}</p>
                <p class="marca-produtos">${numProdutos == 1 ? numProdutos + " Produto": numProdutos + " Produtos"} ${numProdutosIndisponiveis > 0 ? numProdutosIndisponiveis == 1?'<span class="indisponivel">('+ numProdutosIndisponiveis+' indisponível)</span>': '<span class="indisponivel">('+ numProdutosIndisponiveis+' indisponíveis)</span>' : "" }</p>
              </div>

              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="color: rgb(161, 161, 170);">
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </div>

            <!--Produtos adicionados por código-->
            <div class="produto-categoria-container-js"></div>
          </div>
          `;
  })

  // adicionando o fundo
  marcasContainer.innerHTML += `<div class="mostrar-marcas-final"></div>`;
  marcasContainer.scrollIntoView({
      behavior: 'smooth', 
      block: 'end'        
    });


  const buttonMostrarProdutos = document.querySelectorAll(".marca-radio");
  buttonMostrarProdutos.forEach((marca) => {
    
    marca.addEventListener('click', function(e) {
      
      // Atualizar esses dados e ajeitar os elementos que estão aq.
        const button = e.currentTarget.parentElement;
        const svg = button.lastElementChild;
        const marcas = button.parentElement;
        const produtoCategoria = marcas.lastElementChild;
        const marcaName = button.children[1].firstElementChild;

        
        // pegando o id
        const marcaId = button.getAttribute('data-marca-id');
        const produtoCategoriaInfo = marcaInfo[marcaId].produtos;
        
        // Alterando classes
        svg.classList.toggle("rotate-180");
        button.classList.toggle("apareceu-marcas");
        marcaName.classList.toggle("marca-name-aumento");
        
        produtoCategoria.innerHTML = '';

        // fechar os outros botões.
        
        ResetarMarcasSemUso();

        // Produtos
        if (svg.classList.contains("rotate-180")) {
        CriarCategoria(produtoCategoria, produtoCategoriaInfo)
        

       }
    })
  });


  
}

function ResetarMarcasSemUso() {
  let buttonMostrar = document.querySelectorAll(".marca-radio");
    buttonMostrar.forEach((botao) => {
      if (!botao.checked) {

        const button1 = botao.parentElement;
        const svg1 = button1.lastElementChild;
        const marcas1 = button1.parentElement;
        const produtoCategoria1 = marcas1.lastElementChild;
        const marcaName1 = button1.children[1].firstElementChild;
        
        
        svg1.classList.remove("rotate-180");
        button1.classList.remove("apareceu-marcas");
        marcaName1.classList.remove("marca-name-aumento");

        produtoCategoria1.innerHTML = '';
      
      }
      
    });
}

function CriarCategoria(produtoCategoria, produtoCategoriaInfo) {
     // Verificando 
    let injetavel = 0;
    let oral = 0;

    // Vendo a quantidade por contéudo
    produtoCategoriaInfo.forEach((produto) => {
      
        if (produto.tipo.includes("Injetável")) {
          injetavel++;
        }
        else if (produto.tipo.includes("Oral")) {
          oral++;
        }
        
    })
    
  
    // vendo quantas categorias existem, se for maior que 1, ent mostra duas categorias.
    // se não, n mostra categoria.
    let numCategoria = 0;

    if (oral > 0) {
      numCategoria++;
    } 
    
    if (injetavel > 0) {
      numCategoria++;
    }
  
    if(numCategoria > 1)
    {

        let htmlCategoria = `
      <div class="produto-categoria">
        <div class="produto-selecao">Selecione uma das opções abaixo para ver os produtos</div>`;

    if (oral > 0) {
      htmlCategoria += `    
        <!--ORAIS-->
        <div class="produto-tipo-container">
            <button type="button" class="produto-tipo" data-button="Oral">
                <div class="tipo-uso">
                  <span class="icon">💊</span>
                  <span class="text">ORAIS</span>
                </div>
                <div class="qtd-produtos">
                  <span class="text">${oral > 1 ? oral + " Produtos" : oral + " Produto"}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </div>
              </button>

              <!--Produtos-->
            <div class="produto-container-js"></div>
        </div>`;
    }

    if (injetavel > 0) {
      htmlCategoria += ` 
      <!--Injetáveis-->
      <div class="produto-tipo-container">

        <!--Tipo categoria-->
        <button type="button" class="produto-tipo arredondar-fundo" data-button="Injetável">
          <div class="tipo-uso">
            <span class="icon">💉</span>
            <span class="text">INJETÁVEIS</span>
          </div>
          <div class="qtd-produtos">
            <span class="text">${injetavel > 1 ? injetavel + " Produtos" : injetavel + " Produto"}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </div>
        </button>

        <!--Container-->
        <div class="produto-container-js">
          
        </div>
      </div>`;
    }

    htmlCategoria += `</div>
    `;
    
    produtoCategoria.innerHTML = htmlCategoria;
    produtoCategoria.scrollIntoView({
      behavior: 'smooth', 
      block: 'end'        
    });

    const produtos = document.querySelectorAll(".produto-tipo");
    produtos.forEach(produto => {
      produto.addEventListener('click', function(e) {
        const button = e.currentTarget;
        const parent = button.parentElement;
        const svg = button.lastElementChild.lastElementChild;
        const produtoTipo = button.getAttribute("data-button")
        const produtosHtml = parent.lastElementChild;

        // svg
        svg.classList.toggle("rotate-180");

        // resetando
        produtosHtml.innerHTML = '';
        if (svg.classList.contains("rotate-180")) {
              // Passando pelo produto.
              
              CriarProdutoPorTipo(produtosHtml, produtoCategoriaInfo, produtoTipo)
        }
      });
    });
    
    }
    else
    { 
      CriarProduto(produtoCategoria, produtoCategoriaInfo);
     }
            
          
}  

function CriarProduto(produtoCategoria, produtoCategoriaInfo) {

 // produtoCategoria += ` <div class="produto-categoria">`
  
  produtoCategoriaInfo.forEach((p) => {

  if (p.disponivel) {
    produtoCategoria.innerHTML += `
    <div class="produto-container border-lateral">
      <div class="produto-foto"> <img src="${p.foto}" alt="foto do produto ${p.nome}"></div>
      <div class="produto-info" data-produto-descricao = "${p.descricao}">
        <h2 class="produto-name">${p.nome}</h2>
        <p class="produto-peso">${p.peso}</p>
        <p class="produto-conteudo">${p.quantidade}</p>
      </div>
      <div class="produto-preco">R$ ${ atacado ? p.precoAtacado : p.preco}</div>
    </div>`;
  }
  else
  {
    produtoCategoria.innerHTML += `
    <div class="produto-container produto-indisponivel">
      <div class="produto-foto"> <img src="${p.foto}" alt="foto do produto ${p.nome}"></div>
      <div class="produto-info" data-produto-descricao = "${p.descricao}">
        <h2 class="produto-name">${p.nome}</h2>
        <p class="produto-peso">${p.peso}</p>
      </div>
      <div class="button-fake-ind">INDISPONÍVEL</div>
    </div>`;
  }
  });

 // produtoCategoria += ` </div>`
  CriarFoto();

}

function CriarProdutoPorTipo(produtoCategoria, produtoCategoriaInfo, produtoTipo) {

  produtoCategoriaInfo.forEach((p) => {

  
    
  if (p.tipo.includes(produtoTipo)) {
   
    
      if (p.disponivel) {
        
          
        produtoCategoria.innerHTML += `
        <div class="produto-container">
        <div class="produto-foto"> <img src="${p.foto}" alt="foto do produto ${p.nome}"></div>
        <div class="produto-info" data-produto-descricao = "${p.descricao}">
          <h2 class="produto-name">${p.nome}</h2>
          <p class="produto-peso">${p.peso}</p>
          <p class="produto-conteudo">${p.quantidade}</p>
        </div>
        <div class="produto-preco">R$ ${p.preco}</div>
        </div>`;
      }
      else
      {
        produtoCategoria.innerHTML += `
        <div class="produto-container produto-indisponivel">
        <div class="produto-foto"> <img src="${p.foto}" alt="foto do produto ${p.nome}"></div>
        <div class="produto-info" data-produto-descricao = "${p.descricao}">
          <h2 class="produto-name">${p.nome}</h2>
          <p class="produto-peso">${p.peso}</p>
        </div>
        <div class="button-fake-ind">INDISPONÍVEL</div>
        </div>`;
      }
    }
  });

  CriarFoto();

}

function CriarFoto() {
  const produtosFotos = document.querySelectorAll('.produto-container .produto-foto');

  produtosFotos.forEach((produtoFoto) => {
    
    
    produtoFoto.addEventListener("click", (e) => {

      const produtoFoto = e.currentTarget;
      const parent = produtoFoto.parentElement;
      const produtoName = parent.children[1].firstElementChild;
      const descricao = parent.children[1].dataset.produtoDescricao;
     
      
      const img = produtoFoto.firstElementChild;

      MostrarModal(img, produtoName, descricao);
    });
  });
}


AtivarBotaoModalFoto();
