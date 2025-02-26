<template>
  <!-- Define o layout principal da aplicação -->
  <main class="tw-flex tw-min-h-screen tw-bg-white dark:tw-bg-[#262626]" :class="{ 'tw-dark-theme': isDarkMode }">
    <BarraLateral @darkModeToggled="trocarTema" />
    <!-- Conteúdo Principal -->
    <div class="tw-flex-1 tw-ml-64 tw-p-6 tw-min-h-screen">
      <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
      <!-- Lista de tarefas -->
      <div class="tw-flex tw-flex-col tw-gap-4 tw-mt-4  ">
        <TarefaComponent v-for="tarefa in tarefas" :key="tarefa.id" :tarefa="tarefa" @editarTarefa="atualizarTarefa"
          @aoExcluirTarefa="deletarTarefa" />
        <BoxComponent v-if="listaEstaVazia">
          Você não está muito produtivo hoje, hein?
        </BoxComponent>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormularioTarefa from './components/Formulario.vue';
import TarefaComponent from './components/Tarefa.vue';
import ITarefas from './interfaces/ITarefas';
import BoxComponent from './components/Box.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    FormularioTarefa,
    TarefaComponent,
    BoxComponent
  },
  data() {
    return {
      tarefas: [] as ITarefas[],

      isDarkMode: false
    }
  },

  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    }
  },
  methods: {
    async atualizarTarefa(tarefaAtualizada: ITarefas) {
      try {

        const response = await fetch(`http://127.0.0.1:8000/tasks/${tarefaAtualizada.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            description: tarefaAtualizada.descricao,
            
          })
        });

        if (!response.ok) throw new Error('Erro ao atualizar a tarefa');

        this.tarefas = this.tarefas.map(tarefa =>
          tarefa.id === tarefaAtualizada.id ? tarefaAtualizada : tarefa
        );
      } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
      }
    },

    async deletarTarefa(taskId: string) {
      try {
        console.log("🔴 Enviando solicitação DELETE para ID:", taskId);

        // 🔹 Remove chaves `{}` caso estejam presentes no ID
        const formattedId = taskId.replace(/[{}]/g, "");

        const response = await fetch(`http://127.0.0.1:8000/tasks/${formattedId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          console.error("❌ Erro ao deletar no backend:", response.statusText);
          return;
        }

        console.log("✅ Tarefa excluída com sucesso");

        // 🔹 Remove a tarefa da lista no frontend corretamente
        this.tarefas = this.tarefas.filter(tarefa => String(tarefa.id) !== formattedId);

        // 🔹 Força a reatividade do Vue para atualizar a interface
        this.tarefas = [...this.tarefas];

      } catch (error) {
        console.error("❌ Erro ao excluir tarefa:", error);
      }
    },

    salvarTarefa(tarefa: ITarefas) {
      const taskPayload = {
        description: tarefa.descricao,
        duration_in_seconds: tarefa.duracacaoEmSegundos
      };

      fetch('http://127.0.0.1:8000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskPayload)
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(err => {
              throw new Error(`Erro ${response.status}: ${JSON.stringify(err)}`);
            });
          }
          return response.json();
        })
        .then(data => {
          alert("Cadastrado com sucesso!!");

          const tarefaFormatada: ITarefas = {
            id: data.id,
            descricao: data.description,
            duracacaoEmSegundos: data.duration_in_seconds
          };

          this.tarefas.push(tarefaFormatada);
        })
        .catch(error => {
          alert('❌ Erro ao salvar tarefa: ' + error);
        });
    },

    async fetchTarefas() {
      try {
        const response = await fetch('http://127.0.0.1:8000/tasks');
        const data = await response.json();

        console.log("🚀 Dados recebidos do backend:", data);

        this.tarefas = data.map((tarefa: any) => ({
          id: tarefa.id,
          descricao: tarefa.description,
          duracacaoEmSegundos: tarefa.duration_in_seconds
        }));

      } catch (error) {
        console.error('❌ Erro ao buscar tarefas:', error);
      }
    },

    trocarTema(isDarkMode: boolean) {
      this.isDarkMode = isDarkMode;
      if (isDarkMode) {
        document.documentElement.classList.add('tw-dark-theme');
      } else {
        document.documentElement.classList.remove('tw-dark-theme');
      }
    },
  },
  mounted() {
    console.log("🔄 Chamando fetchTarefas() ao montar o componente...");
    this.fetchTarefas();
  }
});
</script>

<style>
.tw-dark-theme {
  @apply tw-bg-red-950 tw-text-white;
}
</style>
