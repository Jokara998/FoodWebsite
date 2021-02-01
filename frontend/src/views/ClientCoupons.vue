<template>
    <v-container flat style="width:85%">
        
        <br>

        
        <v-card dark v-show="this.coupons.length == 0">
            <v-card-title style="justify-content:center">
                You got no coupons.
            </v-card-title>
        </v-card>

       
        <v-card dark v-show="this.coupons.length > 0">
            <v-card-title>
                <span v-if="$vuetify.breakpoint.width >=400"> Coupons [<span style="color:green"> {{token.email}} </span>] </span>
                <span v-else-if="$vuetify.breakpoint.width < 400"> Coupons <div>[<span style="color:green"> {{token.email}} </span>]</div> </span>
            <v-spacer></v-spacer>           
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="coupons"
                :search="search"
                :mobile-breakpoint="700"
            >

                <template v-slot:item.used="{item}">                            
                        <span v-if="item.used"> Yes </span>   
                        <span v-if="!item.used"> No </span>                        
                </template>
                <template v-slot:item.date="{item}">                            
                        <span>{{formatDate(item.date)}}</span>                        
                </template>
               
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
import jwt_decode from 'jwt-decode'

export default {

    data(){

        return{
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
               
            ],
        
        };
    },

  
    methods:{
        formatDate(date){
            let d = date.split("T")
            let ymd = d[0].split("-")
            let hms = d[1].split(".")
            return ymd[2]+"/"+ymd[1]+"/"+ymd[0]+" "+hms[0]
        },
    },

    computed:{
        coupons(){
            return this.$store.getters.getCoupons;
        },
        token:function(){
            const t = this.$store.getters.getToken
            if(t != "")
            return jwt_decode(t);
            return t;
        },
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
