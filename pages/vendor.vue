<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
})

interface IVendor {
  vendorName: string
  picName: string
  picPhone: string
  picEmail: string
  vendorCategory: string[]
}

const vendors = ref<IVendor[]>([
  {
    vendorName: 'CELL PHONE',
    picName: 'Angga Prayoga',
    picPhone: '081283774891',
    picEmail: 'angga@cellphone.co.id',
    vendorCategory: ['GADGET', 'MATERIAL'],
  },
  {
    vendorName: 'WIZ OTOMOTIVE',
    picName: 'Ryan Andriana',
    picPhone: '0838478932123',
    picEmail: 'ryan@wizotomotive.co.id',
    vendorCategory: ['OTOMOTIVE', 'TEKSTIL'],
  },
])

const page = ref<number>(1)
const dialogAddNewVendor = ref<boolean>(false)
const vendorName = ref<string>('')
const vendorPicName = ref<string>('')
const vendorPicPhone = ref<string>('')
const vendorPicEmail = ref<string>('')
const vendorCategory = ref<string[]>([])
</script>

<template>
  <v-container>
    <v-card elevation="1">
      <v-card-title>
        <v-row no-gutters>
          <v-col cols="10" align-self="center"> List Vendor </v-col>
          <v-col align-self="center" align="end">
            <v-tooltip text="Add new vendor" location="start">
              <template v-slot:activator="{ props }">
                <v-btn variant="plain" icon color="primary" v-bind="props">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row justify="center">
          <v-col cols="12">
            <v-text-field
              label="Search Vendor"
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
                  <th>Vendor Name</th>
                  <th>PIC Name</th>
                  <th>PIC Phone</th>
                  <th>PIC Email</th>
                  <th>Vendor Category</th>
                  <th align="center">Products</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(vendor, indexVendor) in vendors" :key="indexVendor">
                  <td>{{ vendor.vendorName }}</td>
                  <td>{{ vendor.picName }}</td>
                  <td>{{ vendor.picPhone }}</td>
                  <td>{{ vendor.picEmail }}</td>
                  <td>
                    <v-chip
                      v-for="(category, indexCategory) in vendor.vendorCategory"
                      :key="indexCategory"
                      density="compact"
                      color="red-lighten-3"
                      class="ma-1"
                    >
                      {{ category }}
                    </v-chip>
                  </td>
                  <td align="center">
                    <v-btn color="primary" variant="plain" icon density="compact">
                      <v-icon size="18">mdi-eye</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn color="info" variant="plain" icon density="compact">
                      <v-icon size="18">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn color="error" variant="plain" icon density="compact">
                      <v-icon size="18">mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
          <v-col cols="12">
            <v-pagination v-model="page" :length="300" :total-visible="10" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped></style>
