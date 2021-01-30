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
                    <v-btn text @click="showCoupons(item)" color="green darken-1" small depressed  rounded>
                        <v-icon left>
                            mdi-label-percent-outline
                        </v-icon>
                        <span class="hidden-sm-and-down">Show Coupons</span>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>

        <ShowCoupon ref="showCoupon" v-show="boolShowOne"/>
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
import ShowCoupon from "../components/Admin/Coupons/ShowClientCoupons"
import Loader from "../components/Loaders/Loader"
export default {

    data(){

        return{
            boolShowOne:false,
            dialogLoading:false,
            search: '',
            headers: [
                { 
                    text: 'Email', 
                    value: 'email',
                    align: "start"
                },
                {
                    text: 'Name',
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
                    text: 'Orders',
                    value: 'orders',
                    align: "start"
                },
                {
                    text: 'Actions',
                    sortable:false,
                    value: 'actions',
                    align: "start",
                    width:"50px"
                },
               
            ],
        
        };
    },

    mounted(){
        this.boolShowOne = false;
        this.$forceUpdate();
    },

    components:{
        ShowCoupon,
        Loader
    },
    
    methods:{
        async showCoupons(item){
            this.dialogLoading = true
            await this.$store.dispatch("setCoupons", item.email)
            this.dialogLoading = false;
            this.$refs.showCoupon.client = item;
            this.boolShowOne = true;
            this.$forceUpdate()         
        }
      
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
