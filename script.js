const btnLista = document.querySelector('.btn-lista');
const input = document.querySelector('.form-control');
const searchBtn = document.querySelector('.btn');

// Função para passar a primeira letra para maiuscula
function maiuscula (searchTerm){
     return searchTerm.charAt(0).toUpperCase() + searchTerm.substring(1);
}
// Função para criar as tags dos cards
function tag (){
    let tag = `
    
            <div class="card">
                <div >
                <a target="_blank" href="${nome.photo}"><img class="imagem" src="${nome.photo}" alt=""></a>
                </div>
                <div class="texto-card">
                    <p id="tipo">${nome.property_type}</p>
                    <p>${nome.name}</p>
                    <p>Preço R$${nome.price}</p>
                </div>
            </div>

    `
    return tag;
}

function fetchData (searchTerm) {
    fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72')
        .then( (res) => { res.json()
        .then( (data) => {
            for (nome of data){
                if (maiuscula(searchTerm) === nome.name){
                    const div = document.createElement('div');
                    div.innerHTML = tag ();
                    document.querySelector('#target').appendChild(div)
                }     
                else if(maiuscula(searchTerm) === nome.property_type){
                    const div = document.createElement('div');
                    div.innerHTML = tag();
                    document.querySelector('#target').appendChild(div)
                }
                else if(parseInt(searchTerm, 10) === nome.price){  
                    const div = document.createElement('div');
                    div.innerHTML = tag();
                     document.querySelector('#target').appendChild(div)
                }
                    
            }
        }) 
    })
}

let timeoutId;
// Função para impedir que chamadas à API sejam feitas a cada tecla pressionada
const onInput = (event) => {
    if(timeoutId){
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        fetchData(event.target.value); 
    }, 1000);
    
};

input.addEventListener('input', onInput);



// Botão que mostra a lista da API completa
btnLista.addEventListener('click', () => {
    fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72')
    .then( (res) => { res.json()
    .then( (data) => {
        for (nome of data){
            const div = document.createElement('div');
            div.innerHTML = tag ();
            document.querySelector('#target').appendChild(div)
        }      
    }) 
    });
} );

