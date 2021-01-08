<template>
    <v-container flat style="width:85%">
        
        <br>

       
        <v-card dark>
            <v-card-title>
                Clients
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
         
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="clients"
                :search="search"
            >
                <template v-slot:item.actions="{item}" >
                            <v-tooltip dark color="green darken-1" top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon @click="approveClient(item)" class="mr-2" color="green darken-1" small depressed  rounded v-bind="attrs" v-on="on">
                                        Approve
                                    </v-btn>
                                </template>
                                <span>Approve Client?</span>
                            </v-tooltip>
                </template>
            </v-data-table>
        </v-card>

        <ApproveClient ref="approveDialog" />
        

    </v-container>
</template>

<script>
import ApproveClient from './ApproveClient'

export default {

    data(){

        return{
            search: '',
            headers: [
                { 
                    text: 'Email', 
                    value: 'email',
                    align: "start"
                },
                {
                    text: 'FullName',
                    value: 'fullname',
                    align: "start"

                },
                {
                    text: 'Address',
                    value: 'address',
                    align: "start"

                },
                {
                    text: 'Telephone',
                    value: 'phone',
                    align: "start"
                },
                {
                    text: '',
                    sortable:false,
                    value: 'actions',
                    align: "start"
                },
               
            ],
        
        };
    },

    components:{
        ApproveClient,
    },
    
    methods:{
        approveClient(item){
            this.$refs.approveDialog.client = item;
            this.$refs.approveDialog.dialog = true;
        },
      
    },

    computed:{
        clients(){
            return this.$store.getters.getClients;
        }
    },

}
</script>

<style scoped>
.v-list {
margin-top: 32px;
padding: 0px;
border-radius: 2px;
}


</style>
