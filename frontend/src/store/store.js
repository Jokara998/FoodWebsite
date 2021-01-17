import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    allFood : [],
    allTypes: [],
    editFood: [],
    editFoodType: [],
    paginationFood:{page:1,limit:4},
    paginationKey:0,
    navbarKey:0,
    filterParameters:{price:"",rate:""},
    token: localStorage.getItem('Authorization') || '',
    workers:[],
    clients:[],

    // mix
    mixForm:[],
    mixs:[],
    orderFood:[],
    orderType:'',
    paginationOrderKey:0,

    // cart
    cart:[],
    cartNumber:0,
    cartKey:0
    

  },
  // sinhrono
  mutations: {

    // FOOD
    setAllFood(state, payload){
      state.allFood = payload
    },

    setFilterFood(state, payload){
      state.allFood = payload
      state.paginationKey += 1
    },

    setAddFood(state, payload){
      state.allFood = payload
      state.paginationKey += 1
    },

    setEditFood(state, payload){
      state.editFood = payload
    },

    setActiveStatus(state, payload){
      for(let food in state.allFood.food){
        if(state.allFood.food[food].id == payload.id){
          state.allFood.food[food].active = payload.active
          break;
        }
      }
    },

    setUpdatedFood(state, payload){
      for(let food in state.allFood.food){
        if(state.allFood.food[food].id == payload.id){
          state.allFood.food[food].name = payload.name
          state.allFood.food[food].type = payload.type
          state.allFood.food[food].description = payload.description
          state.allFood.food[food].price = payload.price
          state.allFood.food[food].image = payload.image
          state.allFood.food[food].availability = payload.availability
          break;
        }
      }
    },

    // FOOD TYPES
    setAllTypes(state, payload){
      state.allTypes = payload
    },

    addFoodType(state, payload){
      state.allTypes.push(payload)
    },

    setEditFoodType(state, payload){
      state.editFoodType = payload
    },

    setUpdatedFoodType(state, payload){
      for(let fdtype in state.allTypes){
        if(state.allTypes[fdtype].id == payload.id){
          state.allTypes[fdtype].name = payload.name
          break;
        }
      }

      for(let fd in state.allFood){
        if(state.allFood[fd].typeId == payload.id)
          state.allFood[fd].type = payload.name
      }
    },

    setDeleteFoodType(state, payload){
      for(let fdtype in state.allTypes){
        if(state.allTypes[fdtype].id == payload){
          state.allTypes.splice(fdtype,1);
          break;
        }
      }
    },

    // FOOD PAGINATION
    setPaginationFood(state, payload){
      state.paginationFood.page = payload.page
      state.paginationFood.limit = payload.limit
    },

    setPaginationKey(state){
      state.paginationKey += 1
    },

    setPaginationOrderKey(state){
      state.paginationOrderKey += 1
    },

    // FOOD FILTER
    setFilterParameters(state, payload){
      state.filterParameters = payload
    },

    setNavbarKey(state){
      state.navbarKey += 1
    },

    setToken(state, payload){
      state.token = payload
    },

    // WORKERS
    setWorkers(state, payload){
      state.workers = payload
    },

    addWorker(state, payload){
      state.workers.push(payload)
    },

    deleteWorker(state, payload){
      state.workers = state.workers.filter(item => item.id !== payload)
    },

    // CLIENTS
    setClients(state, payload){
      state.clients = payload
    },

    deleteClient(state, payload){
      state.clients = state.clients.filter(item => item.id !== payload)
    },

    // MIX

    setMixForm(state, payload){
      state.mixForm = payload
    },
     setMixs(state, payload){
      state.mixs = payload
    },
    addMix(state, payload){
      state.mixs.push(payload)
    },
    deleteMix(state, payload){
      state.mixs = state.mixs.filter(item => item.id !== payload)
    },
    editMix(state, payload){
      for(let i in state.mixs){
        if(payload.id == state.mixs[i].id){
          state.mixs[i].name = payload.name;
          state.mixs[i].food = payload.food;
          state.mixs[i].availability = payload.availability;
          state.mixs[i].discount = payload.discount;
          break;
        }
      }
    },

    // ORDER

    setOrderFood(state, payload){
      state.orderFood = payload
    },
    setOrderType(state, payload){
      state.orderType = payload
    },

    // CART
    setCart(state, payload){
      state.cart.push(payload)
      state.cartNumber = state.cart.length
      state.navbarKey += 1
   
      localStorage.removeItem("cart")
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    setCartStorage(state, payload){
      if(payload == null || payload.length == 0)
      return
      console.log(JSON.parse(payload))

      state.cart = JSON.parse(payload)
      state.cartNumber = state.cart.length
      state.navbarKey += 1
    },
    deleteItem(state, item){
      state.cart.splice(item, 1);
      state.cartNumber = state.cart.length
      state.navbarKey += 1

      localStorage.removeItem("cart")
      localStorage.setItem("cart", JSON.stringify(state.cart))
      state.cartKey += 1
    },
    editItem(state, item, index){
      state.cart[index] = item
      localStorage.removeItem("cart")
      localStorage.setItem("cart", JSON.stringify(state.cart))
      state.cartKey += 1
    },

    setCartkey(state){
      state.cartKey += 1
    }

  },
  // asihrono, odavde uzimas sa back-a info
  actions: {

    // FOOD
    async setAllFood(state){
      
      await axios.get("/food?page="+state.getters.getPaginationFood.page+"&limit="+state.getters.getPaginationFood.limit).then((response) =>{
        state.commit("setAllFood", response.data)
      })    
    },

    async addFood(state){
      state.commit("setPaginationFood", {page:1, limit:state.getters.getPaginationFood.limit})
      await axios.get("/food?page="+state.getters.getPaginationFood.page+"&limit="+state.getters.getPaginationFood.limit).then((response) =>{
        state.commit("setAddFood", response.data)
      })    
    },

    async setActiveStatus(state, payload){
      state.commit("setActiveStatus", payload)
    },

    async setDeleteFood(state){
        await axios.get("/food?page="+state.getters.getPaginationFood.page+"&limit="+state.getters.getPaginationFood.limit).then((response) =>{
          state.commit("setAllFood", response.data)
        })   
    },

    async setUpdatedFood(state, payload){
      state.commit("setUpdatedFood", payload)
    },

    async setEditFood(state, payload){
      state.commit("setEditFood", payload)
    },

    // FOOD TYPES

    async setAllTypes(state){
      await axios.get("/foodtype").then((response) =>{
        state.commit("setAllTypes", response.data)
      })
    },
   
    async addFoodType(state, payload){
      state.commit("addFoodType", payload)
    },

    async setEditFoodType(state, payload){
      state.commit("setEditFoodType", payload)
    },

    async setUpdatedFoodType(state, payload){
      state.commit("setUpdatedFoodType", payload)
    },

    async setDeleteFoodType(state, payload){
      state.commit("setDeleteFoodType", payload)
    },

    // FOOD PAGINATION

    async setPaginationFood(state, payload){
      state.commit("setPaginationFood", payload)
    },

    async setPaginationKey(state){
      state.commit("setPaginationKey")
    },

    async setPaginationOrderKey(state){
      state.commit("setPaginationOrderKey")
    },

    // FOOD FILTER

    async setFilterFood(state, filterParameters){
      state.commit("setFilterParameters", filterParameters) 
      state.commit("setPaginationFood", {page:1, limit:state.getters.getPaginationFood.limit})
      let url = "/food?page="+state.getters.getPaginationFood.page+"&limit="+state.getters.getPaginationFood.limit+
                "&rate="+state.getters.getFilterParameters.rate+"&price="+state.getters.getFilterParameters.price;
      await axios.get(url).then((response) =>{
        state.commit("setFilterFood", response.data)
      })    
    },

    async setNavbarKey(state){
      state.commit("setNavbarKey")
    },

    async setToken(state, payload){
      state.commit("setToken", payload)
    },

    // WORKERS

    async setWorkers(state){
      await axios.get("/user/worker").then((response)=>{
        state.commit("setWorkers", response.data)
      })
    },

    async addWorker(state, payload){
      state.commit("addWorker", payload)
    },

    async deleteWorker(state, payload){
      state.commit("deleteWorker", payload)
    },

    // CLIENTS

    async setClients(state){
      await axios.get("/user/client").then((response)=>{
        state.commit("setClients", response.data)
      })
    },

    async deleteClient(state, payload){
      state.commit("deleteClient", payload)
    },

    // MIX

    async setMixForm(state){
      await axios.get("/food").then((response) =>{
        let resp = response.data;
        state.commit("setMixForm", resp)
      })
    },

    async setMixs(state){
      await axios.get("/mix").then((response) =>{
        state.commit("setMixs", response.data)
      })
    },

    async addMix(state, payload){
       state.commit("addMix", payload)
    },

    async deleteMix(state, payload){
      state.commit("deleteMix", payload)
    },

    async editMix(state, payload){
      state.commit("editMix", payload)
    },

    // ORDER
    async setOrderFood(state, type){
      
      await axios.get("/food/type?page=1&limit=4&type="+type.id+"&count="+type.count).then((response) =>{
        state.commit("setOrderFood", response.data)
      })    
    },

    setOrderType(state, type){
      state.commit("setOrderType", type)    
    },

    async setPaginationOrderFood(state, parameters){
      
      await axios.get("/food/type?page="+parameters.page+"&limit="+parameters.limit+"&type="+parameters.type+"&count="+parameters.count).then((response) =>{
        state.commit("setOrderFood", response.data)
      })    
    },

    async setFilterOrderFood(state, parameters){
      
      await axios.get("/food/type?page="+parameters.page+"&limit="+parameters.limit+"&type="+parameters.type+"&count="+parameters.count+"&price="+parameters.price+"&rate="+parameters.rate).then((response) =>{
        state.commit("setPaginationOrderKey")
        state.commit("setOrderFood", response.data)
      })    
    },

    // CART
    async setCart(state, payload){
      state.commit("setCart", payload)
    },
    async setCartStorage(state, cart){
      state.commit("setCartStorage", cart)
    },
    async deleteItem(state, index){
      state.commit("deleteItem", index)
    },
    async editItem(state, item, index){
      state.commit("editItem", item, index)
    },
    async setCartKey(state){
      state.commit("setCartKey")
    }


  },
  getters:{
      // FOOD
      getAllFood(state){
        return state.allFood
      },

      getEditFood(state){
        return state.editFood
      },
      
      // FOOD TYPES

      getAllTypes(state){
        return state.allTypes
      },

      getEditFoodType(state){
        return state.editFoodType
      },

      // FOOD PAGINATION
      getPaginationFood(state){
        return state.paginationFood
      },

      getPaginationKey(state){
        return state.paginationKey
      },

      getPaginationOrderKey(state){
        return state.paginationOrderKey
      },
      // FOOD FILTER
      getFilterParameters(state){
        return state.filterParameters
      },

      getToken(state){
        return state.token
      },

      getNavbarKey(state){
        return state.navbarKey
      },

      // WORKERS
      getWorkers(state){
        return state.workers
      },

       // CLIENTS
       getClients(state){
        return state.clients
      },

      //MIX

      getMixForm(state){
        return state.mixForm
      },
      getMixs(state){
        return state.mixs
      },

      // ORDER

      getOrderFood(state){
        return state.orderFood
      },
      getOrderType(state){
        return state.orderType
      },
      // CART

      getCart(state){
        return state.cart
      },
      getCartNumber(state){
        return state.cartNumber
      },
      getCartKey(state){
        return state.cartKey
      }

  },
  modules: {

  }

})

export default store;