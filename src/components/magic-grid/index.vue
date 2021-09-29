<template>
  <div class="magic-grid">
    <div class="grid-list">
      <div class="grid-item" v-for="item in data" :key="item.name">
        <div><i :class="[item.icon]"></i></div>
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
interface IGrid {
  name: string
  icon: string
}
@Component({
  name: 'magicGrid'
})
export default class extends Vue {
  @Prop({ type: Array }) readonly data!: IGrid[]
}
</script>

<style scoped lang="scss">
.grid-list {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #eee;
  color: #5e6d82;
  overflow: hidden;
  padding: 0 !important;
  .grid-item {
    flex-basis: calc(100% / 3);
    text-align: center;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;
    font-size: 13px;
    box-sizing: content-box;
    cursor: move;
    transition: all ease 0.3s;
    &:hover {
      background-color: $--color-primary;
      color: #fff;
    }
    i {
      font-size: 26px;
    }
  }
}
</style>
