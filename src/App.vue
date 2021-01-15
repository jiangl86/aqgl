<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
//后期用一个方法来处理数据初始化
// const styles = getComputedStyle(document.documentElement);
// const styles = getComputedStyle(document.querySelector(":root"));
// document.documentElement.style.setProperty("--normalSize", "20px");
// const value = String(styles.getPropertyValue("--normalSize")).trim();
// console.log(value);
</script>
<style>
@import "~assets/css/base.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
