<template>
    <v-container>
         <v-dialog color="dark" dark max-width="500px" v-model="dialog" persistent>

                <v-card dark style="border:1px solid #D3D3D3">
                    <v-card-title class="headline">
                        <div>Order for <span style="display:inline;color:green"> {{order.fullname}} </span> </div>
                    </v-card-title>
                    <v-card-text>
                       <v-container>
                           <v-flex
                                v-for="(item) in this.order.ordered.food" :key="item.id" 
                            >
                            
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>Name</v-list-item-title>
                                        <v-list-item-subtitle>  
                                            <span style="color:#95c17e;font-size:16px"> {{item.name}} </span>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    
                                    <v-list-item-content>
                                        <v-list-item-title>Amount[Availability]</v-list-item-title>
                                        <v-list-item-subtitle>  
                                            <span style="color:#95c17e;font-size:16px"> {{item.amount}} [{{item.availability}}] </span>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>                                    
                                </v-list-item>
                            </v-flex>

                            <v-flex
                                v-for="(item) in this.order.ordered.mix" :key="item.id" 
                            >
                            
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>Name</v-list-item-title>
                                        <v-list-item-subtitle>  
                                            <span style="color:#95c17e;font-size:16px"> {{item.name}} </span>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    
                                    <v-list-item-content>
                                        <v-list-item-title>Amount[Availability]</v-list-item-title>
                                        <v-list-item-subtitle>  
                                            <span style="color:#95c17e;font-size:16px"> {{item.amount}} [mix] </span>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    
                                </v-list-item>
                            </v-flex>
                       </v-container>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>

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
export default {
    data(){
        return{

            dialog:false,
            order:{
                ordered:{
                    food:[],
                    mix:[]
                }
            }
        }
    },
   
    methods:{   
        close(){
            this.dialog = false; 
        }
    },

   
}
</script>

<style scoped>

</style>