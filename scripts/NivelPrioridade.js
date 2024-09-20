class NivelPriodidade {

    constructor(nivel){
        this.nivel = nivel;
        this.fila = []; 
    }

    getProcesso(indice){
        return this.fila[indice];
    }

    getTamanhoFila(){
        return this.fila.length;
    }

    adicionaFila(processo){
        this.fila.push(processo);
    }

    retiraFila(){
        if(this.fila.length > 0){
            return this.fila.shift();
        } else {
            return -1;
        }
    }

    nivelVazio(){
        return (this.fila.length == 0);
    }

    retiraElemento(id){
        for (var i = 0; i <= this.getTamanhoFila()-1; i++){
            if (this.fila[i].getID() == id){
                var removedElement = this.fila.splice(i, 1)[0];
                console.log(removedElement);
                return removedElement;
            }
        }
        
        return -1;

    }

    getNivel(){
        for (let i = 0; i < this.fila.length; i++){
            console.log(this.fila[i].getID());
        }
    }

    atualizaNivel(indice){

        if(this.fila[indice].getUT() == false){
            this.fila[indice].sobePrioridade();
            console.log("a");
            return this.retiraElemento(this.fila[indice].getID());
        } else {
            this.fila[indice].invertUT();
            return -1;
        }
    }

    

}