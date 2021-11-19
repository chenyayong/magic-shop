import Vue from 'vue'
import Vuex, { Module } from 'vuex'
import home from './pages/home'
Vue.use(Vuex)

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

const store = new Vuex.Store({
  modules: {
    ...modules,
    home
  }
})

export default store
