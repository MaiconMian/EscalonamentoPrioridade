class FilaPronto {

    constructor(numero_niveis){
        this.numero_niveis = numero_niveis;
        this.nivel = []
    }

    getNumeroNiveis(){
        return this.numero_niveis;
    }

    getPrioridadeMaisAlta(){
        for(let i = (this.numero_niveis-1); i >= 0; i--){
            if (!this.nivel[i].nivelVazio()){
                return i;
            }
        }
        return -1;
    }

    atualizaTempo(){
        for (let i = (this.numero_niveis-2); i >= 0 ; i--){
            for(let j = 0; j < this.nivel[i].getTamanhoFila();j++){
                var processo = this.nivel[i].atualizaNivel(j);
                console.log(processo);
                if(processo != -1){
                    console.log("o processo: ", processo.getID(), " foi atualizado para o nivel: ", i+1);
                    this.nivel[i+1].adicionaFila(processo);
                    j = j-1;
                } 
            }
        }
    }


    iniciaNiveis(){
        for (let i = 0; i < this.numero_niveis; i++){
            this.nivel[i] = new NivelPriodidade(i);
        }
    }

    getNivel(i){
        return this.nivel[i];
    }

    mostraNiveis(){
        for (let i = 0; i < this.numero_niveis; i++){
            console.log("nivel: " + i);
            this.nivel[i].getNivel();
        }
    }

}