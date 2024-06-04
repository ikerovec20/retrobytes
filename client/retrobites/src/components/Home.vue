<template>

</template>

<script setup lang="ts">
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

router.replace("/login");
</script>