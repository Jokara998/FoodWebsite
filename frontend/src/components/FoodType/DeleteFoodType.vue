<template>
    <v-container >
            <v-dialog color="dark" dark max-width="750px" v-model="dialog" persistent>

                <v-card dark style="border:1px solid #D3D3D3">
                    <v-card-title class="headline">
                        <div v-if="$vuetify.breakpoint.width >= 450"> Delete <span style="color:green;display:inline"> {{editFoodType.name}} </span> food type? </div>
                        <div v-if="$vuetify.breakpoint.width < 450"> Delete <span style="color:green;display:inline"> {{editFoodType.name}} </span>? </div>
                    </v-card-title>
                    <v-card-text>
                        <div>This action will result in pernamently deleting <span style="color:green;display:inline"> {{editFoodType.name}} </span> food type.</div>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
        
                    <v-btn
                        color="green darken-1"
                        text
                        @click="confirm()"
                    >
                        <v-icon color="dark" left>
                            mdi-check-circle-outline
                        </v-icon>
                        Confirm
                    </v-btn>

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
            
            <!-- process dialog -->
            <v-dialog
            v-model="dialogLoading"
            hide-overlay
            persistent
            width="450"
            min-height="350"
            >
                <Loader/>
            </v-dialog>
            
            <v-snackbar
                v-model="snackbar"
                timeout="6000"
                centered
                color="red darken-4"
                elevation="5"                
            >
                <v-icon color="#000000" large>
                    mdi-alert
                </v-icon>
                Food Type <span style="color:#000000"> {{editFoodType.name}} </span> is currently used by other food and can not be deleted!

                  <template v-slot:action="{ attrs }">
                    <v-btn
                    color="#000000"
                    icon
                    v-bind="attrs"
                    @click="snackbar = false"
                    >
                    <v-icon color="dark">
                        mdi-close-circle-outline
                    </v-icon>
                    </v-btn>
                </template>
            </v-snackbar>
    </v-container>
</template>

<script>
import axios from '../../axios/index'
import Loader from "../Loaders/Loader"

export default {

    data(){

        return{
            dialog:false,
            dialogLoading:false,
            valid:false,
            food:"Food",
            snackbar:false
        };
    },
    computed:{
        editFoodType(){
            return this.$store.getters.getEditFoodType;
        }
    },
    components:{
        Loader
    },

    methods:{
       async confirm(){
            await axios.get('/foodtype/check/'+this.editFoodType.id).then(async (response) => {
                console.log(response.data)
                if(response.data == false){
                    this.snackbar = true;
                }else{
                    this.dialogLoading = true
                    await axios.delete('/foodtype/'+this.editFoodType.id).then(async (response) => {
                        await this.$store.dispatch("setDeleteFoodType", response.data)
                        this.dialogLoading = false
                        this.dialog = false
                    }).catch(()=>{
                        this.dialogLoading = false
                    })                
                }
              
            })
       }
        
    }
}
</script>

<style scoped>
.v-snack__wrapper{
    max-width: 200px !important;
    max-height: 200px !important;
    border:1px solid #000000 !important;
}

.v-snack__content {
  display: block !important;   
}
</style>