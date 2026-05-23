const modalContainer = document.querySelector(".modal-foto-container");
const modalFoto = document.querySelector(".modal-foto-container img");
const modalTexto = document.querySelector(".modal-foto-container .modal-produto-name");
const modalDescricao = document.querySelector(".modal-foto-container .modal-produto-descricao");
const closeButton = document.querySelector(".close-button");


export function MostrarModal(img, produtoName, descricao) {
         // mudando foto do modal
      modalFoto.src = img.src;
      
      modalTexto.innerHTML = produtoName.textContent;

      modalDescricao.innerHTML = descricao;
      

      // abrir modal
      modalContainer.classList.remove("modal-fechou");
      modalContainer.classList.add("modal-abriu");
      modalContainer.removeAttribute('inert');
      modalContainer.dataset.state = 'open';

        modalTexto.scrollIntoView({
        behavior: 'smooth', 
        block: 'end'        
      });
           
}

// Fechar modal Foto
export function CloseModalFoto() {
  // Elementos que vão mudar
  modalContainer.classList.remove("modal-abriu");
  modalContainer.classList.add("modal-fechou");
  modalContainer.setAttribute('inert', '');
  modalContainer.dataset.state = 'close';
}

export function AtivarBotaoModalFoto() {
  closeButton.addEventListener("click", CloseModalFoto);

  modalContainer.addEventListener('click', (click) => {
                              
  if (!modalContainer.firstElementChild.contains(click.target)) 
  {
      CloseModalFoto();
  }
  
});

}
