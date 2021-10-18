<template>
  <div class="layout-setting">
    <el-empty v-if="!componentsFormDataActionItem"></el-empty>
    <transition mode="out-in" name="slide-fade" v-else>
      <component :is="componentsFormDataActionItem.name" :componentData="componentsFormDataActionItem"></component>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const magic = namespace('magic')

interface iComponents {
  [key: string]: () => any
}

const files = require.context('./components', true, /index\.vue$/)
const components = files.keys().reduce((ret: iComponents, file: string): iComponents => {
  const component = files(file).default
  const name = component.extendOptions.name
  ret[name] = component
  return ret
}, {})

@Component({
  name: 'LayoutSetting',
  components
})
export default class extends Vue {
  @magic.Getter('componentsFormDataActionItem') componentsFormDataActionItem!: any
}
</script>

<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(50px);
  opacity: 0;
}
</style>
