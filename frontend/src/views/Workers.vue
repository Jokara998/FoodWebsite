<template>
    <v-container flat style="width:85%">
        
        <br>

        <v-card dark>
            <v-card-title>
                Workers
            <v-btn class="hidden-md-and-up" @click="$refs.addWorkerDialog.dialog = true" color="dark" depressed elevation="2" outlined rounded style="margin-top:5px;margin-left:7px" >
                <v-icon dark medium>
                    mdi-briefcase-plus
                </v-icon>
                Add
            </v-btn>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>

            <v-btn class="hidden-sm-and-down" @click="$refs.addWorkerDialog.dialog = true" color="dark" depressed elevation="2" outlined rounded style="margin-top:5px;margin-left:15px" >
                <v-icon dark medium>
                    mdi-briefcase-plus
                </v-icon>
                Add Worker
            </v-btn>
            
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="workers"
                :search="search"
                :mobile-breakpoint="700"
            >

                <template v-slot:item.actions="{item}" >
                            <v-tooltip dark color="red darken-1" top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon @click="deleteWorker(item)" class="mr-2" color="red darken-1" small depressed  rounded v-bind="attrs" v-on="on">
                                        Remove
                                    </v-btn>
                                </template>
                                <span>Remove worker?</span>
                            </v-tooltip>
                </template>
            </v-data-table>
        </v-card>

        <AddWorker ref="addWorkerDialog" />
        <DeleteWorker ref="deleteWorkerDialog" />

    </v-container>
</template>

<script>
import AddWorker from '../components/Admin/AddWorker'
import DeleteWorker from '../components/Admin/DeleteWorker'


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
                    text: 'Actions',
                    sortable:false,
                    value: 'actions',
                    align: "start"
                },
               
            ],
        
        };
    },

    components:{
        AddWorker,
        DeleteWorker,
    },
  
    methods:{
      deleteWorker(item){
          this.$refs.deleteWorkerDialog.worker = item;
          this.$refs.deleteWorkerDialog.dialog = true;
      }
    },

    computed:{
        workers(){
           return this.$store.getters.getWorkers;
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
