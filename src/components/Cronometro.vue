<template>
    <section>
        <strong class="tw-text-xl tw-ml-4 dark:tw-text-white">
            {{ tempoFormatado }}
        </strong>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CronometroComponent',
    props: {
        tempoEmSegundos: {
            type: Number,
            default: 0
        }
    },
    computed: {
        tempoFormatado(): string {
            const segundosAbsolutos = Math.abs(this.tempoEmSegundos);
            const formato = new Date(segundosAbsolutos * 1000).toISOString().substr(11, 8);
            
            return this.tempoEmSegundos < 0 ? `-${formato}` : formato;
        }
    }
});
</script>
