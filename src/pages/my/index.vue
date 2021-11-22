<template>
  <div class="my">
    <div class="head">
      <i class="van-icon van-icon-setting-o"></i>
      <div class="head-img">
        <div><img src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" alt="" srcset="" /></div>
        <div class="img-desc">
          <div>Hello World</div>
          <div>1314520</div>
        </div>
      </div>
    </div>
    <div class="van-grid-container">
      <div class="van-grid-title">
        <div>我的订单</div>
        <div class="sub-title">
          查看全部订单
          <i class="van-icon van-icon-arrow"></i>
        </div>
      </div>
      <van-grid>
        <van-grid-item icon="pending-payment" text="待付款" />
        <van-grid-item icon="idcard" text="待发货" />
        <van-grid-item icon="logistics" text="待收货" />
        <van-grid-item icon="gold-coin-o" text="退款/售后" />
      </van-grid>
    </div>

    <div class="van-grid-container">
      <div class="van-grid-title">常用服务</div>
      <van-grid>
        <van-grid-item icon="gold-coin-o" text="我的财务" />
        <van-grid-item icon="pending-payment" text="地址管理" />
        <van-grid-item icon="idcard" text="我的收藏" />
        <van-grid-item icon="logistics" text="在线服务" />
      </van-grid>
    </div>
  </div>
</template>
<style scoped lang="scss">
.van-grid-container {
  background-color: #fff;
  margin-bottom: 10px;
  .van-grid-title {
    font-size: 16px;
    color: #000;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .sub-title {
      color: #c0c4cc;
      font-size: 14px;
    }
  }
}

.my {
  position: relative;
  height: 100%;
  background-color: #fafafa;
  .head {
    height: 180px;
    background-color: chocolate;
    position: relative;
    .head-img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      img {
        width: 70px;
        height: 70px;
        display: block;
        border-radius: 50%;
      }
      .img-desc {
        font-size: 12px;
        color: #fff;
        margin-top: 10px;
      }
    }
    .van-icon-setting-o {
      position: absolute;
      top: 10px;
      right: 10px;
      color: #fff;
      font-size: 18px;
    }
  }
}
</style>
