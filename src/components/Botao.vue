<template>
    <button 
        class="tw-px-4 tw-py-2 tw-bg-blue-500 tw-text-white tw-rounded tw-transition tw-opacity-100 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
        @click="clicado" 
        :disabled="desabilitado"
    >
        <span>{{ texto }}</span>
        <i v-if="icone" :class="['ml-2', icone]"></i>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'BotaoComponent',
    emits: ['clicado'],
    props: {
        desabilitado: {
            type: Boolean,
            
        },
        icone:{
            type: String,
            required: true,
        },
        texto: {
            type: String,
            required: true
        }
    },
    methods: {
        clicado() :void{
            this.$emit('clicado');
        }
    }
});

</script>