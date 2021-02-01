<template>
      <v-dialog color="dark" dark max-width="350px" v-model="dialog" persistent>

            <v-card dark style="border:1px solid #D3D3D3">
                <v-card-title class="headline">
                    <div><span style="color:green;display:inline"> {{availability.name}}</span></div>
                </v-card-title>
                <v-card-text left>
                    <v-card
                        max-width="300"
                    >
                        <v-list disabled>
                        <v-list-item-group
                            color="primary"
                        >
                            <v-list-item
                            v-for="(item, i) in this.availability.availability"
                            :key="i"
                            >
                            <v-list-item-icon>
                                <v-icon color="dark" left>
                                    mdi-food-fork-drink
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="item"></v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="red darken-1"
                    text
                    @click="dialog = false"
                >
                    <v-icon color="dark" left>
                        mdi-close-circle-outline
                    </v-icon>
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
        }
    },
    props:{
        availability:{}
    }

}
</script>

<style scoped>

</style>