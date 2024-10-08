var numeroProcessos = 0; // contador para o número de processos
var filaPronto = null; // fila de pronto 
var processamentoatual = null; // qual o processo atual
var numeroNiveis = 0 // numero de niveis
var ut = 0; // armazena a unidade de tempo atual
var parei = false; // valor para parar o processamento

/**
    * Função que inicia todo o processamento
    */
function iniciar() {

    var quantumMaximo = parseInt(document.getElementById('tamanhoQuantum').value, 10), // valor maximo de um quantum
        SubirPrioridade = parseInt(document.getElementById('SubirPrioridade').value, 10), // valor para subir de prioridade
        quantum = 0; // inicia a variavel quantum
        executando = false; // nenhum processo executando ainda
        
    var probabilidade = parseInt(document.getElementById('Probabilidade').value, 10), // probabilidade de gerar um processo aleatorio
        MaxTamanho = parseInt(document.getElementById('MaxTamanho').value, 10); // tamanho maximo que um processo aleatorio pode ter
    const checkbox = document.getElementById('meuCheckbox'), // checkbox
    isChecked = checkbox.checked; // verifica se o checkbox está precionado

    // desabilitando botão inicia
    desabilitaBotaoInicia();

    try {

        // faz as ferificações para erro
        if (!numeroNiveis || numeroNiveis == 0){ // não iniciou os níveis
            throw new Error("Você não iniciou os níveis");
        } else if (!quantumMaximo || quantumMaximo == 0){ // não setou o valor do quantum
            throw new Error("Você não iniciou o valor do quantum"); 
        } else if (!isChecked && filaPronto != null && filaPronto.getPrioridadeMaisAlta() == -1 && processamentoatual == null){ // não tem o que executar
            throw new Error("Não existirão processos a serem executados!"); 
        } else if (isChecked && (!probabilidade || !MaxTamanho || probabilidade < 1 || probabilidade > 100 || MaxTamanho < 1)){
            throw new Error("Verifique a probabilidade [1-100] e o tamanho maximo[1-*] para que o processo aleatorio seja gerado");
        } else if (!SubirPrioridade || SubirPrioridade < 1){ // não colocou o valor de u.t sem executar para subir prioridae
            throw new Error("Defina um tempo para que um processo suba de nível se não for executado");
        } else {
           // habilita botao de pare
           habilitaBotaoPare();
           // se deu tudo certo, executa
            processar(quantum, executando, quantumMaximo, probabilidade, MaxTamanho, SubirPrioridade, checkbox, isChecked, botaoInicia);
        }
    
    } catch(e){
       // tratamento de erros
       habilitaBotaoInicia();
       alert(e.message);
    }

}

/**
* Função que representa o processamento
* Cada iteração na função é considerada um u.t
*/
function processar(quantum, executando, quantumMaximo, probabilidade, MaxTamanho, SubirPrioridade, checkbox, isChecked, botaoInicia) {
    
    // aumenta um na unidade de tempo
    ut++;

    // verifica se clicou no botão de pare
    if (verificaParar()){

        desabilitaBotaoPare();
        habilitaBotaoLimpa();
        atualizarVisualizacao();
        return;
    }

    // se chegou ao fim do quantum ou não tem nenhum processo executando
    if (quantum >= quantumMaximo || !executando) {

        quantum = 0;
        
        // se o processo não chegou ao fim, retorna a fila
        if (processamentoatual != null && processamentoatual.getTamanho() != 0) {
             // volta prioridade anterior e zera o tempo sem executar
            processamentoatual.voltaPrioridade(); 
            processamentoatual.zeraTempoSemExecutar();
            filaPronto.getNivel(processamentoatual.getPrioridade()).adicionaFila(processamentoatual);
        }

        // se ainda existem processos
        if (filaPronto.getPrioridadeMaisAlta() != -1) {
            // pega o processo da prioridade mais alta
            processamentoatual = filaPronto.getNivel(filaPronto.getPrioridadeMaisAlta()).retiraFila();
            executando = true;

        } else if (!isChecked){ // para a execução apenas se não roda infinitamente por conta dos processos eleatórios

            // desabilita botão e reseta variáveis para fim de programa
            parei = false;
            desabilitaBotaoPare();
            habilitaBotaoLimpa();
            processamentoatual = null;
            executando = false;

            // atualiza vizualização e volta
            atualizarVisualizacao();
            return;

        } 

    }

    if (quantum < quantumMaximo && executando) {
        processamentoatual.decresceTamanho();
        // se o processo acabou a execução
        if (processamentoatual.getTamanho() == 0) {
            // não tem nada executando
            executando = false; 
        } 

        quantum++;
        
    } 


    // cria um proesso aleatorio
    criaProcessoAleatorio(isChecked, probabilidade, MaxTamanho);
    // atualiza o nivel de prioridade dos processos
    filaPronto.atualizaPrioridades(SubirPrioridade-1);
    // atualiza vizualização
    atualizarVisualizacao();
    // chama novamente a função
    setTimeout(() => {
        processar(quantum, executando, quantumMaximo, probabilidade, MaxTamanho, SubirPrioridade, checkbox, isChecked, botaoInicia);
    }, 2000); 

}

/**
* Função que é chamada para parar o processamento
*/
function parar(){
    parei = true;
}

/**
* Função que verifica se o botão de pare foi apertado
*/
function verificaParar(){
    if(parei){
        return true;
    } else {
        return false;
    }
}



