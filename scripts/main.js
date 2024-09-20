var numeroProcessos = 0;
var filaPronto;

function criarProcesso() {
    var tamanhoprocesso = parseInt(document.getElementById('tamanhoprocesso').value, 10);
    var prioridadeprocesso = parseInt(document.getElementById('prioridadeprocesso').value, 10) - 1;
    
    numeroProcessos++;

    var processoatual = new Processo(prioridadeprocesso, tamanhoprocesso, numeroProcessos);

    if (!filaPronto) {
        filaPronto = new FilaPronto(3);
        filaPronto.iniciaNiveis();
    }

    filaPronto.getNivel(prioridadeprocesso).adicionaFila(processoatual);
    filaPronto.mostraNiveis();
    atualizarVisualizacao();
}



function inicia() {

    var quantum = 0;
    var executando = false;
    var processamentoatual = null;
    var tempoSemExecutar = 0;
    var ut = 0;

    processar(); 

    function processar() {
    
        console.log(ut, " nessa unidade: ");
        ut++;
        // Se o quantum não tiver finalizado e o processo está executando
        if (quantum < 3 && executando) {
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
    
        if (quantum == 3 || !executando) {
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
    
        atualizarVisualizacao();
        setTimeout(processar, 1000); // Chama a função novamente após o intervalo
    }

}
