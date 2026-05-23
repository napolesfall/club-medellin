import { MostrarModal, CloseModalFoto, AtivarBotaoModalFoto } from "../home/modalFoto.js";
import {CriarCategorias } from "./criarMarca.js";


// Pegar o botão do input
const input = document.querySelector(".busca-input");
const botaoFechar = document.querySelector(".busca-input-close");
const inputPopupContainer = document.querySelector(".input-popup-container"); 
let resultado = [];
const LIMIT = 6;

let arrayMarcas = [];

const categoriaContainer = document.querySelector(".categoria"); 

// Categoria Mostrar Resultado de pesquisa!

// se eu clicar fora do input ou input popup, tirar o popup
document.body.addEventListener("click", (e) => {

  
  if (!input.parentElement.contains(e.target)) {
    inputPopupContainer.classList.remove("input-popup-aparece");
    inputPopupContainer.setAttribute('inert', '');
  }
  

})

// quando estou no input ele mostra o popup
input.addEventListener("focus", () => {
 inputPopupContainer.classList.add("input-popup-aparece");
  inputPopupContainer.removeAttribute('inert');
})


// zerando o input
botaoFechar.addEventListener("click", ()=> {
  input.value = "";
  inputPopupContainer.innerHTML = "";
})


fetch("../jsons/produtos.json")
.then(result => result.json())
.then(data => {

   // passando as marcas para um array.
  data.categorias.forEach((cate) => {
   cate.categoriaMarcas.forEach((marca) => {
    arrayMarcas.push(marca);
   })
    
  })
  

  IniciaBusca();
  
  


});

function IniciaBusca() {

    input.addEventListener('input', (e) => {
      const value = e.target.value.trim().toLowerCase();

      if (value.trim() === "") {
        inputPopupContainer.innerHTML = "";
        CriarCategorias();
        return;
      }

      resultado = [];
      
      if (value.length > 1) {

        // resetar o array no inicio do array.
      
        // Busca
           arrayMarcas.forEach((marcas) => {
          // Pegando todas as marcas e produtos
          ProcurarMarcasProdutos(marcas, value)
          });

          // Renderiza
          CriarInputPopup();
          MostrarResultado();
          PassandoAtivadorModalFoto();
        
    
      }
      else {
        
        // limpar popUp
        inputPopupContainer.innerHTML = "";

        // Recriar
        CriarCategorias();
      }

        
      if (value.length > 0) {
        botaoFechar.style.opacity = 1;
        botaoFechar.removeAttribute("inert");
      }
      else {
        botaoFechar.style.opacity = 0;
        botaoFechar.setAttribute("inert", "");
      };
    })

}

function PassandoAtivadorModalFoto() {
  const produtos = document.querySelectorAll(".resultado-produto");
 
  produtos.forEach((produto) => {
    produto.addEventListener('click', (e) => {
      
      const img = e.currentTarget.firstElementChild.firstElementChild.firstElementChild;
      const nome = e.currentTarget.firstElementChild.children[1].firstElementChild;
      const descricao = e.currentTarget.firstElementChild.children[1].dataset.produtoDescricao;
      console.log(descricao);
      
      MostrarModal(img, nome, descricao);
      
      
    })
  });
  
}

