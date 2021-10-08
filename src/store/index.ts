import Vue from 'vue'
import Vuex, { Module } from 'vuex'

interface IModule {
  [key: string]: Module<any, any>
}

const files = require.context('./magic', false, /\.ts$/)
const modules = files.keys().reduce((ret: IModule, file) => {
  const module = files(file).default
  const name = module.state.name
  ret[name] = module
  return ret
}, {})

Vue.use(Vuex)

const store = new Vuex.Store({
  modules
})

export default store
