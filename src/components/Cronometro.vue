<template>
    <section>
        <strong class="tw-text-xl tw-ml-4 dark:tw-text-white">{{ tempoEmMinutos }}</strong>
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
        tempoEmMinutos(): string {
            return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11, 8);
        }
    },

});
</script>