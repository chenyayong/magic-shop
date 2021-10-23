<template>
  <div class="system-link">
    <el-collapse v-model="activeName">
      <el-collapse-item title="商城页面" name="1">
        <el-row>
          <el-col :span="4" v-for="(item, index) in homeLinks" :key="index">
            <span class="item-link" :class="[item.active ? 'is-active' : '']" @click="selectLinks(item, homeLinks)">{{ item.name }}</span>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="会员中心" name="2">
        <el-row>
          <el-col :span="4" v-for="(item, index) in memberLinks" :key="index">
            <span class="item-link" :class="[item.active ? 'is-active' : '']" @click="selectLinks(item, memberLinks)">{{ item.name }}</span>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="其他链接" name="3">
        <el-row>
          <el-col :span="4" v-for="(item, index) in otherLinks" :key="index">
            <span class="item-link" :class="[item.active ? 'is-active' : '']" @click="selectLinks(item, otherLinks)">{{ item.name }}</span>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

interface link {
  name: string
  active?: boolean
}

@Component({
  name: 'SystemLink'
})
export default class extends Vue {
  private activeName = ['1', '2', '3']
  private homeLinks: link[] = [
    {
      name: '商城首页'
    },
    {
      name: '分类导航'
    },
    {
      name: '全部商品'
    }
  ]

  private memberLinks: link[] = [
    {
      name: '会员中心'
    },
    {
      name: '会员信息'
    },
    {
      name: '我的订单'
    },
    {
      name: '购物车'
    },
    {
      name: '我的收藏'
    },
    {
      name: '我的足迹'
    },
    {
      name: '我的优惠券'
    },
    {
      name: '会员充值'
    },
    {
      name: '余额明细'
    }
  ]

  private otherLinks: link[] = [
    {
      name: '积分'
    },
    {
      name: '收入提现'
    },
    {
      name: '收入明细'
    },
    {
      name: '收货地址'
    },
    {
      name: '添加收货地址'
    },
    {
      name: '我的客户'
    },
    {
      name: '推广中心'
    },
    {
      name: '分销商'
    },
    {
      name: '分销订单'
    },
    {
      name: '售后列表'
    },
    {
      name: '领券中心'
    },
    {
      name: '搜索'
    },
    {
      name: '登录'
    },
    {
      name: '注册'
    }
  ]

  get getSelectLink() {
    const homeLink = this.homeLinks.find((item) => item.active)
    const memberLink = this.memberLinks.find((item) => item.active)
    const otherLink = this.otherLinks.find((item) => item.active)
    const link = homeLink || memberLink || otherLink
    return link
  }

  selectLinks(link: link, links: link[]) {
    this.homeLinks.forEach((item) => this.$set(item, 'active', false))
    this.memberLinks.forEach((item) => this.$set(item, 'active', false))
    this.otherLinks.forEach((item) => this.$set(item, 'active', false))
    const item = links.find((e) => e === link) as link
    this.$set(item, 'active', true)
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
