<template>
    <MainHeader></MainHeader>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                <v-card-title>
                    <v-icon class="text-h1" style="vertical-align: middle" icon="mdi-account"></v-icon><span style="vertical-align: middle" class="vertical-align-middle text-h2 text-center">User</span>
                </v-card-title>
                <v-card-text>
                    <p class="text-h4">Profile Statistics</p>
                    <div class="text-h6" style="vertical-align: middle;">
                        <p><v-icon icon="mdi-star"></v-icon> Average recipe ratings:</p>
                        <p><v-icon icon="mdi-heart"></v-icon> Total recipe saves:</p>
                        <p><v-icon icon="mdi-heart-circle"></v-icon> Average saves per recipe:</p>
                    </div>
                </v-card-text>
            </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <h1>Recipes made by User</h1>
            </v-col>
        </v-row>
        <v-row>
            
        </v-row>
        <v-row>
            <v-col>
                <h1>Recipes saved by User</h1>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';


const router = useRouter();
const id = router.currentRoute.value.params.id;
</script>