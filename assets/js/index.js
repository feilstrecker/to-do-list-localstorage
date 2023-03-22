const cadBtn = document.querySelector('#button');
const input = document.querySelector('#input');
const ul = document.querySelector('.lista');

cadBtn.addEventListener('click', function() {
    if (input.value === '') return;
    cadTarefa(input.value);
    input.value = '';
    input.focus();
});

function cadTarefa(value) {
    const li = document.createElement('li');
    li.innerText = (value + ' ');
    ul.appendChild(li);
    criaBtnApagar(li);
    salvarTarefas();
}

function criaBtnApagar(li) {
    const button = document.createElement('button');
    button.setAttribute('class', 'apagar');
    button.innerText = 'Apagar';
    li.appendChild(button);
}

function salvarTarefas() {
    const listaTarefas = [];
    let tarefas = ul.querySelectorAll('li');
    for (let tarefa of tarefas) {
        tarefa = tarefa.innerText.replace(' Apagar', '');
        listaTarefas.push(tarefa);
    const listaJson = JSON.stringify(listaTarefas);
    localStorage.setItem('tarefas', listaJson);
    }

}

function carregarTarefas() {
    let listaTarefas = localStorage.getItem('tarefas');
    listaTarefas = JSON.parse(listaTarefas);
    for (tarefa of listaTarefas) {
        cadTarefa(tarefa);
    }
}

document.addEventListener('click', function(e) {
    const el = e.target;
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});

carregarTarefas();