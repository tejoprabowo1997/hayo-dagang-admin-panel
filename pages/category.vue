<script lang="ts" setup>
import { useToast } from 'vue-toastification'
const toast = useToast()

definePageMeta({
  layout: 'dashboard',
})

interface ICategory {
  name: string
  code: string
  used: number
}
interface IProducts {
  name: string
  code: string
  category: string
  buyPrice: number
  image: string
  desc: string
  vendorName: string
}
const categories = ref<ICategory[]>([
  {
    name: 'GADGET',
    code: 'GT',
    used: 2,
  },
])
const products = ref<IProducts[]>([
  {
    name: 'Iphone 14 Pro Max',
    code: 'GTCL00001',
    category: 'GADGET',
    buyPrice: 20000000,
    image: 'https://th.bing.com/th/id/OIP.VNjx1IuGuJpLTtzaaDz9BAHaJF?pid=ImgDet&rs=1',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    vendorName: 'CELL PHONE INDONESIA',
  },
  {
    name: 'Samsung Galaxy Note 12',
    code: 'GTCL00002',
    category: 'GADGET',
    buyPrice: 18000000,
    image: 'https://th.bing.com/th/id/OIP.9cTYVOBV2rFQENaZoccEEQHaHa?pid=ImgDet&rs=1',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    vendorName: 'CELL PHONE INDONESIA',
  },
])
const page = ref<number>(1)
const dialogAddNewCategory = ref<boolean>(false)
const dialogEditCategory = ref<boolean>(false)
const dialogDeleteCategory = ref<boolean>(false)
const dialogListProduct = ref<boolean>(false)
const categoryName = ref<string>('')
const categoryNameErr = ref<{ error: boolean; errMsg: string }>({
  error: false,
  errMsg: '',
})
const categoryCode = ref<string>('')
const categoryCodeErr = ref<{ error: boolean; errMsg: string }>({
  error: false,
  errMsg: '',
})

watch(categoryName, (val) => {
  categoryName.value = val.toUpperCase()
})

watch(categoryCode, (val) => {
  categoryCode.value = val.toUpperCase()
})

const validation = () => {
  let error = false
  categoryNameErr.value.error = false
  categoryNameErr.value.errMsg = ''
  categoryCodeErr.value.error = false
  categoryCodeErr.value.errMsg = ''

  if (!categoryName.value) {
    error = true
    categoryNameErr.value.error = true
    categoryNameErr.value.errMsg = 'Nama kategori wajib di isi!'
  }

  if (!categoryCode.value) {
    error = true
    categoryCodeErr.value.error = true
    categoryCodeErr.value.errMsg = 'Code kategori wajib di isi!'
  }

  return error
}

const saveCategory = async () => {
  const inputErr = validation()
  if (inputErr) return

  categories.value.push({
    name: categoryName.value,
    code: categoryCode.value,
    used: 0,
  })

  categoryNameErr.value.error = false
  categoryNameErr.value.errMsg = ''
  categoryCodeErr.value.error = false
  categoryCodeErr.value.errMsg = ''
  categoryName.value = ''
  categoryCode.value = ''

  dialogAddNewCategory.value = false
  toast.success('Category berhasil ditambah')
}

const setDataEditCategory = (dataCategory: ICategory) => {
  categoryNameErr.value.error = false
  categoryNameErr.value.errMsg = ''
  categoryCodeErr.value.error = false
  categoryCodeErr.value.errMsg = ''

  categoryName.value = dataCategory.name
  categoryCode.value = dataCategory.code
}

const updateCategory = async (dataCategory: ICategory) => {
  const inputErr = validation()
  if (inputErr) return

  dataCategory.name = categoryName.value
  dataCategory.code = categoryCode.value

  dialogEditCategory.value = false
  toast.success('Category berhasil diupdate')
}

const deleteCategory = (index: number) => {
  console.log(categories.value[index])
  console.log(index)
}
</script>

