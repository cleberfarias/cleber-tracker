<template>
    <!-- Card principal -->
          <!-- Linha com input, timer e botões -->
        <div class="tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-between tw-w-full tw-bg-white tw-p-6 tw-shadow-md tw-rounded-md dark:tw-bg-[#333] dark:tw-text-white">
            <!-- tw-flex: Define o layout da div como flexível (flexbox) -->
            <!-- tw-items-center: Alinha os itens no centro ao longo do eixo transversal -->
            <!-- tw-justify-between: Distribui os itens com espaço entre eles -->
            <!-- tw-w-full: Define a largura da div para 100% do contêiner pai -->
            <!-- tw-bg-white: Define a cor de fundo da div como branca -->
            <!-- tw-p-4: Aplica um padding (espaçamento interno) de 1rem (16px) em todos os lados -->
            <!-- tw-shadow-md: Aplica uma sombra média à div -->
            <!-- tw-rounded-md: Aplica bordas arredondadas médias à div -->
            <!-- Input -->
            <!-- Input de texto para a descrição da tarefa -->
            <input type="text" class="tw-flex-1 tw-p-2 tw-border tw-border-gray-300 tw-rounded-md tw-w-full dark:tw-bg-[#333] dark:tw-text-white"
                placeholder="Iniciar os estudos em Vue.JS" v-model="descricao" /><!-- v-model: Cria uma ligação bidirecional entre o valor do input e a propriedade 'descricao' no componente Vue -->
            <!-- Div para agrupar o temporizador e os botões -->
            <div class="tw-flex tw-items-center tw-gap-3 tw-ml-4 ">
                <!-- Componente Temporizador -->
                <TemporizadorComponent @aoTeporizadorFinalizado="finalizar" /> <!--Essa linha está utilizando o componente TemporizadorComponent e escutando um evento personalizado chamado aoTeporizadorFinalizado. Quando esse evento é emitido pelo TemporizadorComponent, a função finalizar é chamada no componente pai.-->
            </div>
        </div>

    <!-- Fim Card principal -->
</template>

<script lang="ts">
// Importa a função defineComponent do Vue
import { defineComponent } from 'vue';
// Importa o componente TemporizadorComponent do arquivo Temporizador.vue
import TemporizadorComponent from './Temporizador.vue';

// Define e exporta o componente FormularioTarefa
export default defineComponent({
    // Nome do componente
    name: 'FormularioTarefa',
    // Declaração dos componentes que serão utilizados dentro deste componente
    components: {
        TemporizadorComponent
    },
    // Declaração dos eventos que este componente pode emitir
    emits: ['aoSalvarTarefa'],
    // Função que retorna os dados reativos do componente
    data() {
        return {
            // Declaração da propriedade reativa 'descricao' inicializada como uma string vazia
            descricao: ''
        }
    },
    // Declaração dos métodos do componente
    methods: {
        // Método 'finalizar' que recebe um parâmetro 'tempoEmSegundos' do tipo number e não retorna nada (void)
        finalizar(tempoEmSegundos: number): void {
            // Emite o evento 'aoSalvarTarefa' com um objeto contendo 'duracacaoEmSegundos' e 'descricao'
            this.$emit('aoSalvarTarefa', {
                duracacaoEmSegundos: tempoEmSegundos,
                descricao: this.descricao,
            });
            // Reseta a propriedade 'descricao' para uma string vazia
            this.descricao = '';
        }
    }
});
</script>