
var numeroProcessos = 0; // contador para o número de processos
var filaPronto = null; // fila de pronto 
var processamentoatual = null; // qual o processo atual
var numeroNiveis = 0 // numero de niveis

function inicia() {

    var quantum = 0, // armazena o valor do quantum atual
        executando = false, // verifica se tem algum processo sendo executado
        ut = 0; // armazena a unidade de tempo atual
    var quantumMaximo = parseInt(document.getElementById('tamanhoQuantum').value, 10), // valor maximo de um quantum
        probabilidade = parseInt(document.getElementById('Probabilidade').value, 10), // probabilidade de gerar um processo aleatorio
        MaxTamanho = parseInt(document.getElementById('MaxTamanho').value, 10), // tamanho maximo que um processo aleatorio pode ter
        SubirPrioridade = parseInt(document.getElementById('SubirPrioridade').value, 10); // qual a u.t que um processo terá que ter ser executar para subir de nível
    const checkbox = document.getElementById('meuCheckbox'), // checkbox
        isChecked = checkbox.checked, // verifica se o checkbox está precionado
        botaoInicia = document.getElementById('botaoInicia'); // botão de iniciar
    botaoInicia.disabled = true; // se entrou aqui, desabilita para não poder entrar mais

    try {

        // faz as ferificações para erro
        if (numeroNiveis == 0){ // não iniciou os níveis
            throw new Error("Você não iniciou os níveis");
        } else if (!quantumMaximo || quantumMaximo == 0){ // não setou o valor do quantum
            throw new Error("Você não iniciou o valor do quantum"); 
        } else if (!isChecked && filaPronto == null){ // não tem o que executar
            throw new Error("Não existirão processos a serem executados!"); 
        } else if (isChecked && (!probabilidade || !MaxTamanho || probabilidade < 1 || probabilidade > 100 || MaxTamanho < 1)){
            throw new Error("Verifique a probabilidade [1-100] e o tamanho maximo[1-*] para que o processo aleatorio seja gerado");
        } else if (!SubirPrioridade || SubirPrioridade < 1){ // não colocou o valor de u.t sem executar para subir prioridae
            throw new Error("Defina um tempo para que um processo suba de nível se não for executado");
        } else {
            // se deu tudo certo, executa
            processar();
        }
    
    } catch(e){
        // tratamento de erro
        botaoInicia.disabled = false;
        alert(e.message);
    }

    function processar() {
    
        criaProcessoAleatorio(isChecked, probabilidade, MaxTamanho);
        ut++;

        if (quantum < quantumMaximo && executando) {
            processamentoatual.decresceTamanho();
            if (processamentoatual.getTamanho() == 0) {
                executando = false; 
            } 
            quantum++;
        } 

        filaPronto.atualizaPrioridades(SubirPrioridade-1);
    
        if (quantum == quantumMaximo || !executando) {

            quantum = 0;
    
            if (processamentoatual != null && processamentoatual.getTamanho() != 0) {
                filaPronto.getNivel(processamentoatual.getPrioridade()).adicionaFila(processamentoatual);
            }
    
            if (filaPronto.getPrioridadeMaisAlta() != -1) {
                processamentoatual = filaPronto.getNivel(filaPronto.getPrioridadeMaisAlta()).retiraFila();
                processamentoatual.voltaPrioridade(); 
                processamentoatual.zeraTempoSemExecutar();
                executando = true;
            } else {
                processamentoatual = null;
                botaoInicia.disabled = false;
                atualizarVisualizacao();
                return; 
            }
        }

        atualizarVisualizacao();
        setTimeout(processar, 2000); 
    }
    

}
