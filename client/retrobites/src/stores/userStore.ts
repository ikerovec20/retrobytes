import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore('user', () => {
    const username = ref("");
    const token = ref("");

    const getUsername = computed(() => username.value);
    const getToken = computed(() => token.value);

    const setUsername = (name) => {username.value = name;}
    const setToken = (token) => {token.value = token;}

    return {username, token, getUsername, setUsername, getToken, setToken};
}, );