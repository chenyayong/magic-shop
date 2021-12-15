import Vue from 'vue'

import 'normalize.css'
import ElementUI from 'element-ui'
// import { Skeleton, SkeletonItem, Tooltip } from 'element-ui'

import SvgIcon from 'vue-svgicon'

import '@/styles/element-variables.scss'
import '@/styles/index.scss'
import '@/styles/uni.css'

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
// import i18n from '@/lang'
import '@/icons/components'
// import '@/permission'
// import '@/utils/error-log'
// import '@/pwa/register-service-worker'
// import * as directives from '@/directives'
// import * as filters from '@/filsters'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
// Vue.use(Skeleton)
// Vue.use(SkeletonItem)
// Vue.use(Tooltip)

Vue.use(ElementUI, {
  size: 'small' // AppModule.size, // Set element-ui default size
  // i18n: (key: string, value: string) => i18n.t(key, value)
})

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

// // Register global directives
// Object.keys(directives).forEach((key) => {
//   Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
// })

// // Register global filter functions
// Object.keys(filters).forEach((key) => {
//   Vue.filter(key, (filters as { [key: string]: Function })[key])
// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // i18n,
  render: (h) => h(App)
}).$mount('#app')
