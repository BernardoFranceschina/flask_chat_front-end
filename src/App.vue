<template>
  <div id="app">
    <v-app-bar
      :collapse="!collapseOnScroll"
      :collapse-on-scroll="collapseOnScroll"
      absolute
      color="deep-purple accent-4"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Collapsing Bar</v-toolbar-title>
    </v-app-bar>
    <router-view />
  </div>
</template>

<script>
export default {
  data: () => ({
    collapseOnScroll: true
  })
}
</script>
