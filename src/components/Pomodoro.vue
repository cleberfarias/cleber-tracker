<template>
    <div class="tw-w-full tw-mt-6 tw-px-2">
        <h2 class="tw-text-white tw-text-lg tw-font-bold tw-mb-3 tw-text-center">Pomodoro</h2>

        <!-- Exibição do Tempo -->
        <div class="tw-relative tw-mb-4">
            <div class="tw-mx-auto tw-w-40 tw-h-40 tw-rounded-full tw-flex tw-items-center tw-justify-center sm:tw-w-32 sm:tw-h-32" :style="{
                background: `conic-gradient(
              ${mode === 'work' ? '#ef4444' : '#3b82f6'} ${calculateProgress()}%, 
              transparent ${calculateProgress()}% 100%
            )`
            }">
                <div
                    class="tw-bg-[#0d3b66] dark:tw-bg-[#333] tw-w-36 tw-h-36 tw-rounded-full tw-flex tw-flex-col tw-items-center tw-justify-center sm:tw-w-28 sm:tw-h-28">
                    <div class="tw-text-2xl tw-font-bold tw-text-white sm:tw-text-xl">{{ formatTime(timeLeft) }}</div>
                    <div class="tw-text-xs tw-text-white tw-opacity-80 tw-capitalize sm:tw-text-xxs">
                        {{ mode === 'work' ? '' : 'pausa' }} {{ isActive ? 'em andamento' : 'pausado' }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Controles -->
        <div class="tw-flex tw-justify-center tw-gap-2 tw-mb-4">
            <button @click="isActive ? pauseTimer() : startTimer()"
                class="tw-px-3 tw-py-1 tw-bg-blue-500 tw-text-white tw-rounded tw-text-sm hover:tw-bg-blue-600 tw-transition sm:tw-px-2 sm:tw-py-0.5 sm:tw-text-xs">
                {{ isActive ? 'Pausar' : 'Iniciar' }}
            </button>
            <button @click="resetTimer"
                class="tw-px-3 tw-py-1 tw-bg-gray-500 tw-text-white tw-rounded tw-text-sm hover:tw-bg-gray-600 tw-transition sm:tw-px-2 sm:tw-py-0.5 sm:tw-text-xs">
                Resetar
            </button>
        </div>

        <!-- Configurações -->
        <div class="tw-mt-4 tw-text-white">
            <div class="tw-mb-2">
                <div class="tw-flex tw-justify-between tw-text-xs tw-mb-1">
                    <span>Trabalho: {{ workDuration }}min</span>
                </div>
                <input type="range" :value="workDuration" @input="handleWorkDurationChange" min="5" max="60" step="5"
                    class="tw-w-full tw-h-1 tw-bg-gray-600 tw-rounded-lg tw-appearance-none cursor-pointer" />
            </div>

            <div class="tw-mb-2">
                <div class="tw-flex tw-justify-between tw-text-xs tw-mb-1">
                    <span>Pausa: {{ breakDuration }}min</span>
                </div>
                <input type="range" :value="breakDuration" @input="handleBreakDurationChange" min="1" max="30" step="1"
                    class="tw-w-full tw-h-1 tw-bg-gray-600 tw-rounded-lg tw-appearance-none cursor-pointer" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, watch } from 'vue';

export default defineComponent({
    name: 'PomodoroComponent',
    setup() {
        const mode = ref<"work" | "break">("work");
        const isActive = ref(false);
        const timeLeft = ref(25 * 60);

        const workDuration = ref(25);
        const breakDuration = ref(5);

        let interval: number | null = null;

        const speak = (text: string) => {
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'pt-BR'; 
                speechSynthesis.speak(utterance);
            } else {
                console.warn("Seu navegador não suporta Speech Synthesis API.");
            }
        };

        onBeforeUnmount(() => {
            if (interval) {
                clearInterval(interval);
            }
        });

        const formatTime = (seconds: number): string => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        };

        const calculateProgress = (): number => {
            const totalSeconds = mode.value === "work" ? workDuration.value * 60 : breakDuration.value * 60;
            return ((totalSeconds - timeLeft.value) / totalSeconds) * 100;
        };

        const startTimer = () => {
            isActive.value = true;

            if (interval) clearInterval(interval);

            interval = setInterval(() => {
                if (timeLeft.value > 0) {
                    timeLeft.value--;
                } else {
                    if (mode.value === "work") {
                        mode.value = "break";
                        timeLeft.value = breakDuration.value * 60;
                        speak(`Pausa de ${breakDuration.value} minutos.`);
                    } else {
                        mode.value = "work";
                        timeLeft.value = workDuration.value * 60;
                        speak("Retornando ao Pomodoro.");
                    }
                }
            }, 1000) as unknown as number;
        };

        const pauseTimer = () => {
            isActive.value = false;
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        };

        const resetTimer = () => {
            pauseTimer();
            timeLeft.value = mode.value === "work" ? workDuration.value * 60 : breakDuration.value * 60;
        };

        const handleWorkDurationChange = (event: Event) => {
            const newDuration = parseInt((event.target as HTMLInputElement).value);
            workDuration.value = newDuration;
            if (mode.value === "work" && !isActive.value) {
                timeLeft.value = newDuration * 60;
            }
        };

        const handleBreakDurationChange = (event: Event) => {
            const newDuration = parseInt((event.target as HTMLInputElement).value);
            breakDuration.value = newDuration;
            if (mode.value === "break" && !isActive.value) {
                timeLeft.value = newDuration * 60;
            }
        };

        watch(mode, (newMode) => {
            if (!isActive.value) {
                timeLeft.value = newMode === "work" ? workDuration.value * 60 : breakDuration.value * 60;
            }
        });

        return {
            mode,
            isActive,
            timeLeft,
            workDuration,
            breakDuration,
            formatTime,
            calculateProgress,
            startTimer,
            pauseTimer,
            resetTimer,
            handleWorkDurationChange,
            handleBreakDurationChange
        };
    }
});
</script>
