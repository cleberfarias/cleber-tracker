<template>
    <BoxComponent>
        <div class="tw-flex tw-text-zinc-950 tw-font-bold tw-flex-col tw-w-3/4 tw-pr-2 dark:tw-text-white">
            <!-- Conteúdo da coluna da esquerda -->
            {{tarefa.descricao||'Tarefa sem descrição'}}
        </div>
        <div class="tw-flex tw-flex-col tw-w-1/2 tw-pl-2">
            <!-- Conteúdo da coluna da direita -->
            <CronometroComponent :tempoEmSegundos="tarefa.duracacaoEmSegundos" />
        </div>
        <div class="tw-p-4">
          <button @click="editarTarefa" >
            <i class="fa-solid fa-pen"></i>
          </button>
        </div>

        <div class="tw-p-4">
            <button @click="deletarTarefa">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>

    </BoxComponent>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CronometroComponent from './Cronometro.vue';
import ITarefas from '../interfaces/ITarefas';
import BoxComponent from './Box.vue';

export default defineComponent({
    name: 'TarefaComponent',
    components: {
        CronometroComponent,
        BoxComponent
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefas>,
            required: true
        }
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
        editarTarefa() {
            const novaDescricao = prompt("Editar tarefa:", this.tarefa.descricao);
            if(novaDescricao !== null) {
                this.$emit('editarTarefa', {id: this.tarefa.id, descricao: novaDescricao});
            }
            console.log('Editar tarefa');
        },
        deletarTarefa() {
            if (confirm("Deseja realmente deletar a tarefa?")) {
                console.log("🗑 Chamando deletarTarefa no componente filho, ID:", this.tarefa.id);
                this.$emit('aoExcluirTarefa', this.tarefa.id);
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