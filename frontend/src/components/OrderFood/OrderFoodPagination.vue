<template>
      <v-container flat style="width:85%">

            <v-toolbar justify="center" elevation="15" flat dark style="border-radius:10px;">
                
                    <v-row style="height:80%;"> 
                        <v-col cols="3" justify="start" style="padding:0px;">
                            <v-flex justify-start style="padding:0px;height:75%; display: inline-flex; justify-content: flex-start;">
                                
                                <v-chip large outlined readonly style="min-width:120px;margin-left:15px;margin-top:-2px;height:100%;pointer-events: none;">
                                    <p style="margin-top:12px">
                                        <span>Total Food:{{orderFood.totalFood}}</span>
                                    </p>
                                </v-chip>

                            </v-flex>
                        </v-col>

                        <v-col cols="6" justify="center" style="padding:0px;">
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

                        <v-col cols="3" justify="end" style="padding:0px;">
                            <v-flex justify-end style="padding:0px; height:75%; display: inline-flex; justify-content: space-between;">
                                <v-select
                                right
                                small
                                class="v-limit-select"
                                dense
                                outlined
                                :items="limits"
                                label="Limit"
                                v-model="limit"
                                @change="pagination()"
                                >
                                </v-select>
                            </v-flex>
                        </v-col>
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

.v-limit-select{
    height:70%;
    min-width: 30%;
    max-width: 30%;
}


</style>