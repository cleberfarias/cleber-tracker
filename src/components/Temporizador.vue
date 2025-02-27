<template>
    <div class="tw-flex tw-items-center tw-gap-3 tw-ml-4 tw-p-4 tw-rounded-md tw-shadow-md tw-w-full sm:tw-w-auto dark:tw-bg-[#333] dark:tw-text-white">
        <CronometroComponent :tempoEmSegundos="tempoEmSegundos" />
        <BotaoComponent class="tw-bg-blue-500 hover:tw-bg-blue-600" 
        @clicado="iniciarTarefa" 
        :desabilitado="cronometroRodando" 
        icone="fas fa-play" 
        texto="Iniciar" />
        <BotaoComponent class="tw-bg-red-500 hover:tw-bg-red-600 disabled:tw-opacity-50" 
        @clicado="pararTarefa" 
        :desabilitado="!cronometroRodando" 
        icone="fas fa-stop" 
        texto="Parar" />
        <BotaoComponent class="tw-bg-gray-500 hover:tw-bg-gray-600 disabled:tw-opacity-50" 
        @clicado="resetarTarefa"
        icone="fas fa-redo" 
        texto="Resetar" />
        <select v-model="modoContagem" class="tw-bg-white tw-text-black tw-px-2 tw-rounded">
            <option value="progressivo">Progressivo</option>
            <option value="regressivo">Regressivo</option>
        </select>
        <input v-if="modoContagem !== 'livre'"
             type="number"
             v-model="tempoEmSegundos"
             class="tw-p-2 tw-border tw-rounded tw-w-16 tw-text-black"
             placeholder="Segundos" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'; 
import CronometroComponent from './Cronometro.vue'; 
import BotaoComponent from './Botao.vue'; 

export default defineComponent({
    name: 'TemporizadorComponent', 
    emits: ['aoTeporizadorFinalizado'], 
    components: {
        CronometroComponent, 
        BotaoComponent 
    },
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0, 
            cronometroRodando: false,
            modoContagem: 'progressivo'
        }
    },
    methods: {
        iniciarTarefa() {
            if (!this.cronometroRodando) { 
                this.cronometroRodando = true; 
                this.cronometro = setInterval(() => { 
                    if (this.modoContagem === 'progressivo') {
                        this.tempoEmSegundos++; 
                    } else if (this.modoContagem === 'regressivo') {
                        if (this.tempoEmSegundos > 0) {
                            this.tempoEmSegundos--; 
                        } else {
                            this.pararTarefa();
                        }
                    }
                }, 1000);
            }
        },
        pararTarefa() {
            if (this.cronometroRodando) { 
                clearInterval(this.cronometro); 
                this.cronometroRodando = false; 
                this.$emit('aoTeporizadorFinalizado', this.tempoEmSegundos); 
                this.tempoEmSegundos = 0; 
            }
        },
        resetarTarefa() {
            clearInterval(this.cronometro);
            this.cronometroRodando = false;
            this.tempoEmSegundos = 0;
        }
    }
});
</script>
