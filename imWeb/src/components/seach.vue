<template>
  <div class="empty">
    <img src="./../assets/img/seach_empty.svg"/>
    <div>请输入搜索关键字</div>
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