<template>
  <div class="system-link">
    <el-collapse v-model="activeName">
      <el-collapse-item title="商城页面" name="1">
        <el-row>
          <el-col :span="4" v-for="(item, index) in homeLinks" :key="index">
            <span class="item-link" :class="[item.src === currentLink ? 'is-active' : '']" @click="selectLinks(item)">{{ item.name }}</span>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="会员中心" name="2">
        <el-row>
          <el-col :span="4" v-for="(item, index) in memberLinks" :key="index">
            <span class="item-link" :class="[item.src === currentLink ? 'is-active' : '']" @click="selectLinks(item)">{{ item.name }}</span>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="其他链接" name="3">
        <el-row>
          <el-col :span="4" v-for="(item, index) in otherLinks" :key="index">
            <span class="item-link" :class="[item.src === currentLink ? 'is-active' : '']" @click="selectLinks(item)">{{ item.name }}</span>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ILink } from '../../index.vue'
@Component({
  name: 'SystemLink'
})
export default class extends Vue {
  @Prop({ type: String }) currentLink!: string
  private activeName = ['1', '2', '3']
  private homeLinks: ILink[] = [
    {
      src: '/home',
      name: '商城首页'
    },
    {
      src: '/category',
      name: '分类导航'
    },
    {
      src: '/goods',
      name: '全部商品'
    }
  ]

  private memberLinks: ILink[] = [
    {
      src: '/member',
      name: '会员中心'
    },
    {
      src: '/member/info',
      name: '会员信息'
    },
    {
      src: '/orderList',
      name: '我的订单'
    },
    {
      src: '/cart',
      name: '购物车'
    },
    {
      src: '/collection',
      name: '我的收藏'
    }
  ]

  private otherLinks: ILink[] = [
    {
      src: '/integral',
      name: '积分'
    },
    {
      src: '/withdrawal',
      name: '收入提现'
    },
    {
      src: '/incomedetails',
      name: '收入明细'
    },
    {
      src: '/address',
      name: '收货地址'
    },
    {
      src: '/appendAddress',
      name: '添加收货地址'
    },
    {
      src: '/myrelationship',
      name: '我的客户'
    },
    {
      src: '/extension',
      name: '推广中心'
    },
    {
      src: '/distribution',
      name: '分销商'
    },
    {
      src: '/distributionOrder',
      name: '分销订单'
    },
    {
      src: '/search',
      name: '搜索'
    },
    {
      src: '/login',
      name: '登录'
    },
    {
      src: '/register',
      name: '注册'
    }
  ]

  selectLinks(link: ILink) {
    this.$emit('update:currentLink', link.src)
  }
}
</script>
<style scoped lang="scss">
.item-link {
  cursor: pointer;
}
.is-active {
  color: $--color-primary;
}
</style>
