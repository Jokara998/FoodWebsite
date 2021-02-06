<template>
     <v-container >
            <v-dialog color="dark" dark max-width="850px" v-model="dialog" persistent>
               <v-card dark style="border:1px solid #D3D3D3">
                    <v-card-title>
                        Comments
                    <v-spacer></v-spacer>
                    </v-card-title>
                    <v-card-text v-if="this.comments.length == 0">
                         No Comments Yet.
                    </v-card-text>

                    <v-card-text v-if="this.comments.length > 0">
                        <v-divider/>
                        <v-virtual-scroll
                            :items="comments"
                            height="500"
                            item-height="150"
                            three-line

                        >
                            <template v-slot:default="{ item }" v-if="$vuetify.breakpoint.width >= 470">
                                <v-list-item >
                                
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <span> User </span>
                                        </v-list-item-title>
                                    <v-list-item-subtitle>  
                                            <span style="color:#95c17e;font-size:16px"> {{item.fullname}} </span>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>

                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Date
                                        </v-list-item-title>
                                        <v-list-item-subtitle>  
                                            <span style="color:#95c17e;font-size:16px">  {{formatDate(item.date)}} </span>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item >

                                <v-list-item >
                                    <v-list-item-content>
                                        <v-list-item-title>
                                        Rate
                                        </v-list-item-title>
                                        <v-list-item-subtitle>  
                                            <v-icon color="#ffbe41">
                                                mdi-star
                                            </v-icon>
                                            <span style="color:#f5f5f5;font-size:15px">{{item.rateNumber}}</span>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>

                                    <v-list-item-content>
                                        <v-list-item-title>
                                        Comment
                                        </v-list-item-title>
                                        <v-list-item-subtitle> 
                                                <span style="color:#95c17e;font-size:14px; display: inline-block;">  {{item.comment}} </span>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                
                                </v-list-item>

                                <v-divider></v-divider>
                            </template>
                            <template v-slot:default="{ item }" v-else-if="$vuetify.breakpoint.width < 470">
                                <v-list-item >
                                
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <span> User </span>
                                        </v-list-item-title>
                                    <v-list-item-subtitle>  
                                            <span style="color:#95c17e;font-size:14px"> {{item.fullname}} </span>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>

                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Date
                                        </v-list-item-title>
                                        <v-list-item-subtitle>  
                                            <span style="color:#95c17e;font-size:13px">  {{formatDate(item.date)}} </span>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item >

                                <v-list-item >
                                    <v-list-item-content>
                                        <v-list-item-title>
                                        Rate
                                        </v-list-item-title>
                                        <v-list-item-subtitle>  
                                            <v-icon color="#ffbe41" style="font-size:13px">
                                                mdi-star
                                            </v-icon>
                                            <span style="color:#f5f5f5;font-size:13px">{{item.rateNumber}}</span>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>

                                    <v-list-item-content>
                                        <v-list-item-title>
                                        Comment
                                        </v-list-item-title>
                                        <v-list-item-subtitle> 
                                                <span style="color:#95c17e;font-size:12px; display: inline-block;">  {{item.comment}} </span>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                
                                </v-list-item>

                                <v-divider></v-divider>
                            </template>
                        </v-virtual-scroll>
                    </v-card-text>

                    <v-card-actions>
                        <v-col class="d-flex" md="10" sm="9" xs="0" > </v-col>
                            <v-spacer></v-spacer>
                        <v-col class="d-flex" md="2" sm="3" xs="12" align-end>
                            <v-btn x-medium block color="red darken-1" @click="dialog=false;"> Close </v-btn>
                        </v-col>
                    </v-card-actions>
                </v-card>
            </v-dialog>
     </v-container>
</template>

<script>
export default {
    data(){
        return{
            dialog:false,
            comments:[],
            search: '',
            headers: [
                {
                    text: 'User',
                    align: 'start',
                    value: 'fullname',
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
             
            ],
        }
    },
    methods:{
         formatDate(date){
            let d = date.split("T")
            let ymd = d[0].split("-")
            let hms = d[1].split(".")
            return ymd[2]+"/"+ymd[1]+"/"+ymd[0]+" "+hms[0]
        },
    }
}
</script>

<style scoped>

</style>