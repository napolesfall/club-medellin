const modalNovidadesContainer = document.querySelector(".modal-novidades-container");
const modalNovidades = document.querySelector(".modal-novidades");
const buttonMarcaVistoContainer = document.querySelector(".button-marca-visto-container");


//button
const buttonClose = document.querySelector(".modal-novidades-close"); 

//arrasta modal
const modalTop = document.querySelector(".modal-top"); 

// Criando botão.
const porBotao = document.querySelector(".por-botao");


let intervaloId;
let holding = false;


fetch("../jsons/novidades.json")
.then(resposta => resposta.json())
.then(data => {
  
  // Criando botão
  if (localStorage.getItem("marcou-visto") == null && data.length > 0) {
    porBotao.innerHTML = `
    <div class="notification ativa-modal-button">
      <div class="sino">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
          <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
        </svg>
      </div>
      <div class="notification-text">${data.length} ${data.length == 1 ? "novidade" : "novidades"}</div>
    </div> 
  `;

    AtivarBotaoMarcaVisto();
  } 
  else {
    porBotao.innerHTML = `
    <button type="button" class="historico-button ativa-modal-button">         
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 6v6l4 2"></path>
        <circle cx="12" cy="12" r="10"></circle>
      </svg>

      <span class="historico-text">Histórico</span>
    </button>`;

    buttonMarcaVistoContainer.innerHTML = "";
  }

  // passando funções do botão
  const buttonAtivaModal = document.querySelector(".ativa-modal-button"); 
  buttonAtivaModal.addEventListener('click', OpenModal);
  buttonClose.addEventListener('click', CloseModal);


  modalNovidadesContainer.addEventListener('mousedown', (e) => {


    if (!modalNovidades.contains(e.target)) {
        CloseModal();
    }
  });


  // passando o contéudo do modal!
  const modalContent = document.querySelector(".modal-content");

  let html = "";
  console.log(data.length);
  // Tem algo
  if (data.length > 0) {
    data.forEach(novidade => {
      html += `
        <div class="novidade">
            <div class="novidade-info">
            <div class="novidade-icon">${novidade.icon}</div>

            <div class="novidade-texto">
              <p>${novidade.produtoNome}</p>
              <p>${novidade.marca}</p>
              <p class="${novidade.produtoNovo ? "produto-novo" : "preco-novo"}">${novidade.descricao}</p>
            </div>
          </div>

          <p class="novidade-data">
            <span>${novidade.data}</span>
            <span>${novidade.hora}</span>
          </p>
          </div>
      `;
    });
  }
  else {
    html = `
          <div class="resultado-nao-encontrado">
            <div class="resultado-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"" style="color: rgb(63, 63, 70);">
                <path d="m21 21-4.34-4.34"></path>
                <circle cx="11" cy="11" r="8"></circle>
              </svg>
            </div>
            <p class="titulo">Nenhuma Novidade Encontrada</p>
            <p class="recom" style="text-align:center;">No momento não houve alterações em preço ou novos produtos adicionados</p>
          </div>
        `;
  }

   modalContent.innerHTML = html;


   touch.addEventListener("pointerdown", () => {
    dragging = true;

    document.body.addEventListener("pointermove", MoverTouch);
    document.body.addEventListener("pointerup", SoltarTouch);
  });

 

})





const touch = document.querySelector(".modal-top");

let dragging = false;



function MoverTouch(evento) {
  if (!dragging) return;

  let mouseY = evento.clientY;
  let percent = (mouseY / window.innerHeight) * 100;

  // 🔒 trava no topo (20%)
  if (percent < 18) percent = 18;

  modalNovidades.style.top = percent + "%";

  // 🎨 efeito de fundo
  const opacity = (100 - percent) / 100 * 0.8;
  modalNovidadesContainer.style.backgroundColor =
    `rgba(0,0,0, ${opacity})`;
}

function SoltarTouch() {
  dragging = false;

  document.body.removeEventListener("pointermove", MoverTouch);
  document.body.removeEventListener("pointerup", SoltarTouch);

  const percent =
    modalNovidades.getBoundingClientRect().top / window.innerHeight * 100;

  // 🔽 Se passou da metade → fecha
  if (percent >= 50) {
    
    modalNovidades.classList.remove("modal-aparece");
    modalNovidadesContainer.classList.remove("bg-aparece");
    modalNovidadesContainer.setAttribute("inert", "");
    modalNovidadesContainer.style.backgroundColor = "rgba(0,0,0, 0)";
    modalNovidades.style.top = "100%";
  } 
  // 🔼 Senão → volta pro topo
  else {
    modalNovidades.style.top = "20%";
    modalNovidadesContainer.style.backgroundColor =
      "rgba(0,0,0, 0.8)";
  }
}


// Abrir e fechar modal



function OpenModal() {
  
  modalNovidades.removeAttribute("style");
  modalNovidadesContainer.removeAttribute("style");

  modalNovidadesContainer.classList.add("bg-aparece");
  modalNovidadesContainer.removeAttribute("inert");
  modalNovidades.classList.add("modal-aparece");
  
}

function CloseModal() {
  
  
    modalNovidades.classList.remove("modal-aparece");
    modalNovidadesContainer.classList.remove("bg-aparece");
    modalNovidadesContainer.setAttribute("inert", "");
    modalNovidadesContainer.style.backgroundColor = "rgba(0,0,0, 0)";
    modalNovidades.style.top = "100%";

}


// Ativa o botão marca visto
function AtivarBotaoMarcaVisto() {
  // Marquei como visto
  const buttonMarcaVisto = document.querySelector(".button-marcar-visto"); 

  buttonMarcaVisto.addEventListener('click', () => {
    // Vou desaparecer... e só apareço quando o outro existir.
    localStorage.setItem("marcou-visto", "true");
    buttonMarcaVisto.setAttribute("inert", ""); 
    buttonMarcaVisto.style.opacity = 0;

    // mudando o botão
    porBotao.innerHTML = `
    <button type="button" class="historico-button ativa-modal-button">         
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 6v6l4 2"></path>
        <circle cx="12" cy="12" r="10"></circle>
      </svg>

      <span class="historico-text">Histórico</span>
    </button>`;

    const buttonAtivaModal = document.querySelector(".ativa-modal-button"); 
    buttonAtivaModal.addEventListener('click', OpenModal);

  });

}