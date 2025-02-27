<template>
    <!-- Card principal -->
    
    <div
        class="tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-between tw-w-full tw-bg-white tw-p-6 tw-shadow-md tw-rounded-md dark:tw-bg-[#333] dark:tw-text-white">
        <input type="text"
            class="tw-flex-1 tw-p-2 tw-border tw-border-gray-300 tw-rounded-md tw-w-full dark:tw-bg-[#333] dark:tw-text-white"
            placeholder="Iniciar os estudos em Vue.JS"
            v-model="descricao" />
        <!-- Div para agrupar o temporizador e os botões -->
        <div class="tw-flex tw-items-center tw-gap-3 tw-ml-4 ">
            
            <TemporizadorComponent @aoTeporizadorFinalizado="finalizar" />
            
        </div>
    </div>

    <!-- Fim Card principal -->
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import TemporizadorComponent from './Temporizador.vue';


export default defineComponent({
    
    name: 'FormularioTarefa',
    
    components: {
        TemporizadorComponent
    },
    
    emits: ['aoSalvarTarefa'],
    
    data() {
        return {
            
            descricao: ''
        }
    },
    
    methods: {
        
        finalizar(tempoEmSegundos: number): void {
            
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoEmSegundos,
                descricao: this.descricao,
            });
            
            this.descricao = '';
        }
    }
});
</script>