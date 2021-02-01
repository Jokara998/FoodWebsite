<template>
  <v-dialog color="dark" dark max-width="500px" v-model="dialog" persistent>
      <v-card>
          <v-card-title>
              <v-col cols="10" v-if="$vuetify.breakpoint.width >=420">
                {{itemType}} Name: <span style="color:#95c17e;"> {{item.name}} </span>
              </v-col>
              <v-col cols="10" v-else-if="$vuetify.breakpoint.width <420">
                {{itemType}} Name: 
                <div>
                    <span style="color:#95c17e;"> {{item.name}} </span>
                </div>
              </v-col>
              <v-col cols="2">
                  <v-btn
                        color="red darken-1"
                        icon
                        @click="close()"
                    >
                    <v-icon color="dark">
                        mdi-close-circle-outline
                    </v-icon>
                    </v-btn>
              </v-col>
          </v-card-title>
          <v-card-text>
                    <v-divider/>
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <v-container>
                                                                           
                                <v-row>
                                    <v-col
                                    cols="8"
                                    >
                                        <v-rating
                                            v-if="$vuetify.breakpoint.width >=550"
                                            half-increments
                                            hover
                                            length="5"
                                            size="45"
                                            color="warning"
                                            v-model="stars"
                                            :rules="starRules"
                                        >
                                        </v-rating>
                                        <v-rating
                                            v-else-if="$vuetify.breakpoint.width < 550 && $vuetify.breakpoint.width >= 420"
                                            half-increments
                                            hover
                                            length="5"
                                            size="30"
                                            color="warning"
                                            v-model="stars"
                                            :rules="starRules"
                                        >
                                        </v-rating>
                                          <v-rating
                                            v-else-if="$vuetify.breakpoint.width < 420"
                                            half-increments
                                            hover
                                            length="5"
                                            size="15"
                                            color="warning"
                                            v-model="stars"
                                            :rules="starRules"
                                        >
                                        </v-rating>
                                        
                                    </v-col>
                                    <v-col  v-if="$vuetify.breakpoint.width >=550" cols="4" style="margin-top:18px">
                                        <span class="text-center" v-if="stars" style="font-size:20px;color:#f5f5f5; padding:10px; margin-top:-25px">
                                            ({{ stars }})
                                        </span>
                                        
                                    </v-col>
                                    <v-col v-else-if="$vuetify.breakpoint.width < 550 && $vuetify.breakpoint.width >= 420" cols="4" style="margin-top:12px">
                                        <span class="text-center" v-if="stars" style="font-size:15px;color:#f5f5f5; padding:10px; margin-top:-20px">
                                            ({{ stars }})
                                        </span>
                                        
                                    </v-col>
                                    <v-col v-else-if="$vuetify.breakpoint.width < 420" cols="4" style="margin-top:3px">
                                        <span class="text-center" v-if="stars" style="font-size:10px;color:#f5f5f5; padding:10px; margin-top:-25px">
                                            ({{ stars }})
                                        </span>
                                        
                                    </v-col>
                                                            
                                </v-row>   

                                 <v-row>
                                    <v-col
                                    cols="12"
                                    >
                                        <v-textarea
                                                v-model="comment"
                                                label="Comment"
                                                :counter="30"
                                                :rules="commentRules"
                                                required
                                                rows="4"
                                            ></v-textarea>
                                        
                                    </v-col>
                                    <v-col cols="4" style="margin-top:18px">
                                     
                                    </v-col>
                                                            
                                </v-row>   


                                <v-row>
                                    <v-flex style="margin:5px; margin-left:25px"> <span :key="errorKey" style="display:inline;color:#ff5252; font-size:12px"> {{message}} </span></v-flex>                             
                                </v-row>   
                                <v-row>
                                    <v-col cols="7"/>
                                    <v-col v-if="$vuetify.breakpoint.width >=420"
                                    cols="3"
                                    >
                                    
                                        <v-btn
                                        style="margin-left:0px"
                                            color="green darken-1"
                                            text
                                            outlined
                                            @click="confirm()"
                                        >
                                        <v-icon color="dark" left>
                                            mdi-star
                                        </v-icon>
                                            Confirm
                                        </v-btn>
                                    </v-col>
                                    <v-col v-else-if="$vuetify.breakpoint.width <420"
                                    cols="12"
                                    >
                                    
                                        <v-btn
                                        style="margin-left:0px"
                                            color="green darken-1"
                                            block
                                            outlined
                                            @click="confirm()"
                                        >
                                        <v-icon color="dark" left>
                                            mdi-star
                                        </v-icon>
                                            Confirm
                                        </v-btn>
                                    </v-col>
                                </v-row>                                                                                       
                            </v-container>
                        </v-form>                   
          </v-card-text>

    
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
  </v-dialog>
</template>

<script>
import Loader from "../../components/Loaders/Loader"
export default {
    data(){
        return{
            dialog:false,
            dialogLoading:false,
            valid:false,
            item:{},
            itemType:"",
            stars:null,
            starRules: [
                v => !!v || 'Required',
                v => v!=null || 'Required',
                v => v!="" || 'Requiredd',
                v => !isNaN(v) || 'Invalid.'
            ],
            commentRules: [
                v => !!v || 'Required',
                v => v!=null || 'Required',
                v => v!="" || 'Requiredd',
                v => v!=null && v.length <= 30 || 'Comment must be less than 30 characters.',

            ],
            comment:'',
            errorKey:0,
            message:""

        }
    },
    methods:{
        async confirm(){
            if(this.$refs.form.validate()){

                if(this.stars == null){
                    this.message = "Rate must be selected!"
                    this.errorKey += 1
                    return
                }
                this.dialogLoading = true;

                let rate = {
                    item:this.item,
                    itemType:this.itemType,
                    rateNumber: this.stars,
                    comment: this.comment,
                }

                await this.$store.dispatch("setRates", rate);
                this.$refs.form.reset();
                this.stars = null
                this.dialogLoading = false;
                this.dialog = false
            }
        },
        close(){
            this.$refs.form.reset();
            this.stars = null
            this.errorKey += 1
            this.message = ""
            this.dialog = false
        },
        
    },
    components:{
        Loader,
    },
    watch:{
        stars(val){
            if(val != null){
                this.errorKey += 1
                this.message = ""
            }
        }
    }
}
</script>

<style scoped>

</style>