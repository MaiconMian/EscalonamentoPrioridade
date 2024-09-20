class Processo {

    constructor(prioridade, tamanho, id){
        this.prioridade = prioridade; 
        this.prioridadeatual = prioridade; 

        this.tamanho = tamanho; 
        this.id = id; 
        this.executei = false;
    }

    getID(){
        return this.id;
    }

    getPrioridade(){
        return this.prioridade;
    }

    getPrioridadeAtual(){
        return this.prioridadeatual;
    }

    getTamanho(){
        return this.tamanho;
    }

    decresceTamanho() {
        this.tamanho--;
    } 

    sobePrioridade() {
        if(this.prioridadeatual < 10){
            this.prioridadeatual++;
            return 1;
        } else {
            return 0;
        }
    } 

    descePrioridade() {
        if(this.prioridade >= 0){
            this.prioridade--;
            return 1;
        } else {
            return 0;
        }
    } 

    getUT(){
        return this.executei;
    }

    invertUT(){
        this.executei = !this.executei;
    }

    trueUT(){
        this.executei = true;
    }


    getPrioridadeAtual(){
        return this.prioridadeatual;
    }

    voltaPrioridade(){
        this.prioridadeatual = this.prioridade;
    }

    sobePrioridade(){
        this.prioridadeatual++;
    }

}