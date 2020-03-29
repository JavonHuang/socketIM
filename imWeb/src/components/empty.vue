<template>
  <div class="empty">
    <img src="./../assets/img/empty.svg"/>
    <div>暂无相关内容</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.empty{
  margin: auto;
  img{
    height: 300px;
    // width: 300px;
  }
  div{
    display: block;
    color: $fontColor02;
    margin-top: 10px;
    font-size: 26px;
  }
}
</style>