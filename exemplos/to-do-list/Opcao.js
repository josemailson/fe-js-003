export class Opcao {
    id;
    atividade;
    dataAtividade;
    tagPrioridade;
    concluido;
    constructor(atividade, dataAtividade, tagPrioridade, concluido) {
        this.id = Date.now().toString();
        this.atividade = atividade;
        this.dataAtividade = dataAtividade;
        this.tagPrioridade = tagPrioridade;
        this.concluido = concluido;
    }

    toggleCompletion() {
        this.concluido = !this.concluido;
      }
}

// module.exports = Opcao;