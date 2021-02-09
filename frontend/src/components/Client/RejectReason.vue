<template>
     <v-dialog
                dark
                persistent
                v-model="dialog"
                max-width="450px"
                >
                <v-card dark style="border:1px solid #D3D3D3">
                     <v-card-title class="headline">
                        <div> Reject Reason</div>
                    </v-card-title>
                    <v-card-text>
                        <div>{{reason}}</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
            
                        <v-btn
                            color="red darken-1"
                            text
                            @click="dialog = false; "
                        >
                            Close
                        </v-btn>

                    </v-card-actions>
                </v-card>
        
             </v-dialog>
</template>

<script>
export default {
    data(){
        return{
            dialog:false,
            reason:"",
        }
    }
}
</script>

<style scoped>

</style>