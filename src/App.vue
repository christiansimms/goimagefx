<!-- Below :key makes the page be refreshed, even if second navigation goes to same page but w/different params. -->
<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark">
      <span class="navbar-brand">Add Effects to Your Image</span>
    </nav>
    <nav aria-label="breadcrumb" role="navigation" v-if="breadcrumbs.length > 0">
      <ol class="breadcrumb">
        <li v-for="crumb in breadcrumbs.slice(0, -1)" class="breadcrumb-item">
          <router-link :to="crumb.path">{{crumb.name}}</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{breadcrumbs[breadcrumbs.length-1].name}}</li>
      </ol>
    </nav>

    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
  import BreadcrumbService from './components/BreadcrumbService'

  export default {
    name: 'app',
    mounted: function () {
      BreadcrumbService.eventBus.$on('update-breadcrumbs', breadcrumbs => {
        this.breadcrumbs = breadcrumbs
      })
    },
    data () {
      return {
        breadcrumbs: []
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
    margin-bottom: 2em; /* Add space at bottom so bottom slider is usable on mobile. */
  }

  /* Add a little space under navbar. */
  .navbar {
    margin-bottom: 1em;
  }

</style>