<template>
  <v-container>
    <v-card elevation="1">
      <v-card-title>
        <v-row no-gutters>
          <v-col cols="10" align-self="center"> List Category </v-col>
          <v-col cols="2" align-self="center" align="end">
            <v-tooltip text="Add new category" location="start">
              <template v-slot:activator="{ props }">
                <v-btn icon variant="plain" density="compact" color="primary" v-bind="props">
                  <v-dialog v-model="dialogAddNewCategory" persistent max-width="400">
                    <template v-slot:activator="{ props }">
                      <v-icon v-bind="props">mdi-plus</v-icon>
                    </template>
                    <v-card>
                      <v-card-title>
                        <v-row>
                          <v-col cols="10" align-self="center"> Add new category </v-col>
                          <v-col cols="=2" align-self="center" align="end">
                            <v-btn
                              icon
                              density="compact"
                              variant="plain"
                              color="error"
                              @click="dialogAddNewCategory = false"
                            >
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="categoryName"
                              label="Category name"
                              density="compact"
                              variant="outlined"
                              color="primary"
                              :error="categoryNameErr.error"
                              :error-messages="categoryNameErr.errMsg"
                            />
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="categoryCode"
                              label="Category code"
                              density="compact"
                              variant="outlined"
                              color="primary"
                              :error="categoryCodeErr.error"
                              :error-messages="categoryCodeErr.errMsg"
                            />
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-divider />
                      <v-card-actions>
                        <v-btn variant="elevated" color="primary" block @click="saveCategory">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
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
              label="Search Category"
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
                  <th class="text-left">Name</th>
                  <th class="text-center">Code</th>
                  <th class="text-center">Used</th>
                  <th class="text-center">Product</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, indexCategory) in categories" :key="indexCategory">
                  <td align="left">{{ item.name }}</td>
                  <td align="center">{{ item.code }}</td>
                  <td align="center">{{ item.used }}</td>
                  <td align="center">
                    <v-tooltip text="See product" location="start">
                      <template v-slot:activator="{ props }">
                        <v-btn density="compact" variant="plain" icon color="primary" v-bind="props">
                          <v-dialog v-model="dialogListProduct" persistent max-width="700" scrollable>
                            <template v-slot:activator="{ props }">
                              <v-icon size="18" v-bind="props">mdi-eye</v-icon>
                            </template>
                            <v-card>
                              <v-card-title>
                                <v-row>
                                  <v-col cols="10" align-self="center">
                                    Product by <i class="text-red">{{ item.name }}</i> category
                                  </v-col>
                                  <v-col cols="2" align-self="center" align="end">
                                    <v-btn icon variant="plain" color="error" @click="dialogListProduct = false">
                                      <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                  </v-col>
                                </v-row>
                              </v-card-title>
                              <v-divider />
                              <v-card-text>
                                <v-row>
                                  <v-col cols="12">
                                    <v-text-field
                                      label="Search product"
                                      density="compact"
                                      variant="outlined"
                                      color="primary"
                                      hide-details
                                      append-inner-icon="mdi-magnify"
                                    />
                                  </v-col>
                                  <v-col v-for="(product, indexProduct) in products" :key="indexCategory" cols="12">
                                    <v-sheet class="pa-4 rounded" color="grey-lighten-4" elevation="1">
                                      <v-row>
                                        <v-col cols="4">
                                          <v-row no-gutters>
                                            <v-col cols="12">
                                              <v-img :src="product.image" />
                                            </v-col>
                                            <v-col cols="12" align="center">
                                              {{ product.name }}
                                            </v-col>
                                          </v-row>
                                        </v-col>
                                        <v-col cols="8">
                                          <v-row>
                                            <v-col cols="12">
                                              <div class="font-weight-bold">Description</div>
                                              <div class="text-truncate">
                                                {{ product.desc }}
                                              </div>
                                            </v-col>
                                            <v-divider />
                                            <v-col cols="12">
                                              <div class="font-weight-bold">Buy Price</div>
                                              {{ useCurrencyView(`${product.buyPrice}`) }}
                                            </v-col>
                                            <v-divider />
                                            <v-col cols="12">
                                              <div class="font-weight-bold">Vendor</div>
                                              {{ product.vendorName }}
                                            </v-col>
                                            <v-col cols="12" align="end">
                                              <v-btn color="primary">View detail product</v-btn>
                                            </v-col>
                                          </v-row>
                                        </v-col>
                                      </v-row>
                                    </v-sheet>
                                  </v-col>
                                </v-row>
                              </v-card-text>
                            </v-card>
                          </v-dialog>
                        </v-btn>
                      </template>
                    </v-tooltip>
                  </td>
                  <td align="center">
                    <v-tooltip text="Edit Category" location="start">
                      <template v-slot:activator="{ props }">
                        <v-btn density="compact" variant="plain" icon color="info" v-bind="props">
                          <v-dialog v-model="dialogEditCategory" persistent max-width="400">
                            <template v-slot:activator="{ props }">
                              <v-icon size="18" v-bind="props" @click="setDataEditCategory(item)">mdi-pencil</v-icon>
                            </template>
                            <v-card>
                              <v-card-title>
                                <v-row>
                                  <v-col cols="10" align-self="center">
                                    Edit category <span class="text-red">{{ item.name }}</span>
                                  </v-col>
                                  <v-col cols="=2" align-self="center" align="end">
                                    <v-btn
                                      icon
                                      density="compact"
                                      variant="plain"
                                      color="error"
                                      @click="
                                        () => {
                                          dialogEditCategory = false
                                          categoryName = ''
                                          categoryCode = ''
                                        }
                                      "
                                    >
                                      <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                  </v-col>
                                </v-row>
                              </v-card-title>
                              <v-divider />
                              <v-card-text>
                                <v-row>
                                  <v-col cols="12">
                                    <v-text-field
                                      v-model="categoryName"
                                      label="Category name"
                                      density="compact"
                                      variant="outlined"
                                      color="primary"
                                      :error="categoryNameErr.error"
                                      :error-messages="categoryNameErr.errMsg"
                                    />
                                  </v-col>
                                  <v-col cols="12">
                                    <v-text-field
                                      v-model="categoryCode"
                                      label="Category code"
                                      density="compact"
                                      variant="outlined"
                                      color="primary"
                                      :error="categoryCodeErr.error"
                                      :error-messages="categoryCodeErr.errMsg"
                                    />
                                  </v-col>
                                </v-row>
                              </v-card-text>
                              <v-divider />
                              <v-card-actions>
                                <v-btn variant="elevated" color="warning" block @click="updateCategory(item)">
                                  Update
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-btn>
                      </template>
                    </v-tooltip>
                    <v-tooltip text="Delete category" location="end">
                      <template v-slot:activator="{ props }">
                        <v-btn density="compact" variant="plain" icon color="error" v-bind="props">
                          <v-dialog v-model="dialogDeleteCategory" persistent max-width="500">
                            <template v-slot:activator="{ props }">
                              <v-icon size="18" v-bind="props">mdi-delete</v-icon>
                            </template>
                            <v-card>
                              <v-card-title align="center">
                                Are you sure delete category {{ item.name }}?
                              </v-card-title>
                              <v-divider />
                              <v-card-text class="justify-center text-center">
                                <v-icon size="100" color="error">mdi-delete-empty</v-icon>
                              </v-card-text>
                              <v-card-actions>
                                <v-btn block variant="outlined" color="info" @click="dialogDeleteCategory = false">
                                  Cancel
                                </v-btn>
                              </v-card-actions>
                              <v-card-actions>
                                <v-btn block variant="outlined" color="error" @click="deleteCategory(indexCategory)">
                                  Yes i'am sure
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-btn>
                      </template>
                    </v-tooltip>
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
