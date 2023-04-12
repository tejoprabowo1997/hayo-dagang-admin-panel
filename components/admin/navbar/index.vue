<script lang="ts" setup>
const drawer = ref(true)
const route = useRoute()
const router = useRouter()
const dataUser = useCookie<{ roleUser: string }>('roleUser')
</script>

<template>
  <v-navigation-drawer v-model="drawer" color="brown-lighten-5">
    <v-list-item
      prepend-avatar="https://img.freepik.com/free-vector/flat-illustration-customer-support_23-2148878580.jpg?w=826&t=st=1680563213~exp=1680563813~hmac=36ec1d835cb2f002ab756b5bd4f8b69fd61fe1234e67444f18616194ab0aa90a"
      :title="`${dataUser.roleUser} PANEL`"
    />
    <v-divider />
    <v-list nav>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard" to="/dashboard" />
      <v-list-item
        v-if="dataUser.roleUser === 'ADMIN' || dataUser.roleUser === 'VENDOR'"
        prepend-icon="mdi-view-list"
        title="Data Produk"
        value="Data Produk"
        to="/items"
      />
      <v-list-item
        v-if="dataUser.roleUser === 'ADMIN' || dataUser.roleUser === 'VENDOR'"
        prepend-icon="mdi-home-modern"
        :title="dataUser.roleUser === 'ADMIN' ? 'Data Gudang' : 'Lokasi Gudang'"
        :value="dataUser.roleUser === 'ADMIN' ? 'Data Gudang' : 'Lokasi Gudang'"
        to="/warehouse"
      />
      <v-list-item
        v-if="dataUser.roleUser === 'ADMIN'"
        prepend-icon="mdi-format-list-bulleted-type"
        title="Data Kategori"
        value="Data Kategori"
        to="/category"
      />
      <v-list-item
        v-if="dataUser.roleUser === 'ADMIN'"
        prepend-icon="mdi-nature-people"
        title="Data Vendor"
        value="Data vendor"
        to="/vendor"
      />
      <v-list-item
        v-if="dataUser.roleUser === 'ADMIN'"
        prepend-icon="mdi-nature-people"
        title="Data Seller"
        value="Data Seller"
      />
      <v-list-item
        v-if="dataUser.roleUser === 'SELLER'"
        prepend-icon="mdi-shopping"
        title="Pesan Produk"
        value="Pesan Produk"
      />
      <v-list-item
        v-if="dataUser.roleUser === 'SELLER'"
        prepend-icon="mdi-folder-plus"
        title="Produk Masuk"
        value="Produk Masuk"
      />
      <v-list-item
        v-if="dataUser.roleUser === 'SELLER'"
        prepend-icon="mdi-view-list"
        title="Produk Anda"
        value="Produk Anda"
      />
      <v-list-item v-if="dataUser.roleUser === 'SELLER'" prepend-icon="mdi-folder-upload" value="Pesanan">
        <template v-slot:title>
          Produk di Pesan <v-chip color="error" density="compact" variant="outlined">12</v-chip>
        </template>
      </v-list-item>
      <v-list-item
        v-if="dataUser.roleUser === 'SELLER' || dataUser.roleUser === 'VENDOR'"
        prepend-icon="mdi-folder-remove"
        title="Produk Terjual"
        value="Produk Terjual"
      />
      <v-list-item
        v-if="dataUser.roleUser === 'SELLER'"
        prepend-icon="mdi-home-map-marker"
        title="Lokasi Toko"
        value="Lokasi Toko"
      />
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          block
          color="blue-lighten-1"
          @click="
            () => {
              router.push('/')
            }
          "
        >
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <v-app-bar color="blue-lighten-1">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>HayoDagang / {{ route.name }}</v-toolbar-title>
  </v-app-bar>
</template>

<style scoped></style>
