import { defineStore } from "pinia";

export const useKgStore = defineStore('kg',{
  state(){
    return {
      isVisable: true,
      currentNode: null,
    }
  },
  actions:{
    showKG(node = null) {
      this.isVisable = true;
      if(node){
        this.currentNode = node;
      }
    },
    hideKG(){
      this.isVisable = false;
    }
  }
  
})