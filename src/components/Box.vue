<template>

    <div
        class="tw-flex tw-items-center tw-justify-between tw-w-full tw-bg-slate-500 tw-p-4 tw-shadow-md tw-rounded-md dark:tw-bg-[#414141] dark:tw-text-white">
        <slot></slot>

    </div>


</template>


<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BoxComponent',
})



</script>