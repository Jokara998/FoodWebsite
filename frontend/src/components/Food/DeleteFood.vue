<template>
    <v-container >
            <v-dialog color="dark" dark max-width="750px" v-model="dialog" persistent>

                <v-card dark style="border:1px solid #D3D3D3">
                    <v-card-title class="headline">
                        <div> Delete <span style="color:green;display:inline"> {{editFood.name}} </span> from Menu? </div>
                    </v-card-title>
                    <v-card-text>
                        <div>This action will result in pernamently deleting <span style="color:green;display:inline"> {{editFood.name}} </span> from the menu.</div>
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
               <Loader/>
            </v-dialog>
    </v-container>
</template>

<script>
import axios from '../../axios/index'
import Loader from '../Loaders/Loader'

export default {

    data(){

        return{
            dialog:false,
            dialogLoading:false,
            valid:false,
            food:"Food"
        };
    },
    computed:{
        editFood(){
            return this.$store.getters.getEditFood;
        }
    },
    components: {
     Loader,
    },
    methods:{
       async confirm(){
            this.dialogLoading = true
            await axios.delete('/food/'+this.editFood.id).then(async (response) => {
                console.log(response.data)
                await this.$store.dispatch("setDeleteFood")
                this.dialogLoading = false
                this.dialog = false

            }).catch(()=>{
                this.dialogLoading = false
            }) 
       }
        
    }
}
</script>

<style scoped>

</style>