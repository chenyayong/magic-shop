<template>
  <div class="layout-edit">
    <el-empty v-if="!currentComponent"></el-empty>
    <transition mode="out-in" name="slide-fade">
      <component :is="currentComponent" :componentData="componentsSettingCurrent"></component>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const magicSetting = namespace('magicSetting')

interface iComponents {
  [key: string]: () => any
}

const files = require.context('./components', false, /\.vue$/)
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
  @magicSetting.State('componentsSettingKey') currentComponent!: string
  @magicSetting.Getter('componentsSettingCurrent') componentsSettingCurrent!: any
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
