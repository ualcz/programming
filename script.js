const api = "https://api.attackontitanapi.com/characters";

function criarCardPersonagem(personagem) {
    const card = document.createElement('div');
    const divImagem = document.createElement('div');
    const imgPersonagem = document.createElement('img');
    const divInfo = document.createElement('div');
    const h3Nome = document.createElement('h3');
    const pId = document.createElement('p');
    const divTipos = document.createElement('div');
    const pStatus = document.createElement('p');
    const pOcupacao = document.createElement('p');
    const pAges = document.createElement('p');
    

    card.className = 'pokemon-card'; 
    divImagem.className = 'pokemon-img';
    imgPersonagem.src = personagem.foto; 
    imgPersonagem.alt = `Foto do personagem ${personagem.nome}`; 
    divInfo.className = "pokemon-info";
    pId.className = "pokemon-id";
    divTipos.className = 'pokemon-tipos';

  
    pId.textContent = `#${String(personagem.id).padStart(3, '0')}`;

    h3Nome.textContent = personagem.nome;
    pStatus.innerHTML = `<strong>Status: </strong> ${personagem.status || 'Desconhecido'}`;
    pOcupacao.innerHTML = `<strong>Ocupação: </strong> ${personagem.ocupacao || 'Não informada'}`;
    pAges.innerHTML = `<strong>Idade: </strong> ${personagem.age || 'Não informada'}`;



    divInfo.appendChild(pId);
    divInfo.appendChild(h3Nome);
    divInfo.appendChild(pStatus);
    divInfo.appendChild(pOcupacao);
    divImagem.appendChild(imgPersonagem);
    divInfo.appendChild(pAges)

    card.appendChild(divImagem);
    card.appendChild(divInfo);
    
    return card;
}


async function listaPersonagens() {
    try {
        const resposta = await fetch(api);
        const dados = await resposta.json();
      
        return dados.results || dados; 
    } catch (error) {
        console.error("Erro ao buscar a lista de personagens:", error);
        throw error;
    }
}


async function buscarDetalhesPersonagem(item) {
    try {
        
        return {
            id: item.id,
            nome: item.name,
            foto: item.img,
            genero: item.gender,
            status: item.status,
            ocupacao: item.occupation,
            age: item.age

        };
    } catch (error) {
        console.error("Erro ao processar detalhes do personagem:", error);
        throw error;
    }
}

function RenderizarCards(lista) {
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; 

    lista.forEach(personagem => {
        const card = criarCardPersonagem(personagem);
        container.appendChild(card);
    });
}

async function inicializa() {
    try {
        const lista = await listaPersonagens();
        
        const promisses = lista.map(item => buscarDetalhesPersonagem(item));
        const listaDetalhada = await Promise.all(promisses);

        listaDetalhada.sort((a, b) => a.id - b.id);

        RenderizarCards(listaDetalhada);
    } catch (error) {
        console.error("Erro ao inicializar os personagens:", error);
    }
}

document.addEventListener('DOMContentLoaded', inicializa);