<template>

    <div class="tw-flex tw-items-center tw-gap-3 tw-ml-4 tw-p-4 tw-rounded-md tw-shadow-md tw-w-full sm:tw-w-auto dark:tw-bg-[#333] dark:tw-text-white">

        <CronometroComponent :tempoEmSegundos="tempoEmSegundos" />
        <BotaoComponent class="tw-bg-blue-500 hover:tw-bg-blue-600" @clicado="iniciarTarefa" :desabilitado="cronometroRodando" icone="fas fa-play" texto="Iniciar" />
        <BotaoComponent class="tw-bg-red-500 hover:tw-bg-red-600 disabled:tw-opacity-50" @clicado="pararTarefa" :desabilitado="!cronometroRodando" icone="fas fa-stop" texto="Parar" />

    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'; 
// Importa a função defineComponent do Vue para definir um componente Vue.
import CronometroComponent from './Cronometro.vue'; 
// Importa o componente Cronometro de um arquivo local.
import BotaoComponent from './Botao.vue'; 
// Importa o componente Botao de um arquivo local.

export default defineComponent({
    name: 'TemporizadorComponent', 
    // Define o nome do componente como 'TemporizadorComponent'.
    emits: ['aoTeporizadorFinalizado'], 
    // Declara que o componente emite um evento chamado 'aoTeporizadorFinalizado'.
    components: {
        CronometroComponent, 
        // Registra o componente Cronometro para uso dentro deste componente.
        BotaoComponent 
        // Registra o componente Botao para uso dentro deste componente.
    },
    data() {
        return {
            tempoEmSegundos: 0,
             // Inicializa a variável tempoEmSegundos com 0.
            cronometro: 0, 
            // Inicializa a variável cronometro com 0.
            cronometroRodando: false 
            // Inicializa a variável cronometroRodando com false.
        }
    },
    methods: {
        iniciarTarefa() {
            if (!this.cronometroRodando) { 
                // Verifica se o cronômetro não está rodando.
                this.cronometroRodando = true; 
                // Define cronometroRodando como true para indicar que o cronômetro está rodando.
                this.cronometro = setInterval(() => { 
                    // Inicia um intervalo que executa a função a cada segundo.
                    this.tempoEmSegundos++; 
                    // Incrementa a variável tempoEmSegundos em 1 a cada segundo.
                }, 1000);
            }
        },
        pararTarefa() {
            if (this.cronometroRodando) { 
                // Verifica se o cronômetro está rodando.
                clearInterval(this.cronometro); 
                // Para o intervalo do cronômetro.
                this.cronometroRodando = false; 
                // Define cronometroRodando como false para indicar que o cronômetro parou.
                this.$emit('aoTeporizadorFinalizado', this.tempoEmSegundos); 
                // Emite o evento 'aoTeporizadorFinalizado' com o valor de tempoEmSegundos.
                this.tempoEmSegundos = 0; 
                // Reseta a variável tempoEmSegundos para 0.
            }
        }
    }
});
</script>