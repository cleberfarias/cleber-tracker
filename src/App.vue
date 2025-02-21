<template>
  <!-- Define o layout principal da aplicação -->
  <main class="tw-flex tw-min-h-screen tw-bg-white dark:tw-bg-[#262626]" :class="{ 'tw-dark-theme': isDarkMode }">
    <!-- Adicione a classe 'dark' aqui -->
    <!-- Componente da barra lateral -->
    <BarraLateral @darkModeToggled="trocarTema" />

    <!-- Conteúdo Principal -->
    <div class="tw-flex-1 tw-ml-64 tw-p-6 tw-min-h-screen">
      <!-- Componente do formulário de tarefa, com um evento personalizado para salvar a tarefa -->
      <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
      <!-- Lista de tarefas -->
      <div class="tw-flex tw-flex-col tw-gap-4 tw-mt-4  ">
        <!-- Componente de tarefa, iterando sobre a lista de tarefas -->
        <TerefaComponent v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />

        <BoxComponent v-if="listaEstaVazia">
          Você não está muito produtivo hoje, hein?
        </BoxComponent>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'; // Importa a função defineComponent do Vue
import BarraLateral from './components/BarraLateral.vue'; // Importa o componente BarraLateral
import FormularioTarefa from './components/Formulario.vue'; // Importa o componente FormularioTarefa
import TerefaComponent from './components/Tarefa.vue'; // Importa o componente TerefaComponent
import ITarefas from './interfaces/ITarefas'; // Importa a interface ITarefas
import BoxComponent from './components/Box.vue'; // Importa o componente BoxComponent

export default defineComponent({
  name: 'App', // Define o nome do componente
  components: {
    BarraLateral, // Registra o componente BarraLateral
    FormularioTarefa, // Registra o componente FormularioTarefa
    TerefaComponent, // Registra o componente TerefaComponent
    BoxComponent // Registra o componente BoxComponent
  },
  data() {
    return {
      tarefas: [] as ITarefas[],
      // Define a propriedade tarefas como um array vazio do tipo ITarefas
      isDarkMode: false
    }
  },

  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    }
  },
  methods: {

    salvarTarefa(tarefa: ITarefas) {
      //O método salvarTarefa recebe um parâmetro tarefa do tipo ITarefas.
      //  Ele adiciona essa tarefa ao array tarefas usando o método push, que insere o novo item no final do array.
      this.tarefas.push(tarefa);
    },
    // Método para adicionar uma nova tarefa ao array de tarefas
    trocarTema(isDarkMode: boolean) {
      this.isDarkMode = isDarkMode;

      if (isDarkMode) {
        document.documentElement.classList.add('tw-dark-theme');
      } else {
        document.documentElement.classList.remove('tw-dark-theme');
      }
    }
  }
});
</script>

<style>
.tw-dark-theme {
  @apply tw-bg-red-950 tw-text-white;
}
</style>