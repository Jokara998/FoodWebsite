<template>
    <v-container flat style="width:85%">
        
        <br>

        <v-card dark >
            <v-card-title>
                Food Mixes
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>

            <v-btn @click="addMix()" color="dark" depressed elevation="2" outlined rounded style="margin-top:5px;margin-left:15px" >
                <v-icon dark medium>
                    mdi-plus-circle-outline
                </v-icon>
                Add New Mix
            </v-btn>
            
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="mixs"
                :search="search"
            >
            
            <template v-slot:item.name="{item}" >
                    <v-card  style="background-image:linear-gradient(80deg,#313131,#313131); padding:50px; margin:50px; margin-left:100px;margin-right:100px">
                        
                        <v-row>
                          
                        <v-col cols="10" align-end>
                            <v-card-title class="subheading font-weight-bold" >
                                {{ item.name }}
                            </v-card-title>
                        </v-col>
                        <v-col cols="2">  
                            <v-card-title class="subheading font-weight-bold" align-end>
                                 <v-icon color="#95C17E">
                                    mdi-currency-eur
                                </v-icon>
                                <span style="color:#95C17E"> {{returnPrice(item)}} </span>
                             </v-card-title>
                        </v-col>
                       
                        </v-row>

                        <v-divider></v-divider>

                        <v-card-text>

                             <v-list disabled>
                                <v-list-item-group
                                    color="primary"
                                >
                                    <v-list-item
                                    v-for="(itemm, i) in item.food"
                                    :key="i"
                                    >
                                        <v-list-item-icon>
                                            <v-icon color="dark" left>
                                                mdi-food-fork-drink
                                            </v-icon>
                                        </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="returnText(item, i)"></v-list-item-title>
                                    </v-list-item-content>
                                    </v-list-item>
                                    
                                </v-list-item-group>
                            </v-list>
                        </v-card-text>

                        <v-card-text>

                            <v-col class="d-flex" cols="12" sm="3" xsm="12" align-start>  
                                <v-chip
                                    medium
                                    outlined
                                    style="pointer-events:none"
                                >
                                    <v-icon left color="red darken-1">
                                        mdi-label
                                    </v-icon>
                                    <span style="display:inline;color:#E53935"> 
                                        Discount: {{item.discount}}%
                                    </span>
                                </v-chip>
                            </v-col>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-text>

                            <v-row style="justify-content: flex-end;">
                                    
                                <v-col class="d-flex" cols="12" sm="2" xsm="12" align-end>
                                    <v-btn x-medium block color="green darken-1" @click="editMix(item)">
                                         <v-icon>
                                            mdi-circle-edit-outline
                                        </v-icon> 
                                        Edit Mix 
                                    </v-btn>
                                </v-col>
                                <v-col class="d-flex" cols="12" sm="2" xsm="12" align-end>
                                    <v-btn x-medium block color="red darken-1" @click="deleteMix(item)">
                                        <v-icon>
                                            mdi-delete-circle-outline
                                        </v-icon> 
                                        Delete Mix
                                    </v-btn>
                                </v-col>
                            </v-row>

                        </v-card-text>
                    </v-card>   
                </template>

            </v-data-table>
        </v-card>

        <v-btn
            v-scroll="onScroll"
            v-show="fab"
            fab
            dark
            fixed
            bottom
            right
            color="dark"
            elevation="15"
            @click="toTop"
        >
           <v-icon light large>
                mdi-arrow-up-bold
            </v-icon>
        </v-btn>
     
        

        <AddMix ref="addMixDialog" />
        <EditMix ref="editMixDialog" />
        <DeleteMix ref="deleteMixDialog" />

    </v-container>
</template>

<script>
import AddMix from '../components/Mix/AddMix'
import EditMix from '../components/Mix/EditMix'
import DeleteMix from '../components/Mix/DeleteMix'

export default {

    data(){

        return{
            fab:false,
            search: '',
            headers: [
                {
                    text: '',
                    align: 'start',
                    value: 'name',
                    sortable:false,
                },
              
            ],
        
        };
    },
    components:{
        AddMix,
        EditMix,
        DeleteMix
    },

    methods:{
        onScroll (e) {
            if (typeof window === 'undefined') return
            const top = window.pageYOffset ||   e.target.scrollTop || 0
            this.fab = top > 20
        },
        toTop () {
            this.$vuetify.goTo(0)
        },
        async addMix(){
            await this.$store.dispatch("setMixForm");
            let itemsFood = [];
            let itemsAvailability = [];
        
            this.mixForm.forEach(element => {
                itemsFood.push(element.name)
            });

            this.$refs.addMixDialog.dialog = true
            this.$refs.addMixDialog.itemsFood = itemsFood
            this.$refs.addMixDialog.itemsAvailability = itemsAvailability

        },
        async editMix(item){
            await this.$store.dispatch("setMixForm");
            
            this.$refs.editMixDialog.mix = item
            this.$refs.editMixDialog.name = item.name
            this.$refs.editMixDialog.discount = item.discount
            this.$refs.editMixDialog.chips = []
            for(var i = 0; i<item.food.length; i++){
                this.$refs.editMixDialog.chips.push({name:item.food[i].name, availability:item.availability[i], id:item.food[i].id})
            }
            let itemsFood = []
            this.mixForm.forEach(element => {
                itemsFood.push(element.name)
            });
            this.$refs.editMixDialog.itemsFood = itemsFood
            this.$refs.editMixDialog.dialog = true
        },
        deleteMix(item){
            this.$refs.deleteMixDialog.dialog = true
            this.$refs.deleteMixDialog.mix = item
        },
        returnText(item, i){
            return item.food[i].name+" [ Availability: "+item.availability[i]+" ] "
        },
        returnPrice(item){
            let price = 0
            for(let i in item.food)
               price += item.food[i].price
            
            let total = price
            let prc = total - price*item.discount/100
            return parseFloat(prc).toFixed(2)
        }  
    },

    computed:{
        mixs(){
            return this.$store.getters.getMixs;
        },
         mixForm(){
            return this.$store.getters.getMixForm;
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
