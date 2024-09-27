var numeroProcessos = 0;
var filaPronto;
var processamentoatual = null;
var numeroNiveis = 0


function criarNiveis(){

    numeroNiveis = parseInt(document.getElementById('numeroNiveis').value, 10);

    if(numeroNiveis < 1 || numeroNiveis > 10){
        alert("O número de níveis é invalido, deve ser entre 1 e 10");
    } else {
        filaPronto = new FilaPronto(numeroNiveis);
        filaPronto.iniciaNiveis();
        atualizarVisualizacao();
    }

}

function criarProcesso() {

    try {

        if (filaPronto == null){
            throw new Error("Você não inicinou os níveis!");
        }

        var tamanhoprocesso = parseInt(document.getElementById('tamanhoprocesso').value, 10);
        var prioridadeprocesso = parseInt(document.getElementById('prioridadeprocesso').value, 10) - 1;

        if(tamanhoprocesso < 0){
            throw new Error("Tamanho do processo inválido");
        }

        if (prioridadeprocesso < 0 || prioridadeprocesso > numeroNiveis-1){
            throw new Error("Prioridade do processo invlálida!");
        }
    
        numeroProcessos++;

        var processoatual = new Processo(prioridadeprocesso, tamanhoprocesso, numeroProcessos);

        filaPronto.getNivel(prioridadeprocesso).adicionaFila(processoatual);
        filaPronto.mostraNiveis();
        atualizarVisualizacao();
        
    } catch (e) {
        alert(e.message);
    }
    
}

function criaProcessoAleatorio(isChecked){
    if (isChecked){

        var probabilidade = Math.random() * (100 - 0) + 0;
        
        console.log("probabilidade gerada:", probabilidade);

        if(probabilidade < 30){
            numeroProcessos++;
            let prioridade = Math.floor(Math.random() * numeroNiveis); 
            let tamanho = Math.floor(Math.random() * 100) + 1; 
            console.log("processo:", prioridade, " ", tamanho);
            var novoprocesso = new Processo(prioridade, tamanho, numeroProcessos);
            filaPronto.getNivel(prioridade).adicionaFila(novoprocesso);
        }

    }
}

function inicia() {

    var quantum = 0;
    var executando = false;
    var tempoSemExecutar = 0;
    var ut = 0;
    var quantumID = parseInt(document.getElementById('tamanhoQuantum').value, 10);
    const checkbox = document.getElementById('meuCheckbox');
    const isChecked = checkbox.checked;

    processar(); 

    function processar() {

        criaProcessoAleatorio(isChecked);
        ut++;

        // Se o quantum não tiver finalizado e o processo está executando
        if (quantum < quantumID && executando) {

            console.log("id: ", processamentoatual.getID(), " de nivel: ", processamentoatual.getPrioridadeAtual(), " executado.");
            processamentoatual.decresceTamanho();
    
            if (processamentoatual.getTamanho() == 0) {
                executando = false; 
            } else {
                quantum++;
            }
        } 

        if (tempoSemExecutar == 10) {
            tempoSemExecutar = 0;
            filaPronto.atualizaTempo();
        } else {
            tempoSemExecutar++;
        }
    
        if (quantum == quantumID || !executando) {

            quantum = 0;
    
            if (processamentoatual != null && processamentoatual.getTamanho() != 0) {
                filaPronto.getNivel(processamentoatual.getPrioridade()).adicionaFila(processamentoatual);
            }
    
            if (filaPronto.getPrioridadeMaisAlta() != -1) {
                processamentoatual = filaPronto.getNivel(filaPronto.getPrioridadeMaisAlta()).retiraFila();
                processamentoatual.voltaPrioridade();
                processamentoatual.trueUT();
                executando = true;
                console.log("o processo: ", processamentoatual.getID(), " será o próximo na execução.");
            } else {
                return; // Finaliza a execução se não há mais processos
            }
        }

        atualizaProcessoAtual();
        atualizarVisualizacao();
        atualizaLinhadoTempo()
        setTimeout(processar, 1000); // Chama a função novamente após o intervalo
    }

}
