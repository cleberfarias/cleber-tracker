<template>
  <!-- Define o layout principal da aplicação -->
  <main class="tw-flex tw-flex-col md:tw-flex-row tw-min-h-screen tw-bg-white dark:tw-bg-[#262626]" :class="{ 'tw-dark-theme': isDarkMode }">
    <button @click="toggleSidebar" class="md:tw-hidden tw-p-4 tw-bg-blue-500 tw-text-white tw-fixed tw-top-0 tw-left-0">
      Menu
    </button>
    <BarraLateral v-if="isSidebarVisible" @darkModeToggled="trocarTema" class="tw-fixed md:tw-static tw-z-50" />
    <!-- Conteúdo Principal -->
    <div :class="{'tw-ml-0': !isSidebarVisible, 'md:tw-ml-64': isSidebarVisible}" class="tw-flex-1 tw-p-6 tw-min-h-screen">
      <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
      <!-- Lista de tarefas -->
      <div class="tw-flex tw-flex-col tw-gap-4 tw-mt-4">
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

const API_BASE_URL = "https://api-tracker-cleber.onrender.com";

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
      isDarkMode: false,
      isSidebarVisible: false
    };
  },

  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    }
  },

  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },

    async atualizarTarefa(tarefaAtualizada: ITarefas) {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks/${tarefaAtualizada.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            descricao: tarefaAtualizada.descricao,
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

        const formattedId = taskId.replace(/[{}]/g, "");

        const response = await fetch(`${API_BASE_URL}/tasks/${formattedId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          console.error("❌ Erro ao deletar no backend:", response.statusText);
          return;
        }

        console.log("✅ Tarefa excluída com sucesso");

        this.tarefas = this.tarefas.filter(tarefa => String(tarefa.id) !== formattedId);
      } catch (error) {
        console.error("❌ Erro ao excluir tarefa:", error);
      }
    },

    salvarTarefa(tarefa: ITarefas) {
      const taskPayload = {
        descricao: tarefa.descricao,
        duracaoEmSegundos: tarefa.duracaoEmSegundos
      };

      fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
            descricao: data.descricao,
            duracaoEmSegundos: data.duracaoEmSegundos
          };

          this.tarefas.push(tarefaFormatada);
        })
        .catch(error => {
          alert('❌ Erro ao salvar tarefa: ' + error);
        });
    },

    async fetchTarefas() {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks`);
        if (!response.ok) throw new Error('Erro ao buscar tarefas');
        
        const data = await response.json();
        console.log("🚀 Dados recebidos do backend:", data);

        this.tarefas = data.map((tarefa: any) => ({
          id: tarefa.id,
          descricao: tarefa.descricao,
          duracaoEmSegundos: tarefa.duracaoEmSegundos
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
    }
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
