<template lang="pug">
    el-form(:inline='true')
      el-form-item
        slot
      el-form-item
        slot(name="button-group")
          el-button(type='primary', icon='el-icon-search') 搜索
          el-button(type='primary', icon='el-icon-plus') 添加页面
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'MagicSearch'
})
export default class extends Vue {}
</script>
