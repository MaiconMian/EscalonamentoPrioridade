const cores = ['#add8e6', '#87cefa', '#4682b4', '#4169e1', '#0000ff', '#00008b'];

function atualizarVisualizacao() {
    
    var escalonador = document.getElementById('niveis');
    escalonador.innerHTML = '';

    for (var i = 0; i < filaPronto.getNumeroNiveis(); i++) {

        var nivel = filaPronto.getNivel(i);
        var nivelDiv = document.createElement('div');

        nivelDiv.className = 'nivel';
        nivelDiv.innerHTML = `<p>nivel ${i+1}</p><br>`;

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

        let bloco = document.createElement('div');
        bloco.className = 'utProcesso';

        let unidadeDeTempo = document.createElement('div');
        unidadeDeTempo.className = 'ut';
        unidadeDeTempo.textContent = `${ut}u.t: `;
        bloco.appendChild(unidadeDeTempo);

        let processamentoatualDiv = document.createElement('div');
        processamentoatualDiv.className = 'processo';
        processamentoatualDiv.textContent = `P${processamentoatual.getID()}`;
        processamentoatualDiv.style.backgroundColor = cores[processamentoatual.getID() % 6];
        bloco.appendChild(processamentoatualDiv);

        linhaDoTempo.appendChild(bloco);
    }
}

function limpar(){
    ut = 0;
    var linhaDoTempo = document.getElementById('linhaDoTempo');
    linhaDoTempo.innerHTML = ''; 
}