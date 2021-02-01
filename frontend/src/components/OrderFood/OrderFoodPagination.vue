<template>
      <v-container flat style="width:90%">

            <v-toolbar justify="center" elevation="15" flat dark style="border-radius:10px;">
                    
                    <v-row style="height:80%;"> 
                        <v-col cols="12" md="3" justify="start" style="padding:0px;" class="hidden-sm-and-down">
                            <v-flex justify-start style="padding:0px;display: inline-flex; justify-content: flex-start;">
                                
                                <v-btn large outlined readonly style="margin-left:15px;pointer-events: none;">
                                    <span>Food:{{orderFood.totalFood}}</span>
                                </v-btn>

                            </v-flex>
                        </v-col>

                        <v-col cols="12" md="6" justify="center" style="padding:0px;">
                            <v-card dark  class="rounded-pill" style="padding:0px;">
                                <v-pagination
                                    v-model="page"
                                    :length="this.orderFood.lenghtFood"
                                    circle
                                    color="#95c17e"
                                    total-visible="7"
                                ></v-pagination>
                            </v-card>
                        </v-col>

                        <v-col class="hidden-sm-and-down" cols="12" md="1"/>

                        <v-col cols="12" lg="1" md="2" justify="end" style="padding:0px;" class="hidden-sm-and-down">
                            <v-flex justify-end style="padding:0px; display: inline-flex; justify-content: space-between;">
                                <v-select
                                class="hidden-lg-and-down"
                                right
                                small
                                dense
                                solo
                                :items="limits"
                                label="Limit"
                                v-model="limit"
                                @change="pagination()"
                                >
                                </v-select>
                                <v-select
                                class="hidden-xl-only"
                                right
                                small
                                dense
                                solo
                                :items="limits"
                                label="Limit"
                                v-model="limit"
                                @change="pagination()"
                                >
                                </v-select>
                            </v-flex>
                        </v-col>

                        <v-col class="hidden-sm-and-down" cols="12" md="1"/>
                    </v-row>

            </v-toolbar>
        </v-container>
</template>

<script>
export default {
    data(){
        return{
            page:1,
            limits:[2,4,8],
            limit: 4,
        }
    },

    methods:{
        pagination(){
            let parameters = {
                page:this.page,
                limit:this.limit,
                type:this.orderType.id,
                count:this.orderType.count
            }
            // pozovi u storu kako treba
            this.$store.dispatch("setPaginationOrderFood", parameters);
        },

    },

    watch: {

        page (val) {
            this.page = val
            this.pagination()
            console.log("Page:",val)
        },

        limit (val){
            this.limit = val
            this.pagination()
            console.log("Limit:",val)
   
        },

    },

    computed:{
        orderFood(){
            return this.$store.getters.getOrderFood;
        },
        orderType(){
            return this.$store.getters.getOrderType;
        },
    }

  
    
}
</script>

<style scoped>

.v-limit-select .v-list{
    
    margin-top: 35px;
    padding: 0px;
    border-radius: 2px;

}


</style>