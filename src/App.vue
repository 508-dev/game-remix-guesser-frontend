<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <div id="nav">
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/about">About</RouterLink>
  </div>
  <router-view/>
  <div class="grass"></div>
  <div class="ground"></div>
</template>

<style>

* {
  font-family: "Press Start 2P";
}
body {
    background-color: var(--saddle-brown);
}
.grass {
    height: 2vh;
    background-color: var(--lawn-green);
}
.ground {
    height: 2vh;
    background-color: var(--dark-green);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: var(--light-cornflower-blue);

}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: var(--harley-davidson-orange);
      border-bottom: 4px double var(--harley-davidson-orange);
    }
  }
}
</style>
