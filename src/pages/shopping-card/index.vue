<template>
  <div class="shopping-card">
    <van-submit-bar :price="3050" button-text="结算">
      <van-checkbox>全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送,
        <span>修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>