function MostrarResultado() {
      categoriaContainer.innerHTML = "";
   // Pegando A quantidade de marcas e numeros
        const valores = ContarQtd();

        let textoHtml = ""
        
        let qtdMarcasDiferentes = 0;
        let temMarcasNormais = false;

        if (resultado.length > 0) {
          textoHtml = `  <p class="resultado-texto"><span class="destaque">${valores.qtdProdutos}</span> ${valores.qtdProdutos == 1 ? "produto": "produtos"} encontrados em <span class="destaque">${valores.qtdMarcas}</span> ${valores.qtdMarcas == 1 ? "marca" : "marcas"}</p>`;
          
           // vai contar quanto falta para por o fim do input kkk
        let contador = 0;
        let marcaAnterior = "";
        let primeiroProduto = false;

          resultado.forEach((item) => {
            
            const marcaAtual = item.data.marca;

            if (item.tipo == "marca") {
              temMarcasNormais = true;
              contador = 0;
              
              const qtdProdutos = QtdProdutosMarca(item.data.marca)
              
              textoHtml += ` 
              <div class="resultado-marca">
                <div class="top">
                  <h2>${highlight(item.data.marca, input.value)}</h2>
                  <span>${qtdProdutos == 1 ? qtdProdutos + " Produto" : qtdProdutos + " Produtos"}</span>
                </div>

                <div class="resultado-produto-container">`;


            }
            else if(contador <= 0)
            {
              marcaAnterior = item.data.marca;
              
            }
            
            // Usado para caso o primeiro elemento for um produto
            if (item.tipo=="produto" && !primeiroProduto) {
              primeiroProduto = true;
                contador = 0;
                qtdMarcasDiferentes++;
              marcaAnterior = item.data.marca;
              
              const qtdProdutos = QtdProdutosMarca(marcaAnterior)
              
              textoHtml += ` 
              <div class="resultado-marca">
                <div class="top">
                  <h2>${highlight(item.data.marca, input.value)}</h2>
                  <span>${qtdProdutos == 1 ? qtdProdutos + " Produto" : qtdProdutos + " Produtos"}</span>
                </div>

                <div class="resultado-produto-container">`;

            }
            else {
              // se o primeiro elemento não foi produto n tem pq executar dps
              primeiroProduto = true;
              
            }

            if(marcaAnterior != marcaAtual && item.tipo == "produto") {
              contador = 0;
              qtdMarcasDiferentes++;
              marcaAnterior = item.data.marca;
              
              const qtdProdutos = QtdProdutosMarca(marcaAnterior)
              
              textoHtml += ` 
              <div class="resultado-marca">
                <div class="top">
                  <h2>${highlight(item.data.marca, input.value)}</h2>
                  <span>${qtdProdutos == 1 ? qtdProdutos + " Produto" : qtdProdutos + " Produtos"}</span>
                </div>

                <div class="resultado-produto-container">`;
            }
        

            if (item.tipo == "produto") {
              contador++;
              let p = item.data;
              textoHtml += `
              <div class="resultado-produto" style="border-top: 1px solid rgba(39, 39, 42, 0.3);">
                <div class="resultado-info">
                  <div class="produto-foto">
                    <img src="${p.foto}" alt=" foto do produto ${p.nome}">
                  </div>
                  <div class="texto" data-produto-descricao="${p.descricao}">
                    <p class="titulo">${highlight(p.nome, input.value)}</p>
                    <p class="subtitulo">${p.peso} • ${p.quantidade}</p>
                  </div>
                </div>
                <div class="preco">R$ ${p.preco}</div>
              </div>
              
              `;
            }
            
            if (contador === QtdProdutosMarca(item.data.marca)) {
                // fazer isso no ultimo elemento do array...
            textoHtml += `
                </div>

              </div>  `
            }
          
          })
        }
        else {
          textoHtml = `
          <div class="resultado-nao-encontrado">
            <div class="resultado-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"" style="color: rgb(63, 63, 70);">
                <path d="m21 21-4.34-4.34"></path>
                <circle cx="11" cy="11" r="8"></circle>
              </svg>
            </div>
            <p class="titulo">Nenhum produto encontrado para "<span style="color: rgb(255, 255, 255); font-size: 16px;">${input.value}</span>"</p>
            <p class="recom">Tente outra palavra-chave ou abreviação</p>
          </div>
        `;
        }
       
        
        categoriaContainer.innerHTML = textoHtml;

        if (qtdMarcasDiferentes > 0) {

        if (temMarcasNormais) {
          qtdMarcasDiferentes += valores.qtdMarcas;
          
        }
        
        
        const resultadoTexto = document.querySelector(".resultado-texto");
        resultadoTexto.innerHTML= `
        <p class="resultado-texto"><span class="destaque">${valores.qtdProdutos}</span> ${valores.qtdProdutos == 1 ? "produto": "produtos"} encontrados em <span class="destaque">${qtdMarcasDiferentes}</span> ${qtdMarcasDiferentes == 1 ? "marca" : "marcas"}</p>`;
          
        }
        
        
}

