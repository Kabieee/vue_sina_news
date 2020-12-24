<template>
  <div id="app">
    <div id="container">
      <div id="top-first">{{ this.$store.state.globalTitle }}</div>
      <router-view></router-view>
    </div>
  </div>


  <!--    <div id="nav">-->
  <!--      <router-link to="/">Home</router-link> |-->
  <!--      <router-link to="/about">About</router-link>-->
  <!--    </div>-->
  <!--    <router-view/>-->


</template>

<style lang="scss" scoped>
#app {
  display: flex;
  justify-content: center;
}
#container {
  margin-top: 3vh;
  width: 1200px;
  #top-first {
      font-size: 20px;
  }
  #top-second {
    margin-top: 2vh;
    height: 15vh;
    width: 30vw;
    background-color: #f2f2f2;
    //background: #42b983;
  }

}

</style>
