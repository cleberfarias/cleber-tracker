<template>
    <div>
        <button @click="toggleSidebar" class="tw-fixed tw-top-4 tw-left-4 tw-z-50 md:tw-hidden">
            {{ sidebarVisible ? 'Esconder' : 'Mostrar' }} Barra
        </button>
        <aside
            v-if="sidebarVisible"
            class="tw-bg-[#0d3b66] tw-fixed tw-left-0 tw-top-0 tw-h-screen tw-w-64 tw-flex tw-flex-col tw-items-center tw-justify-start tw-p-6 tw-z-50 dark:tw-bg-[#333] dark:tw-text-white sm:tw-w-48 md:tw-w-64">
            <h1>
                <img src="../assets/logo.webp" alt="Logo" class="tw-p-2 tw-w-32 tw-h-auto tw-rounded sm:tw-w-24 md:tw-w-32" />
            </h1>

            <button @click="toggleDarkMode"
                class="tw-text-white tw-border-color-white tw-bg-blue-500 tw-rounded-full tw-p-2 tw-mt-4 tw-w-full tw-text-center tw-font-bold tw-transition-all tw-shadow-md hover:tw-bg-blue-600">
                {{ textoBotao }}
            </button>
            <PomodoroComponent />  
        </aside>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PomodoroComponent from './Pomodoro.vue';

export default defineComponent({
    name: 'BarraLateral',
    components: {
        PomodoroComponent
    },
    emits: ['darkModeToggled'],
    data() {
        return {
            isDarkMode: false,
            sidebarVisible: true
        }
    },
    computed: {
        textoBotao() {
            if (this.isDarkMode) {
                return 'Desativar modo escuro';
            }
            return 'Ativar modo escuro';
        }
    },
    methods: {
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode;
            this.$emit('darkModeToggled', this.isDarkMode);
        },
        toggleSidebar() {
            this.sidebarVisible = !this.sidebarVisible;
        }
    },
});
</script>
