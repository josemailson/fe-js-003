import { Opcao } from "./Opcao.js";

let listaAtividades = baixarLista();
console.log(listaAtividades);


const formulario = document.createElement('form');
const inputAtividade = document.createElement('input');
const inputDataAtividade = document.createElement('input');
const selectTagsPrioridade = document.createElement('select');
const botao = document.createElement('button');

const arrayOpcoes = ['Altíssima', 'Alta', 'Normal', 'Baixa'];
arrayOpcoes.forEach((opcao, index) => {
    const optionTagPropriedade = document.createElement('option');
    optionTagPropriedade.value = index;
    optionTagPropriedade.textContent = opcao;
    selectTagsPrioridade.appendChild(optionTagPropriedade);
});
selectTagsPrioridade.required = true;

inputAtividade.id = 'input-atividade';
inputAtividade.type = 'text';
inputAtividade.placeholder = 'Informe a Atividade';
inputAtividade.required = true;
inputAtividade.classList.add('input-atividade');

inputDataAtividade.id = 'input-data-atividade';
inputDataAtividade.type = 'date';
inputDataAtividade.required = true;

botao.addEventListener('click', function (e) {
    e.preventDefault();
    const valorInputAtividade = inputAtividade.value;
    const valorInputDataAtividade = inputDataAtividade.value;
    const valorSelectTagsPrioridade = selectTagsPrioridade.value;
    const formularioEhValido = valorInputAtividade != '' && valorInputDataAtividade != '' && valorSelectTagsPrioridade != '';
    if (formularioEhValido) {
        const novaOpcao = new Opcao(valorInputAtividade, valorInputDataAtividade, valorSelectTagsPrioridade);
        listaAtividades.push(novaOpcao);
        salvarLista();
        renderizarItem(novaOpcao);
        limparValorInput();
    } else {
        alert('Preencher todos os campos');
    }
    console.log(listaAtividades);
});

botao.textContent = 'Adicionar';
botao.type = 'submit';

formulario.appendChild(inputAtividade);
formulario.appendChild(inputDataAtividade);
formulario.appendChild(selectTagsPrioridade);
formulario.appendChild(botao);

const divNovaAtividade = document.querySelector('.nova-atividade');
divNovaAtividade.appendChild(formulario);
const divListaAtividades = document.querySelector('.lista-atividades');

const ulAtividades = document.createElement('ul');
divListaAtividades.appendChild(ulAtividades);

listaAtividades.map(atividade => renderizarItem(atividade));

function limparValorInput() {
    inputAtividade.value = '';
    inputDataAtividade.value = '';
    selectTagsPrioridade.value = '';
}

function renderizarItem(item) {
    const liAtividade = document.createElement('li');
    liAtividade.id = `item-${item.id}`;
    const inputCheckbox = document.createElement('input');
    inputCheckbox.id = item.id;
    inputCheckbox.type = 'checkbox';
    const savedState = localStorage.getItem(item.id);
    if (savedState === 'true') {
        inputCheckbox.checked = true;
        item.concluido = true;
    }
    inputCheckbox.addEventListener('change', function (event) {
        item.concluido = event.target.checked;
        localStorage.setItem(item.id, item.concluido);
    });

    const labelCheckbox = document.createElement('label');
    labelCheckbox.setAttribute('for', item.id);
    labelCheckbox.innerText = item.atividade;
    const divCheckbox = document.createElement('div');
    divCheckbox.appendChild(inputCheckbox);
    divCheckbox.appendChild(labelCheckbox);
    liAtividade.appendChild(divCheckbox);

    //CRIAR PARAGRAFO TAG
    const paragrafoTag = document.createElement('p');
    const textoTag = arrayOpcoes[item.tagPrioridade];
    paragrafoTag.innerText = textoTag;

    liAtividade.appendChild(paragrafoTag);

    //CRIAR PARAGRAFO DATA
    const paragrafoData = document.createElement('p');
    paragrafoData.innerText = item.dataAtividade;
    liAtividade.appendChild(paragrafoData);

    //CRIAR PARAGRAFO BOTAO EDITAR
    const botaoEditar = document.createElement('button');
    botaoEditar.innerText = 'Editar';
    liAtividade.appendChild(botaoEditar);

    //CRIAR PARAGRAFO BOTAO EXCLUIR
    const botaoExcluir = document.createElement('button');
    botaoExcluir.innerText = 'Excluir';
    botaoExcluir.addEventListener('click', function (e) {
        excluirItemLista(item.id);
    });

    liAtividade.appendChild(botaoExcluir);

    ulAtividades.appendChild(liAtividade);
}

function salvarLista() {
    let listaString = JSON.stringify(listaAtividades);
    localStorage.setItem('lista', listaString);
}

function baixarLista() {
    let listaString = localStorage.getItem('lista');
    return JSON.parse(listaString) || [];
}

function excluirItemLista(id) {
    listaAtividades = listaAtividades.filter(atividade => atividade.id !== id);
    salvarLista();
    const itemRemovido = document.querySelector(`#item-${id}`);
    itemRemovido.remove();
}