<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
})

interface IProducts {
  name: string
  code: string
  price: number
  vendor: string
}
interface IWarehouse {
  warehouseName: string
  warehouseCode: string
  warehouseLocation: string
  buildingName: string
  vendor: string[]
  products: IProducts[]
}

const page = ref<number>(1)
const warehouse = ref<IWarehouse[]>([
  {
    warehouseName: 'Warehouse 1',
    warehouseCode: 'CXP879SD',
    warehouseLocation: 'Tanah abang 2',
    buildingName: 'Ruko Majapahit',
    vendor: ['CELL PHONE', 'WIZ OTOMOTIVE'],
    products: [
      {
        name: 'Iphone 14 Pro Max',
        code: 'NFK485K',
        price: 22000000,
        vendor: 'CELL PHONE',
      },
      {
        name: 'Samsung Galaxy Note 12',
        code: 'JKL8629N',
        price: 18000000,
        vendor: 'CELL PHONE',
      },
    ],
  },
  {
    warehouseName: 'HayoDagang Warehouse',
    warehouseCode: 'HK90818A',
    warehouseLocation: 'Jakarta Pusat',
    buildingName: 'Ruko Arya',
    vendor: ['HayoDagang'],
    products: [
      {
        name: 'Iphone 14 Pro Max',
        code: 'NFK485K',
        price: 22000000,
        vendor: 'CELL PHONE',
      },
      {
        name: 'Iphone 14 Pro Max',
        code: 'UK89302X',
        price: 20000000,
        vendor: 'JAYA PHONE',
      },
      {
        name: 'Samsung Galaxy Note 12',
        code: 'YFB98672Z',
        price: 18000000,
        vendor: 'WIZ PHONE',
      },
    ],
  },
])
</script>

<template>
  <v-container>
    <v-card elevation="1">
      <v-card-title>
        <v-row>
          <v-col cols="10" align-self="center"> List Warehouse </v-col>
          <v-col cols="=2" align-self="center" align="end">
            <v-btn variant="plain" icon color="primary">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row justify="center">
          <v-col cols="12">
            <v-text-field
              label="Search Warehouse"
              density="compact"
              variant="outlined"
              color="primary"
              append-inner-icon="mdi-magnify"
              hide-details
            />
          </v-col>
          <v-col cols="12">
            <v-table>
              <thead>
                <tr>
                  <th>Warehouse Name</th>
                  <th>Warehouse Code</th>
                  <th>Warehouse Location</th>
                  <th>Building Name</th>
                  <th>Vendor</th>
                  <th>Products</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, indexWarehouse) in warehouse" :key="indexWarehouse">
                  <td>{{ item.warehouseName }}</td>
                  <td>{{ item.warehouseCode }}</td>
                  <td>{{ item.warehouseLocation }}</td>
                  <td>{{ item.buildingName }}</td>
                  <td>
                    <v-chip
                      v-for="(vendor, indexVendor) in item.vendor"
                      :key="indexVendor"
                      density="compact"
                      :color="vendor === 'HayoDagang' ? 'primary' : 'red-lighten-3'"
                      class="ma-1"
                    >
                      {{ vendor }}
                    </v-chip>
                  </td>
                  <td align="center">
                    <v-btn variant="plain" density="compact" icon color="primary">
                      <v-icon size="18">mdi-eye</v-icon>
                    </v-btn>
                  </td>
                  <td align="center">
                    <v-btn variant="plain" density="compact" icon color="info">
                      <v-icon size="18">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn variant="plain" density="compact" icon color="error">
                      <v-icon size="18">mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
          <v-col cols="12" justify="end">
            <v-pagination v-model="page" :length="300" :total-visible="10" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped></style>
