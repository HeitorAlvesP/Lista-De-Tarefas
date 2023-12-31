const inputTarefa = document.querySelector('.input-tarefa');
const bntTarefa = document.querySelector('.bnt-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi(){
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('Keypress', function(e){
    if (e.KeyCode === 13){
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
})

function criaBotaoApagar(li){
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar')
    botaoApagar.setAttribute('title', 'Apagar')
    li.appendChild(botaoApagar);
}

function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaTarefa(textoInput){
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefa();
}

bntTarefa.addEventListener('click', function(){
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
})

document.addEventListener('click', function(e){
    const el = e.target;
    if (el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefa();
    }
})

function salvarTarefa(){
    const liTarefas = tarefas.querySelectorAll('li')
    console.log(liTarefas)
    const listaDeTarefas = []

    for (let tarefas of liTarefas){
        let tarefaTexto = tarefas.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJson = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJson);
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    console.log(listaDeTarefas);

    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}
adicionaTarefasSalvas();