<template>
    <v-container flat style="width:85%">
        
        <br>

        <v-card dark>
            <v-card-title>
                Comments
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
                :items="comments"
                :search="search"
            >

                <template v-slot:item.comment="{item}">   
                    <v-container>
                        <v-textarea
                            filled
                            disabled
                            rows="3"
                            v-model="item.comment"
                            >
                        </v-textarea>     
                    </v-container>        
                </template>
                <template v-slot:item.date="{item}">                            
                    <span>{{formatDate(item.date)}}</span>                        
                </template>

                <template v-slot:item.actions="{item}" >
                            <v-tooltip dark color="#4db01b" top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon @click="approve(item)" class="mr-2" color="#4db01b" small depressed  rounded v-bind="attrs" v-on="on">
                                        <v-icon>
                                            mdi-check-outline
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>Approve comment?</span>
                            </v-tooltip>
                            <v-tooltip dark color="#cc222c" top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon @click="reject(item)" class="mr-2"  color="#cc222c" small depressed rounded v-bind="attrs" v-on="on">
                                    <v-icon>
                                        mdi-close-outline
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>Do not approve comment?</span>
                            </v-tooltip>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog color="dark" dark max-width="750px" v-model="dialogApprove" persistent>

            <v-card style="border:1px solid #D3D3D3">
                <v-card-title class="headline">
                    <div class="hidden-xs-only"> Approve comment from <span style="color:green;display:inline"> {{selected.email}} </span></div>
                    <div class="hidden-sm-and-up"> Approve comment</div>
                </v-card-title>
                <v-card-text>
                     <v-container>
                        <v-textarea
                            filled
                            label="Comment"
                            disabled
                            rows="3"
                            v-model="selected.comment"
                            >
                        </v-textarea>     
                    </v-container>    
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>
    
                <v-btn
                    color="green darken-1"
                    text
                    @click="confirmApprove()"
                >
                    <v-icon color="dark" left>
                        mdi-check-circle-outline
                    </v-icon>
                    <span class="hidden-xs-only"> Confirm </span>
                </v-btn>

                    <v-btn
                    color="red darken-1"
                    text
                    @click="cancelApprove()"
                >
                    <v-icon color="dark" left>
                        mdi-close-circle-outline
                    </v-icon>
                    <span class="hidden-xs-only"> Cancel </span>
                </v-btn>


                </v-card-actions>
            </v-card>

        </v-dialog>

         <v-dialog color="dark" dark max-width="750px" v-model="dialogReject" persistent>

            <v-card style="border:1px solid #D3D3D3">
                <v-card-title class="headline">
                    <div class="hidden-xs-only"> Reject comment from <span style="color:green;display:inline"> {{selected.email}} </span></div>
                    <div class="hidden-sm-and-up"> Reject comment</div>
                </v-card-title>
                <v-card-text>
                      <v-container>
                        <v-textarea
                            filled
                            label="Comment"
                            disabled
                            rows="3"
                            v-model="selected.comment"
                            >
                        </v-textarea>     
                    </v-container>    
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>
    
                <v-btn
                    color="green darken-1"
                    text
                    @click="confirmReject()"
                >
                    <v-icon color="dark" left>
                        mdi-check-circle-outline
                    </v-icon>
                    <span class="hidden-xs-only"> Confirm</span>
                </v-btn>

                    <v-btn
                    color="red darken-1"
                    text
                    @click="cancelReject()"
                >
                    <v-icon color="dark" left>
                        mdi-close-circle-outline
                    </v-icon>
                    <span class="hidden-xs-only"> Cancel </span>
                </v-btn>


                </v-card-actions>
            </v-card>

        </v-dialog>

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
import Loader from "../components/Loaders/Loader"
import axios from "../axios/index"
export default {

    data(){

        return{
            dialogApprove:false,
            dialogReject:false,
            dialogLoading:false,
            selected:{},
            search: '',
            headers: [
                {
                    text: 'Email',
                    align: 'start',
                    value: 'email',
                },
                {
                    text: 'Date',
                    align: 'start',
                    value: 'date',
                },
                {
                    text: 'Comment',
                    align: 'start',
                    value: 'comment',
                },
                { 
                    text: 'Actions', 
                    align: 'left',
                    value: 'actions',
                    width:"30px"

                },
            ],
        
        };
    },
    components:{
        Loader,
    },

    methods:{
        formatDate(date){
            let d = date.split("T")
            let ymd = d[0].split("-")
            let hms = d[1].split(".")
            return ymd[2]+"/"+ymd[1]+"/"+ymd[0]+" "+hms[0]
        },
        approve(item){
            this.selected = item;
            this.dialogApprove = true;
        },
        reject(item){
            this.selected = item;
            this.dialogReject = true;
        },
        async confirmApprove(){
            this.dialogLoading = true;
            await axios.patch("/rate/"+this.selected.id,{
                approved:1
            }).then(async () =>{
                await axios.get("/rate/"+0).then( async (response) =>{
                    await this.$store.dispatch("setComments", response.data);      
                    this.dialogLoading = false;
                    this.dialogApprove = false;
                    this.selected = {}
                    this.$forceUpdate();
                }).catch( ()=>{
                    this.dialogLoading = false;
                })
            }).catch( ()=>{
                this.dialogLoading = false;
            })
        },
       
        async confirmReject(){
            this.dialogLoading = true;
            await axios.patch("/rate/"+this.selected.id,{
                approved:-1
            }).then(async () =>{
                await axios.get("/rate/"+0).then( async (response) =>{
                    await this.$store.dispatch("setComments", response.data);      
                    this.dialogLoading = false;
                    this.dialogReject = false;
                    this.selected = {}
                    this.$forceUpdate();
                }).catch( ()=>{
                    this.dialogLoading = false;
                })
            }).catch( ()=>{
                this.dialogLoading = false;
            })
        },

        cancelApprove(){
            this.selected = {};
            this.dialogApprove = false;
        },
        cancelReject(){
            this.selected = {};
            this.dialogReject = false;
        }

        

    },

    computed:{
        comments(){
            return this.$store.getters.getComments;
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
