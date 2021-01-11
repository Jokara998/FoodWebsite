<template>
    <v-container >
            <v-dialog color="dark" dark max-width="500px" v-model="dialog" persistent>

                <v-card>
                    <v-card-title class="headline">
                        <div> Approve registration of <span style="color:green;display:inline"> {{client.fullname}} </span> </div>
                    </v-card-title>
                    <v-card-text>
                        <div>This action will result in approving registration of <span style="color:green;display:inline"> {{client.fullname}}.</span> </div>
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
    </v-container>
</template>

<script>
import axios from '../../axios/index'

export default {

    data(){

        return{
            dialog:false,
            valid:false,
            client:{}
        };
    },
    methods:{
        async confirm(){
            await axios.patch('/user/'+this.client.id,{
                "approved":true,
            }).then(async(response) => {
                console.log(response.data)
                await this.$store.dispatch("deleteClient", response.data)
                this.dialog = false;

            })
       }
        
    }
}
</script>

<style scoped>

</style>