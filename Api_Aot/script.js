let currentPage = 1;
let api = `https://api.attackontitanapi.com/characters?page=${currentPage}`;

function pagination(action) {
    if (action === 'p' && currentPage) {
        if (currentPage === 11) {
            currentPage = 1;
        } else {
            currentPage++;
        }
    } else if (action === 'a') {
        if (currentPage === 1) {
            currentPage = 11;
        } else {
            currentPage--;
        }
    }
    
    api = `https://api.attackontitanapi.com/characters?page=${currentPage}`;
    document.getElementById('page-number').textContent = currentPage;
    inicializa();
}

function criarCardPersonagem(personagem) {
    const card = document.createElement('div');
    const divImagem = document.createElement('div');
    const imgPersonagem = document.createElement('img');
    const divInfo = document.createElement('div');
    const h3Nome = document.createElement('h3');
    const pId = document.createElement('p');
    const pStatus = document.createElement('p');
    const pOcupacao = document.createElement('p');
    const pAges = document.createElement('p');
    const pAlias = document.createElement('p');
    const pSomaEpisodios = document.createElement('p');

    card.className = 'personagem-card'; 

    
    const statusLower = (personagem.status || '').toLowerCase();
    if (statusLower.includes('deceased')) {
        card.classList.add('card-falecido');
    }

    divImagem.className = 'personagem-img';
    imgPersonagem.src = personagem.foto; 
    imgPersonagem.alt = `Foto do personagem ${personagem.nome}`; 
    divInfo.className = "personagem-info";
    pId.className = "personagem-id";

    pId.textContent = `#${String(personagem.id).padStart(3, '0')}`;

    h3Nome.textContent = personagem.nome;
    pStatus.innerHTML = `<strong>Status: </strong> ${personagem.status || 'Desconhecido'}`;
    pOcupacao.innerHTML = `<strong>Ocupação: </strong> ${personagem.ocupacao || 'Não informada'}`;
    pAges.innerHTML = `<strong>Idade: </strong> ${personagem.age || 'Não informada'}`;
    pAlias.innerHTML = `<strong>Alias: </strong> ${personagem.alias || 'Não informada'}`;
    pSomaEpisodios.innerHTML = `<strong>Total de Episódios: </strong> ${personagem.somaDosEpisodios || 0}`;

    divInfo.appendChild(pId);
    divInfo.appendChild(h3Nome);
    divInfo.appendChild(pStatus);
    divInfo.appendChild(pOcupacao);
    divImagem.appendChild(imgPersonagem);
    divInfo.appendChild(pAges);

    if (personagem.alias && personagem.alias.length > 0) {
        divInfo.appendChild(pAlias);
    }

    divInfo.appendChild(pSomaEpisodios);

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
        const episodiosNumeros = item.episodes || [];
        const quantidadeEpisodios = episodiosNumeros.length;
        
        return {
            id: item.id,
            nome: item.name,
            foto: item.img,
            genero: item.gender,
            status: item.status,
            ocupacao: item.occupation,
            age: item.age,
            alias: item.alias,
            somaDosEpisodios: quantidadeEpisodios
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