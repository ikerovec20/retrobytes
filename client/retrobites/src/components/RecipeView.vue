<template>
    <MainHeader></MainHeader>
    <v-container>
        <v-card>
            <v-row>
            <v-col>
                <v-card class="v-card mx-auto" style="height: 500px">
                <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" aspect-ratio="16/9" cover>
                    <v-card-title style="background-color: rgba(55, 55, 55, 0.53);">
                    <h2>Risotto Parmesano</h2>
                    <h4>Made by: Owner</h4>
                    <v-rating readonly hover density="comfortable"></v-rating>
                </v-card-title>
                <v-card-actions class="" style="background-color: rgba(55, 55, 55, 0.53);">
                    <v-btn variant="text" class="text-lg-right">Save recipe</v-btn>
                    <v-btn variant="text" class="text-lg-right">Rate</v-btn>
                    <v-rating hover density="comfortable"></v-rating>
                </v-card-actions>
                </v-img>
            </v-card>
            </v-col>
        </v-row>
    </v-card>
        <v-row>
            <v-container>
                <v-card style="padding: 12px;">
                    <v-row>
                        <v-col>
                            <v-text-field label="Category" disabled></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field label="Tags" disabled></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field label="Cooking time" disabled></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field label="Serves" disabled></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field label="Ingredients" disabled></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-textarea label="Description" disabled></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-textarea label="Instructions" disabled></v-textarea>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </v-row>
        <v-row>
            <v-col>
                <h2>Comments</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-textarea variant="outlined" label="New comment..."></v-textarea>
                <v-btn>Post</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card class="fill-height">
                <v-card-title>Goran</v-card-title>
                <v-card-text>
                    Great recipe!
                </v-card-text>
            </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card class="fill-height">
                <v-card-title>Goran</v-card-title>
                <v-card-text>
                    Great recipe!
                </v-card-text>
            </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card class="fill-height">
                <v-card-title>Goran</v-card-title>
                <v-card-text>
                    Great recipe! Made this yesterday!
                </v-card-text>
            </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card class="fill-height">
                <v-card-title>Goran</v-card-title>
                <v-card-text>
                    Great recipe!
                </v-card-text>
            </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
.desc {
    padding: 6px;
}

</style>