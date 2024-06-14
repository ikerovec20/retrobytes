<template>
  <v-app>
    <v-main>
      <v-container>
          <RouterView></RouterView>
      </v-container>
      <Footer></Footer>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Footer from './components/Footer.vue';
import Login from './components/Login.vue';

  //
</script>

<style>
* {
  font-family: "Inter Tight", sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
}
</style>