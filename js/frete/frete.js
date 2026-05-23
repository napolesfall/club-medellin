const tabelasContainer = document.querySelector(".tabelas-container"); 

fetch("../jsons/fretes.json")
.then(response => response.json())
.then( tabelas => {
  
  tabelas.forEach(tabela => {
    
   let texto = "";
    // parte de cima da tabela
    texto += `
       <div class="frete-container">
      <div class="frete-container-top">
        <h2>${tabela.titulo}</h2>
        <p>${tabela.subtitulo}</p>
      </div>

      <table class="table-frete">
        <thead>
         <tr>
          <th>Região</th>
          <th>Preço</th>
         </tr>
        </thead>

        <tbody>
    `;
  

    // valor na tabela
    
    tabela.regiaoPreco.forEach(data => {
      
      texto += `
        <tr>
           <td class="frete-regiao">${data.regiao}</td>
            <td class="frete-preco">${data.preco}</td>
         </tr>
      `;

      
    });

    
    // final da tabela
    texto += `
      </tbody>
      </table>
   </div>`;

   
   tabelasContainer.innerHTML += texto;
    
  });
  
});
