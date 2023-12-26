import { defineStore } from 'pinia'

export const useBaseStore = defineStore('base', {
  state: () => ({ 
    isLoadingRouter: true
  }),
  getters: {},
  actions: {},
})