function QtdProdutosMarca(marca) {
  
  let qtdProdutos = 0;

  resultado.forEach((result) => {
    
    
      if (result.tipo == "produto" && result.data.marca.toLowerCase() === marca.toLowerCase()) {
     
        
        qtdProdutos++;
      }
  });

  
  return qtdProdutos;
}

function ContarQtd() {
  let qtdProdutos = 0;
  let qtdMarcas = 0;
  let marcaAnterior;
  resultado.forEach((item, index) => {
    if (item.tipo == "marca") {
      qtdMarcas++;
    }

    if (item.tipo == "produto") {
      qtdProdutos++;
    }
  });

  return {qtdMarcas, qtdProdutos};
}

function CriarInputPopup() {
  const mostrarInputpop =  resultado.slice(0, LIMIT);

  let html = "";
  let qtdProdutos = 0;
  let qtdMarcas = 0;

  mostrarInputpop.forEach(result => {

  // Marca
  if (result.tipo === "marca") {
    const marca = result.data;
    const qtdProd = marca.produtos.length;
    
      html += `
      <div class="input-popup">
        <div class="popup-info">
          <div class="popup-icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#5f6368">
              <path d="M120-120v-560h240v-80l120-120 120 120v240h240v400H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm240 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm240 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z"/>
            </svg>
          </div>
          <div class="popup-tipo-marca">
            <span>${highlight(marca.marca, input.value)}</span>
            <span>marca</span>
          </div>
        </div>
        <div class="qtd-produtos">${qtdProd > 0 ? qtdProd == 1 ? qtdProd + " Produto" : qtdProd + " Produtos": "Nenhum produto"}</div>
      </div>
      `;
  }

  // Produto
  if (result.tipo === "produto") {

    const produto = result.data;
      html += `
          <div class="input-popup">
            <div class="popup-info">
              <div class="popup-icon-produto">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(201, 162, 39)">
                    <path d="M200-640v440h560v-440H640v320l-160-80-160 80v-320H200Zm0 520q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v499q0 33-23.5 56.5T760-120H200Zm16-600h528l-34-40H250l-34 40Zm184 80v190l80-40 80 40v-190H400Zm-200 0h560-560Z"/>
                  </svg>
                </div>
                <div class="popup-tipo-produto">
                  <span>${highlight(produto.nome, input.value)}</span>
                  <span>${highlight(produto.marca, input.value)}</span>
                </div>
              </div>
            <div class="preco-produto">R$ ${produto.preco}</div>
          </div>`;
  }
  });

  inputPopupContainer.innerHTML = html;

  const inputPopups = document.querySelectorAll(".input-popup");
  inputPopups.forEach((inputPop) => {
    inputPop.addEventListener('click', (e) => {
     input.value = e.currentTarget.firstElementChild.children[1].firstElementChild.textContent
        inputPopupContainer.classList.remove("input-popup-aparece");
        inputPopupContainer.setAttribute('inert', '');

        const evento = new Event('input');
        input.dispatchEvent(evento);
        
        
    });
  });

  return {qtdMarcas, qtdProdutos};
}


function ProcurarMarcasProdutos(marca, value) {

  // Procurando marca
    
    // procurando a marca
    if (marca.marca.toLowerCase().includes(value)) {
      // Marca encontrada!
      resultado.push({tipo: "marca", data: marca});
      
    }

    // Procurando O produto
    marca.produtos.forEach((produto)=> {
        if(produto.nome.toLowerCase().includes(value) || produto.marca.toLowerCase().includes(value))
        resultado.push({tipo: "produto", data: produto});
    })
    
}

function highlight(text, search) {
  if (!search) return text;

  const regex = new RegExp(`(${search})`, "gi");
  return text.replace(regex, `<span class="highlight">$1</span>`);
}

AtivarBotaoModalFoto();
// Ele só aparece quando o input tem algo dentro dele.

// Ao clicar nele, o valor do input some.