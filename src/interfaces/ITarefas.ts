// Exporta a interface ITarefas como padrão do módulo
export default interface ITarefas {
    id?: number;
       // Define uma propriedade descricao do tipo string
    descricao: string;

     // Define uma propriedade duracaoEmSegundos do tipo número
    duracaoEmSegundos: number;
}