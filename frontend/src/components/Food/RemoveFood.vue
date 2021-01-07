<template>
    <v-container >
            <v-dialog color="dark" dark max-width="750px" v-model="dialog" persistent>

                <v-card>
                    <v-card-title class="headline">
                        <div> Remove <span style="color:green;display:inline"> {{editFood.name}} </span> from Menu? </div>
                    </v-card-title>
                    <v-card-text>
                        <div>This action will result in temporary removing <span style="color:green;display:inline"> {{editFood.name}} </span> from the menu and customers will not be able to see it or order it.</div>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
        
                    <v-btn
                        color="green darken-1"
                        text
                        @click="confirm()"
                        :loading="dialogLoading"
                        :disabled="dialogLoading"
                    >
                        <v-icon color="dark" left>
                            mdi-check-circle-outline
                        </v-icon>
                        Confirm
                    </v-btn>

                     <v-btn
                        color="red darken-1"
                        text
                        @click="dialog = false"
                    >
                        <v-icon color="dark" left>
                            mdi-close-circle-outline
                        </v-icon>
                        Cancel
                    </v-btn>


                    </v-card-actions>
                </v-card>

            </v-dialog>

            <v-dialog
            v-model="dialogLoading"
            hide-overlay
            persistent
            width="450"
            min-height="350"
            >
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
                        Request Proccessing...
                        <v-progress-linear
                            indeterminate
                            color="#FAFAFA"
                            class="mb-0"
                        ></v-progress-linear>
                        </v-card-text>
                </v-card>
            </v-dialog>
    </v-container>
</template>

<script>
import axios from '../../axios/index'

export default {

    data(){

        return{
            dialog:false,
            dialogLoading:false,
        };
    },
    computed:{
        editFood(){
            return this.$store.getters.getEditFood;
        }
    },
    watch: {
      dialogLoading (val) {
        if (!val) return

        setTimeout(() => (this.dialog = false, this.dialogLoading = false), 4000)
      },
    },
    methods:{
       confirm(){
            this.dialogLoading = true
            axios.patch('/food/'+this.editFood.id,{
               active:false
            }).then((response) => {
                // namesti u storu
                this.$store.dispatch("setActiveStatus", response.data)
            })
       }
        
    }
}
</script>

<style scoped>

</style>