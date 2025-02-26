<template>

    <div class="tw-flex tw-items-center tw-gap-3 tw-ml-4 tw-p-4 tw-rounded-md tw-shadow-md tw-w-full sm:tw-w-auto dark:tw-bg-[#333] dark:tw-text-white">

        <CronometroComponent :tempoEmSegundos="tempoEmSegundos" />
        <BotaoComponent class="tw-bg-blue-500 hover:tw-bg-blue-600" @clicado="iniciarTarefa" :desabilitado="cronometroRodando" icone="fas fa-play" texto="Iniciar" />
        <BotaoComponent class="tw-bg-red-500 hover:tw-bg-red-600 disabled:tw-opacity-50" @clicado="pararTarefa" :desabilitado="!cronometroRodando" icone="fas fa-stop" texto="Parar" />

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
            
            cronometroRodando: false 
            
        }
    },
    methods: {
        iniciarTarefa() {
            if (!this.cronometroRodando) { 
                
                this.cronometroRodando = true; 
                
                this.cronometro = setInterval(() => { 
                    
                    this.tempoEmSegundos++; 
                    
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
        }
    }
});
</script>