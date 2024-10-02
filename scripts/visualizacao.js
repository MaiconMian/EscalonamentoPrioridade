const cores = ['#90ee90', '#32cd32','#00bfff','#1e90ff', '#9370db', '#800080'];

function atualizarVisualizacao() {
    
    var escalonador = document.getElementById('niveis');
    escalonador.innerHTML = '';

    for (var i = 0; i < filaPronto.getNumeroNiveis(); i++) {

        var nivel = filaPronto.getNivel(i);
        var nivelDiv = document.createElement('div');

        nivelDiv.className = 'nivel';
        nivelDiv.innerHTML = `<strong>Nível ${i+1}</strong><br>`;

        for(let j = 0; j < nivel.getTamanhoFila(); j++){

            processo = nivel.getProcesso(j);

            var processoDiv = document.createElement('div');
            processoDiv.className = 'processo';
            processoDiv.textContent = `P${processo.getID()} ${processo.getTamanho()}u.t`;
            processoDiv.style.backgroundColor = cores[processo.getID() % 6];
            nivelDiv.appendChild(processoDiv);
        }

        escalonador.appendChild(nivelDiv);
    }

    atualizaProcessoAtual();
    atualizaLinhadoTempo();

}

function atualizaProcessoAtual(){

    var atual = document.getElementById('processoExecutando');
    atual.innerHTML = '';

    if(processamentoatual != null){

        let processamentoatualDiv = document.createElement('div');
        processamentoatualDiv.className = 'processo';
        processamentoatualDiv.textContent = `${processamentoatual.getID()}`;
        processamentoatualDiv.style.backgroundColor = cores[processamentoatual.getID() % 6];
        atual.appendChild(processamentoatualDiv);

    }
}

function atualizaLinhadoTempo(){

    var linhaDoTempo = document.getElementById('linhaDoTempo');

    if(processamentoatual != null){

        let processamentoatualDiv = document.createElement('div');
        processamentoatualDiv.className = 'processo';
        processamentoatualDiv.textContent = `P${processamentoatual.getID()}`;
        processamentoatualDiv.style.backgroundColor = cores[processamentoatual.getID() % 6];
        linhaDoTempo.appendChild(processamentoatualDiv);
    }
}