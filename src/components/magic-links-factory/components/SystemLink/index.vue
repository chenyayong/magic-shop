<template>
  <div class="system-link">
    <el-collapse v-model="activeName">
      <el-collapse-item title="商城页面" name="1">
        <el-row>
          <el-col :span="4" v-for="(item, index) in homeLinks" :key="index">
            <span
              class="item-link"
              :class="[item.src === currentLink ? 'is-active' : '']"
              @click="selectLinks(item)"
              >{{ item.name }}</span
            >
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="会员中心" name="2">
        <el-row>
          <el-col :span="4" v-for="(item, index) in memberLinks" :key="index">
            <span
              class="item-link"
              :class="[item.src === currentLink ? 'is-active' : '']"
              @click="selectLinks(item)"
              >{{ item.name }}</span
            >
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="其他链接" name="3">
        <el-row>
          <el-col :span="4" v-for="(item, index) in otherLinks" :key="index">
            <span
              class="item-link"
              :class="[item.src === currentLink ? 'is-active' : '']"
              @click="selectLinks(item)"
              >{{ item.name }}</span
            >
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
      src: '/pages/home/index',
      name: '首页'
    },
    {
      src: '/pages/category/index',
      name: '分类导航'
    },
    {
      src: '/pages/goods/index',
      name: '全部商品'
    },
    {
      src: '/pages/shopping-card/index',
      name: '购物车'
    },
    {
      src: '/pages/my/index',
      name: '我的'
    }
  ]

  private memberLinks: ILink[] = [
    {
      src: '/pages/member/index',
      name: '会员中心'
    },
    {
      src: '/member/info',
      name: '会员信息'
    }
  ]

  private otherLinks: ILink[] = [
    {
      src: '/pages/login/index',
      name: '登录'
    },
    {
      src: '/pages/register/index',
      name: '注册'
    },
    {
      src: '/pages/setting/index',
      name: '设置'
    },
    {
      src: '/pages/search/index',
      name: '搜索'
    },
    {
      src: '/pages/address/index',
      name: '收货地址'
    },
    {
      src: '/pages/appendAddress/index',
      name: '添加收货地址'
    },
    {
      src: '/pages/orders/index',
      name: '我的订单'
    },
    {
      src: '/pages/collection/index',
      name: '我的收藏'
    }
    // {
    //   src: '/integral',
    //   name: '积分'
    // },
    // {
    //   src: '/withdrawal',
    //   name: '收入提现'
    // },
    // {
    //   src: '/incomedetails',
    //   name: '收入明细'
    // }
    // {
    //   src: '/myrelationship',
    //   name: '我的客户'
    // },
    // {
    //   src: '/extension',
    //   name: '推广中心'
    // },
    // {
    //   src: '/distribution',
    //   name: '分销商'
    // },
    // {
    //   src: '/distributionOrder',
    //   name: '分销订单'
    // }
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
