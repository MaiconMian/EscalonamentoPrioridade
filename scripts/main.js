
var numeroProcessos = 0; // contador para o número de processos
var filaPronto = null; // fila de pronto 
var processamentoatual = null; // qual o processo atual
var numeroNiveis = 0 // numero de niveis

/**
    * Função que inicia todo o processamento
    */
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
        if (!numeroNiveis || numeroNiveis == 0){ // não iniciou os níveis
            throw new Error("Você não iniciou os níveis");
        } else if (!quantumMaximo || quantumMaximo == 0){ // não setou o valor do quantum
            throw new Error("Você não iniciou o valor do quantum"); 
        } else if (!isChecked && filaPronto != null && filaPronto.getPrioridadeMaisAlta() == -1){ // não tem o que executar
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

    /**
    * Função que representa o processamento
    * Cada iteração na função é considerada um u.t
    */
    function processar() {
    
        ut++;

        // verifica se existem quantuns a serem processados no processo e se tem algum processo executando
        if (quantum < quantumMaximo && executando) {
            processamentoatual.decresceTamanho();
            // se o processo acabou a execução
            if (processamentoatual.getTamanho() == 0) {
                // não tem nada executando
                executando = false; 
            } 
            quantum++;
        } 

        // se chegou ao fim do quantum ou não tem nenhum processo executando
        if (quantum == quantumMaximo || !executando) {

            quantum = 0;
            
            // se o processo não chegou ao fim, retorna a fila
            if (processamentoatual != null && processamentoatual.getTamanho() != 0) {
                filaPronto.getNivel(processamentoatual.getPrioridade()).adicionaFila(processamentoatual);
            }
    
            // se ainda existem processos
            if (filaPronto.getPrioridadeMaisAlta() != -1) {
                // pega o processo da prioridade mais alta
                processamentoatual = filaPronto.getNivel(filaPronto.getPrioridadeMaisAlta()).retiraFila();
                // volta prioridade anterior e zera o tempo sem executar
                processamentoatual.voltaPrioridade(); 
                processamentoatual.zeraTempoSemExecutar();
                executando = true;
            } else if(!isChecked){
                // caso não existam mais processos, libera o botão e volta
                processamentoatual = null;
                botaoInicia.disabled = false;
                atualizarVisualizacao();
                return; 
            }
        }

        // cria um proesso aleatorio
        criaProcessoAleatorio(isChecked, probabilidade, MaxTamanho);
        // atualiza o nivel de prioridade dos processos
        filaPronto.atualizaPrioridades(SubirPrioridade-1);
        // atualiza vizualização
        atualizarVisualizacao();
        // chama novamente a função
        setTimeout(processar, 2000); 
    }
    

}
