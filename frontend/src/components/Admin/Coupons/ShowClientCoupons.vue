<template>
    <v-container flat>
        
        <br>

       
        <v-card dark>
            <v-card-title>
                Coupons [<span style="color:green"> {{client.email}} </span>]
            <v-spacer></v-spacer>

            <v-btn @click="addC()" color="dark" depressed elevation="2" outlined rounded style="margin-top:5px;margin-left:15px" >
                <v-icon dark medium>
                    mdi-tag-plus
                </v-icon>
                Add Coupon
            </v-btn>

            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="coupons"
                :search="search"
            >

                <template v-slot:item.used="{item}">                            
                        <span v-if="item.used"> Yes </span>   
                        <span v-if="!item.used"> No </span>                        
                </template>
                <template v-slot:item.date="{item}">                            
                        <span>{{formatDate(item.date)}}</span>                        
                </template>
                <template v-slot:item.actions="{item}" >
                    
                    <v-btn text @click="editC(item)" class="mr-2" color="primary" small depressed  rounded>
                        <v-icon>
                            mdi-circle-edit-outline
                        </v-icon>
                        Edit
                    </v-btn>

                    <v-btn text @click="deleteC(item)" class="mr-2"  color="#cc222c" small depressed rounded>
                        <v-icon>
                            mdi-delete-circle-outline
                        </v-icon>
                        Delete
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog
            v-model="dialogLoading"
            hide-overlay
            persistent
            width="450"
            min-height="350"
            >
              <Loader/>
        </v-dialog>
        
        <AddCoupon ref="add"/>
        <EditCoupon ref="edit" />
        <DeleteCoupon ref="delete" />

    </v-container>
</template>

<script>
import Loader from "../../Loaders/Loader"
import AddCoupon from "./AddCoupon"
import EditCoupon from "./EditCoupon"
import DeleteCoupon from "./DeleteCoupon"

export default {

    data(){

        return{
            client:{},
            dialogLoading:false,
            search: '',
            headers: [
                { 
                    text: 'Code', 
                    value: 'code',
                    align: "start"
                },
                {
                    text: 'Percent[%]',
                    value: 'percent',
                    align: "start"

                },
                {
                    text: 'Used',
                    value: 'used',
                    align: "start"

                },
                {
                    text: 'Date',
                    value: 'date',
                    align: "start"
                },
                {
                    text: '',
                    sortable:false,
                    value: 'actions',
                    align: "start",
                    width:"50px"
                },
               
            ],
        
        };
    },

    components:{
        Loader,
        AddCoupon,
        EditCoupon,
        DeleteCoupon,
    },
    
    methods:{
        formatDate(date){
            let d = date.split("T")
            let ymd = d[0].split("-")
            let hms = d[1].split(".")
            return ymd[2]+"/"+ymd[1]+"/"+ymd[0]+" "+hms[0]
        },
        addC(){
            this.$refs.add.client = this.client;
            this.$refs.add.dialog= true;
        },
        editC(coupon){
            this.$refs.edit.coupon = coupon
            this.$refs.edit.percent = String(coupon.percent)
            this.$refs.edit.client = this.client;
            this.$refs.edit.dialog= true;
        },
        deleteC(coupon){
            this.$refs.delete.coupon = coupon
            this.$refs.delete.client = this.client;
            this.$refs.delete.dialog= true;
        },
       
    },

    computed:{
        coupons(){
            return this.$store.getters.getCoupons;
        }
    }

}
</script>

<style scoped>
.v-list {
margin-top: 32px;
padding: 0px;
border-radius: 2px;
}


</style>
