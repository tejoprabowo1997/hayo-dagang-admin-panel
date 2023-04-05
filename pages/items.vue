<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
})

interface IItems {
  name: string
  code: string
  unit: 'KG' | 'GR' | 'ONS' | 'PCS' | 'BAL' | 'LUSIN'
  price: number
  condition: 'NEW' | 'SECOND'
  qty: number
  warehouse: string
  vendor: string
}

const items = ref<IItems[]>([
  {
    name: 'Iphone 14 Pro Max',
    code: 'IC8378XX',
    unit: 'PCS',
    price: 22000000,
    condition: 'NEW',
    qty: 12,
    warehouse: 'Warehouse 1',
    vendor: 'CELL PHONE',
  },
  {
    name: 'Iphone 14 Pro Max',
    code: 'KJ9883UU',
    unit: 'PCS',
    price: 20000000,
    condition: 'NEW',
    qty: 5,
    warehouse: 'Warehouse 1',
    vendor: 'RICH PHONE',
  },
  {
    name: 'Samsung Galaxy Note 12',
    code: 'IC8378XX',
    unit: 'PCS',
    price: 18000000,
    condition: 'SECOND',
    qty: 22,
    warehouse: 'Warehouse 1',
    vendor: 'WIZ OTOMOTIVE',
  },
])
</script>

<template>
  <v-container>
    <v-card elevation="1">
      <v-card-title>
        <v-row>
          <v-col cols="10" align-self="center"> Items </v-col>
          <v-col cols="2" align="end">
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
              label="Search Item"
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
                  <th>Name</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Condition</th>
                  <th>Qty</th>
                  <th>Warehouse</th>
                  <th>Vendor</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, indexItem) in items" :key="indexItem">
                  <td>{{ item.name }}</td>
                  <td>{{ item.unit }}</td>
                  <td>{{ useCurrencyView(`${item.price}`) }}</td>
                  <td>{{ item.condition }}</td>
                  <td>{{ item.qty }}</td>
                  <td>{{ item.warehouse }}</td>
                  <td>{{ item.vendor }}</td>
                  <td>
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
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped></style>
