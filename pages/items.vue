<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
})

const dataUser = useCookie<{ roleUser: string }>('roleUser')
const page = ref<number>(1)

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

interface IVendor {
  _id: string
  name: string
  categories: string | string[]
  code: string
  photo: string
}
const vendorList = ref<IVendor[]>([
  {
    _id: 'jksdo32rwk222',
    name: 'VENDOR 1',
    categories: ['GADGET', 'ACCESSORIES GADGET'],
    code: '798HYKMD',
    photo: 'https://th.bing.com/th/id/OIP._7R0RVNFpUGoHUiZcmK3cwHaE6?pid=ImgDet&rs=1',
  },
  {
    _id: '1893njdidj9n33',
    name: 'VENDOR 2',
    categories: 'AUTOMOTIVE',
    code: '9037HUNH',
    photo:
      'https://th.bing.com/th/id/R.83037415d2e627433d75ba6d90332b34?rik=PlOsRpRMazm4SQ&riu=http%3a%2f%2fimages.allpeoplequilt.mdpcdn.com%2fsites%2fallpeoplequilt.com%2ffiles%2fstyles%2fslide__view_all__thumbnail%2fpublic%2fimg_sanfranciscolg_ss2.jpg%3fitok%3d-8hpkzgJ&ehk=BEswAQPbW3gh%2bOmM0E62DxCqD5tTDDGbUUk7UFvK120%3d&risl=&pid=ImgRaw&r=0',
  },
])

const dialogAddItem = ref<boolean>(false)

const vendorName = ref<string | null>(null)
const vendorSelected = ref<IVendor>({
  _id: '',
  name: '',
  categories: '',
  code: '',
  photo: '',
})
const vendorNameRules = [
  (value: any) => {
    if (value?.length > 1) return true
    return 'Vendor Name is required'
  },
]

const categoriesShowed = ref<string[]>([])
const categorySelected = ref<string | null>()
const categorySelectedRules = [
  (value: any) => {
    if (value?.length > 1) return true
    return 'Category is required'
  },
]

const itemName = ref<string | null>(null)
const itemNameRules = [
  (value: any) => {
    if (value?.length > 1) return true
    return 'Item Name is required'
  },
]

const itemCode = ref<string | null>(null)
const itemCodeRules = [
  (value: any) => {
    if (value?.length > 1) return true
    return 'Item Code is required'
  },
]

const unitList = ref<string[]>([
  'PCS',
  'DOS',
  'REAM',
  'KWINTAL',
  'TON',
  'KILOGRAM',
  'GRAM',
  'MILILITER',
  'METER',
  'CENTIMETER',
])
const unitSelected = ref<string | null>(null)
const unitSelectedRules = [
  (value: any) => {
    if (value?.length > 1) return true
    return 'Item Unit is required'
  },
]

const saveProcess = () => {
  console.log('ok')
}
</script>

<template>
  <v-container>
    <v-card elevation="1">
      <v-card-title>
        <v-row>
          <v-col cols="10" align-self="center"> Items </v-col>
          <v-col cols="2" align="end">
            <v-dialog v-model="dialogAddItem" persistent max-width="600">
              <template v-slot:activator="{ props }">
                <v-btn variant="plain" icon color="primary" v-bind="props">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-form @submit="saveProcess">
                <v-card>
                  <v-toolbar color="primary">
                    <v-toolbar-title> Tambah Produk Baru </v-toolbar-title>
                    <v-spacer />
                    <v-btn
                      icon
                      variant="plain"
                      color="error"
                      @click="
                        () => {
                          dialogAddItem = false
                        }
                      "
                    >
                      <v-icon> mdi-close </v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" v-if="dataUser.roleUser === 'ADMIN'">
                        <v-autocomplete
                          :items="vendorList"
                          v-model="vendorName"
                          label="Vendor Name"
                          density="compact"
                          variant="outlined"
                          color="primary"
                          item-title="name"
                          item-value="_id"
                          :rules="vendorNameRules"
                          @update:model-value="
                            (value: string) => {
                              vendorList.find((vendor: IVendor) => {
                                if (vendor._id === value) {
                                  vendorSelected._id = vendor._id
                                  vendorSelected.name = vendor.name
                                  vendorSelected.code = vendor.code
                                  vendorSelected.categories = vendor.categories
                                  vendorSelected.photo = vendor.photo

                                  categorySelected = null
                                  categoriesShowed = []
                                  if (typeof vendorSelected.categories !== 'string') categoriesShowed = vendorSelected.categories
                                  else categoriesShowed.push(vendorSelected.categories)
                                }
                              })
                            }
                          "
                        />
                        <div v-if="vendorName">
                          <v-container>
                            <v-card elevation="0" color="grey-lighten-2">
                              <v-card-title> Vendor Detail </v-card-title>
                              <v-divider />
                              <v-card-text>
                                <v-row>
                                  <v-col cols="4" align-self="center">
                                    <v-img :src="vendorSelected.photo" cover class="rounded" />
                                  </v-col>
                                  <v-col cols="8" align-self="center">
                                    <v-row no-gutters>
                                      <v-col cols="12">
                                        NAME: <span class="font-weight-bold">{{ vendorSelected.name }}</span>
                                      </v-col>
                                      <v-col cols="12">
                                        CODE: <span class="font-weight-bold">{{ vendorSelected.code }}</span>
                                      </v-col>
                                      <v-col cols="12">
                                        CATEGORY:
                                        <v-chip
                                          v-if="typeof vendorSelected.categories === 'string'"
                                          density="compact"
                                          variant="outlined"
                                          color="warning"
                                        >
                                          {{ vendorSelected.categories }}
                                        </v-chip>
                                        <v-chip
                                          v-else
                                          v-for="(category, indexCategory) in vendorSelected.categories"
                                          :key="indexCategory"
                                          density="compact"
                                          variant="outlined"
                                          color="warning"
                                        >
                                          {{ category }}
                                        </v-chip>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                              </v-card-text>
                            </v-card>
                          </v-container>
                        </div>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          v-model="categorySelected"
                          :items="categoriesShowed"
                          label="Select Category"
                          density="compact"
                          variant="outlined"
                          color="primary"
                          :messages="categoriesShowed.length === 0 ? 'Please choose vendor first' : ''"
                          :rules="categorySelectedRules"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="itemName"
                          label="Item Name"
                          density="compact"
                          variant="outlined"
                          color="primary"
                          clearable
                          :rules="itemNameRules"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="itemCode"
                          label="Item Code"
                          density="compact"
                          variant="outlined"
                          color="primary"
                          clearable
                          :rules="itemCodeRules"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          v-model="unitSelected"
                          :items="unitList"
                          label="Item Unit"
                          density="compact"
                          variant="outlined"
                          color="primary"
                          :rules="unitSelectedRules"
                        />
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-divider />
                  <v-card-actions class="justify-center">
                    <v-btn variant="tonal" color="primary" type="submit"> Simpan Produk Baru </v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-dialog>
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
          <v-col cols="12" justify="end">
            <v-pagination v-model="page" :length="300" :total-visible="10" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped></style>
