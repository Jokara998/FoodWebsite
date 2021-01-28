<template>
      <v-container flat style="width:85%">
        
        <br>

        <v-card dark v-if="this.orders.length == 0" >
            <v-card-title style="justify-content:center">
                No Order Requests.
            </v-card-title>
         
        </v-card>

        <v-card dark v-if="this.orders.length > 0">
            <v-card-title>
                Orders Requests
            <v-spacer></v-spacer>
           
            </v-card-title>
            <v-data-table
                dense
                :headers="headers"
                :items="orders"
            >

                <template v-slot:item.date="{item}">                            
                    <span>{{formatDate(item.date)}}</span>                        
                </template>

                <template v-slot:item.price="{item}">                            
                    <span>{{item.price}} €</span>                        
                </template>
              
                <template v-slot:item.actions="{item}">
                            <v-col cols="2" style="height:30px;">
                                <v-tooltip dark color="#4db01b" top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn text @click="accept(item)" color="#4db01b" small depressed rounded v-bind="attrs" v-on="on">
                                            <v-icon left>
                                                mdi-truck-check-outline
                                            </v-icon>
                                            Accept Order
                                        </v-btn>
                                    </template>
                                    <span>Accept order and make it ready for deliverer?</span>
                                </v-tooltip>
                            </v-col>
                            <v-col cols="2"  style="height:30px;">
                                <v-tooltip dark color="#cc222c" top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn text @click="reject(item)" color="#cc222c" small depressed rounded v-bind="attrs" v-on="on">
                                        <v-icon left >
                                            mdi-close-circle-outline
                                            </v-icon>
                                            Reject Order
                                        </v-btn>
                                    </template>
                                    <span>Reject order?</span>
                                </v-tooltip>
                            </v-col>
                            <v-col cols="2"  style="height:50px;">
                                <v-tooltip dark color="primary" top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn text @click="show(item)" color="primary" small depressed  rounded v-bind="attrs" v-on="on">
                                            <v-icon left>
                                                mdi-information-outline
                                            </v-icon>
                                            Show Order
                                        </v-btn>
                                    </template>
                                    <span>Show Order information?</span>
                                </v-tooltip>
                            </v-col>
                </template>
            </v-data-table>
        </v-card>

        <AcceptOrder ref="accept" />
        <RejectOrder ref="reject" />
        <ShowOrder ref="show" />

    </v-container>
    
</template>

<script>
import AcceptOrder from "../components/OrdersWorker/AcceptOrder"
import RejectOrder from "../components/OrdersWorker/RejectOrder"
import ShowOrder from "../components/OrdersWorker/ShowOrder"

export default {
    data(){
        return{
            headers: [
                {
                    text: 'Full Name',
                    value: 'fullname',
                    align: "start"

                },
                { 
                    text: 'Email', 
                    value: 'email',
                    align: "start"
                },
                {
                    text: 'State',
                    value: 'state',
                    align: "start"
                },
                 {
                    text: 'Date',
                    value: 'date',
                    align: "start"
                },
                {
                    text: 'Price',
                    value: 'price',
                    align: "start"
                },
                {
                    text: '',
                    sortable:false,
                    value: 'actions',
                    align: "end",
                    width:"40px"
                    
                },
               
            ],
        }
    },
    methods:{
        accept(item){
            this.$refs.accept.order = item
            this.$refs.accept.dialog = true
        },
        reject(item){
            this.$refs.reject.order = item
            this.$refs.reject.dialog = true
        },
        show(item){
            this.$refs.show.order = item
            this.$refs.show.dialog = true
        },
         formatDate(date){
            let d = date.split("T")
            let ymd = d[0].split("-")
            let hms = d[1].split(".")
            return ymd[2]+"/"+ymd[1]+"/"+ymd[0]+" "+hms[0]
        }
    },

    components:{
        AcceptOrder,
        RejectOrder,
        ShowOrder
    },

    computed:{
        orders(){
            return this.$store.getters.getOrders;
        }
    }
}
</script>

<style scoped>

</style>