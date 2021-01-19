<template>
    <v-container >
            <v-dialog color="dark" dark max-width="400px" v-model="dialog" persistent>

                <v-card>
                    <v-card-title class="headline">
                        <div> Edit Cart Item </div>
                    </v-card-title>

                    <v-card-text>
                          <v-form v-model="valid" ref="form" lazy-validation>
                            <v-container>
                                <v-row>

                                    <v-col
                                    cols="2"
                                    md="4"
                                    >
                                        <v-text-field
                                            
                                            outlined
                                            v-model="selectedAmount"
                                            :rules="amountRules"
                                            required
                                            class="text-center"
                                            label="Amount"
                                        ></v-text-field>

                                    </v-col> 

                                    </v-row>
                                    <v-spacer></v-spacer>

                                    <v-row>
                                   
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
                                                                       
                                    </v-row>                                                                                          
                            </v-container>
                        </v-form>
                    </v-card-text>
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
import Loader from "../Loaders/Loader"
export default {
    data(){
        return{
            item:{},
            index:0,
            dialog:false,
            dialogLoading:false,
            selectedAmount:"",
            valid:false,
            amountRules: [
                v => !!v || 'Required',
                v => v!=null || 'Required',
                v => v!="" || 'Requiredd',
                v => v!=null && String(v).length <= 2 || 'Invalid.',
                v => !isNaN(v) || 'Invalid.'
            ],
       
        }
    },
    components:{
        Loader
    },

    methods:{
        async confirm(){
            this.dialogLoading = true;
            this.item.amount = this.selectedAmount
            let payload = {item: this.item, index:this.index}
            await this.$store.dispatch("editMixItem", payload)
            this.dialogLoading = false;
            this.dialog = false
        }
    }
    
}
</script>

<style scoped>

</style>