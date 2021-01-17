<template>

<v-container>
  <v-row>
    <v-col cols="12">
      <v-card
        color="dark"
        dark
        elevation="8"
        outlined

      >
          <v-card-title>   
              <v-icon left dark medium>
                  mdi-information-outline
              </v-icon>
              Please wait
          </v-card-title>
          <v-card-text>
              <v-progress-linear
                  indeterminate
                  color="#FAFAFA"
                  class="mb-0"
              ></v-progress-linear>
              </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>

</template>

<script>
export default {
    data(){
      return{
        
      }
    }
}
</script>

<style scoped>

</style>