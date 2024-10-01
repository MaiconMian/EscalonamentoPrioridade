function criarNiveis(){

    numeroNiveis = parseInt(document.getElementById('numeroNiveis').value, 10);

    try {
        if(numeroNiveis < 1 || numeroNiveis > 10){
            throw new Error("O número de níveis é invalido, deve ser entre 1 e 10");
        } 
        filaPronto = new FilaPronto(numeroNiveis);
        filaPronto.iniciaNiveis();
        atualizarVisualizacao();
    } catch (e){
        alert(e.message);
    }

}

function criarProcesso() {

    try {
        if (filaPronto == null){
            throw new Error("Você não inicinou os níveis!");
        }

        var tamanhoprocesso = parseInt(document.getElementById('tamanhoprocesso').value, 10);
        var prioridadeprocesso = parseInt(document.getElementById('prioridadeprocesso').value, 10) - 1;

        if(tamanhoprocesso <= 0){
            throw new Error("Tamanho do processo inválido");
        }

        if (prioridadeprocesso < 0 || prioridadeprocesso > numeroNiveis-1){
            throw new Error("Prioridade do processo invlálida!");
        }
    
        numeroProcessos++;

        var processoatual = new Processo(prioridadeprocesso, tamanhoprocesso, numeroProcessos);

        filaPronto.getNivel(prioridadeprocesso).adicionaFila(processoatual);
        atualizarVisualizacao();
        
    } catch (e) {
        alert(e.message);
    }
    
}

function criaProcessoAleatorio(isChecked, probabilidade, maxTamanho){
    if (isChecked){

        var probabilidadeGerada = Math.random() * (100 - 0) + 0;

        if(probabilidadeGerada < probabilidade){
            numeroProcessos++;

            let prioridade = Math.floor(Math.random() * numeroNiveis); 
            let tamanho = Math.floor(Math.random() * maxTamanho) + 1; 
            var novoprocesso = new Processo(prioridade, tamanho, numeroProcessos);
            filaPronto.getNivel(prioridade).adicionaFila(novoprocesso);
        }

    }
}

