<script lang="ts" setup>
const drawer = ref(null)
const route = useRoute()
</script>

<template>
  <v-navigation-drawer v-model="drawer" color="brown-lighten-5">
    <v-list-item
      prepend-avatar="https://img.freepik.com/free-vector/flat-illustration-customer-support_23-2148878580.jpg?w=826&t=st=1680563213~exp=1680563813~hmac=36ec1d835cb2f002ab756b5bd4f8b69fd61fe1234e67444f18616194ab0aa90a"
      title="ADMIN PANEL"
    />
    <v-divider />
    <v-list nav>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard" to="/dashboard" />
      <v-list-item prepend-icon="mdi-view-list" title="Items" value="item" to="/items" />
      <v-list-item prepend-icon="mdi-image-filter-frames" title="Warehouse" value="warehouse" to="/warehouse" />
      <v-list-item prepend-icon="mdi-format-list-bulleted-type" title="Category" value="category" to="/category" />
      <v-list-item prepend-icon="mdi-nature-people" title="Vendor" value="vendor" to="/vendor" />
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block color="blue-lighten-1"> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <v-app-bar color="blue-lighten-1">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>HayoDagang / {{ route.name }}</v-toolbar-title>
  </v-app-bar>
</template>

<style scoped></style>
