<template>
    <div
        class="tw-flex tw-items-center tw-justify-between tw-w-full tw-text-white tw-bg-slate-500 tw-p-4 tw-shadow-md tw-rounded-md dark:tw-bg-[#414141] dark:tw-text-white sm:tw-p-2 sm:tw-text-sm">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BoxComponent',
})
</script>
