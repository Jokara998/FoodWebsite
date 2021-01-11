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
                <Loader />
            </v-dialog>
    </v-container>
</template>

<script>
import axios from '../../axios/index'
import Loader from "../Loaders/Loader"

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
    components:{
        Loader,
    },
    methods:{
       async confirm(){
            this.dialogLoading = true
            await axios.patch('/food/'+this.editFood.id,{
               active:false
            }).then(async (response) => {
                // namesti u storu
                await this.$store.dispatch("setActiveStatus", response.data)
                this.dialogLoading = false
                this.dialog = false
            })
       }
        
    }
}
</script>

<style scoped>

</style>