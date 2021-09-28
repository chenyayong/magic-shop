<template>
  <div class="layout-top">
    <el-row class="layout-bar" type="flex" justify="end" align="middle">
      <span class="page-title">页面名称：</span>
      <el-input clearable placeholder="请输入页面名称" style="width: 250px;"></el-input>
      <span class="return-list">返回列表</span>
      <span class="page-save">保存</span>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.layout-top {
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 50px;
  background: #ffffff;
  box-shadow: 2px 0px 8px 0px #bcc3ce;
  z-index: 3;
  .layout-bar {
    height: 100%;
    flex-flow: row nowrap;
    font-size: 15px;
    font-weight: bold;
    .page-title {
      color: $--color-primary;
    }
    .return-list {
      height: 100%;
      border-left: 1px solid #e8eaec;
      text-align: center;
      color: #3f4245;
      cursor: pointer;
      display: flex;
      align-items: center;
      margin-left: 30px;
      padding: 0 30px;
    }
    .page-save {
      height: 100%;
      background-color: $--color-primary;
      color: #ffffff;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 0 30px;
    }
  }
}
</style>
