function atualizarVisualizacao() {
    
    var escalonador = document.getElementById('niveis');
    escalonador.innerHTML = '';

    for (var i = 0; i < filaPronto.getNumeroNiveis(); i++) {

        var nivel = filaPronto.getNivel(i);
        var nivelDiv = document.createElement('div');

        nivelDiv.className = 'nivel';
        nivelDiv.innerHTML = `<strong>Nível ${i+1}:</strong><br>`;

        for(let j = 0; j < nivel.getTamanhoFila(); j++){

            processo = nivel.getProcesso(j);

            var processoDiv = document.createElement('div');
            processoDiv.className = 'processo';
            processoDiv.textContent = `ID: ${processo.getID()} (Tamanho: ${processo.getTamanho()})`;
            nivelDiv.appendChild(processoDiv);
        }

        escalonador.appendChild(nivelDiv);
    }

}

function atualizaProcessoAtual(){

    var atual = document.getElementById('processoExecutando');
    atual.innerHTML = '';

    if(processamentoatual != null){

        var processamentoatualDiv = document.createElement('div');
        processamentoatualDiv.className = 'processo';
        console.log("func: id: ", processamentoatual.getID(), " de nivel: ", processamentoatual.getPrioridadeAtual(), " executado.");
        processamentoatualDiv.textContent = `ID: ${processamentoatual.getID()} (Tamanho: ${processamentoatual.getTamanho()})`;

        atual.appendChild(processamentoatualDiv);

    }
}

function atualizaLinhadoTempo(){

    var linhaDoTempo = document.getElementById('linhaDoTempo');

    if(processamentoatual != null){

        var processamentoatualDiv = document.createElement('div');
        processamentoatualDiv.className = 'processo';
        processamentoatualDiv.textContent = `ID: ${processamentoatual.getID()}`;

        linhaDoTempo.appendChild(processamentoatualDiv);
    }
}