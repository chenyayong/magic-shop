<template>
  <div class="tabbar" v-if="component">
    <el-tooltip effect="dark" :content="component.label" placement="left-start">
      <el-tooltip placement="right-start">
        <template v-slot:content>
          <i class="el-icon-delete component-delete-icon" @click="deleComponent(component.id)"></i>
        </template>
        <magic_tabbar
          :class="[index === componentsFormDataIndex ? 'active' : '']"
          @click.native="changeActive(index)"
          :component-data="component"
        ></magic_tabbar>
      </el-tooltip>
    </el-tooltip>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import magic_tabbar from '@/components/magic/magic-tabbar/index.vue'
import { IMagicTabbarComponent } from '@/store/magic/magic-tabbar'
import { namespace } from 'vuex-class'
const magic = namespace('magic')
const magicAsidebar = namespace('magicAsidebar')
@Component({
  name: 'tabbar',
  components: {
    magic_tabbar
  }
})
export default class extends Vue {
  @Prop({ type: Object }) component!: IMagicTabbarComponent
  @Prop({ type: Number }) index!: number
  @magic.Mutation('DELE_COMPONENTS_FORM_DATA') DELE_COMPONENTS_FORM_DATA!: (id: string) => void
  @magic.State('componentsFormDataIndex') componentsFormDataIndex!: number
  @magic.Mutation('SET_COMPONENTS_FORM_DATA_INDEX') SET_COMPONENTS_FORM_DATA_INDEX!: (
    index?: number
  ) => void

  @magicAsidebar.Mutation('SET_ASIDEBAR_DATA_INDEX') SET_ASIDEBAR_DATA_INDEX!: (
    index: number
  ) => void

  changeActive(index: number) {
    this.SET_COMPONENTS_FORM_DATA_INDEX(index)
    this.SET_ASIDEBAR_DATA_INDEX(1)
  }

  deleComponent(id: string) {
    this.DELE_COMPONENTS_FORM_DATA(id)
    // console.log('deleComponent', id)
  }
}
</script>
