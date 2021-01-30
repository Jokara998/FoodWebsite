<template>
    <v-container >
            <v-dialog color="dark" dark max-width="500px" v-model="dialog" persistent>

                <v-card dark style="border:1px solid #D3D3D3">
                    <v-card-title class="headline">
                        <div class="hidden-xs-only"> Delete <span style="color:green;display:inline"> {{worker.fullname}} </span> from System? </div>
                        <div class="hidden-sm-and-up"> <span style="color:green;display:inline"> {{worker.fullname}} </span> </div>

                    </v-card-title>
                    <v-card-text>
                        <div>This action will result in pernamently deleting <span style="color:green;display:inline"> {{worker.fullname}} </span> from the system.</div>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
        
                    <v-btn
                        color="green darken-1"
                        text
                        @click="confirm()"
                    >
                        <v-icon color="dark" left>
                            mdi-check-circle-outline
                        </v-icon>
                        <span class="hidden-xs-only"> Confirm </span>
                    </v-btn>

                     <v-btn
                        color="red darken-1"
                        text
                        @click="dialog = false"
                    >
                        <v-icon color="dark" left>
                            mdi-close-circle-outline
                        </v-icon>
                        <span class="hidden-xs-only"> Cancel </span>
                    </v-btn>


                    </v-card-actions>
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
            valid:false,
            worker:{}
        };
    },
    methods:{
       async confirm(){
            await axios.delete('/user/'+this.worker.id).then(async(response) => {
                console.log(response.data)
                await this.$store.dispatch("deleteWorker", response.data)
                this.dialog = false;

            })
       }
        
    }
}
</script>

<style scoped>

</style>