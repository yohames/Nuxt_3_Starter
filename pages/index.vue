<script setup>
const base64File = ref();
const item = ref({});
const items = ref([]);
const order = ref([]);
const checkedItems = ref([]);
const loading = ref(false);
const total = ref(0);
const limit = ref(0);
const offset = ref(0);
const search = ref();
const headers = ref([
  { text: "Name", value: "name" },
  { text: "Position", value: "position" },
  { text: "Bio", value: "bio" },
]);
const uploadLoading = ref(false);
function uploadFile(file) {
  uploadLoading.value = true;
  setTimeout(() => {
    uploadLoading.value = false;
    console.log("This is me", file.value);
    item.value.description_image = file;
  }, 2000);
}
</script>
<template>
  <div class="relative m-10 p-10 bg-gray-100 min-h-screen rounded-xl">
    <CommonThemSwitcher
      class="flex justify-center items-center absolute right-10"
    />

    <div class="text-2xl text-green-500 flex flex-col gap-y-10">
      <h1 class="text-4xl text-center font-bold">Nuxt 3 Starter</h1>
      <HTextField
        rules="required|email"
        name="email"
        placeholder="Email"
        leading-icon="mdi:email-outline"
        leadingIconClass="border-r-[1px] border-gray-300"
        iconLeadingClass="pl-14"
        trailing-icon="cil:search"
        class="text-gray-600 focus:border-primary dark:bg-gray-500 dark:text-white duration-200"
      >
        <template #label>
          <h1 class="block text-lg font-medium leading-6 mb-2 duration-200">
            Email address <span class="text-red-600">*</span>
          </h1>
        </template>
      </HTextField>
      <div class="flex">
        <HTextArea
          :rows="7"
          name="Description"
          label="Description"
          label-class="mb-2 font-medium text-lg text-secondary"
          supporter-class="shadow-sm w-full"
          class="w-full"
          :maxLength="200"
        />
        <!-- <HTextEditor
          v-model="item.textDescription"
          name="bot_post_description"
          toolbar="full"
          label=""
          height="95vh"
        /> -->
      </div>

      <div class="flex gap-x-10 items-center">
        <HDatePicker
          v-model="item.published_at"
          name="Published At"
          label="Published on"
          labelClass="pb-2 text-sm font-medium text-secondary"
          class="flex-1"
        >
        </HDatePicker>
        <HEthiopianDatePicker
          v-model="item.deadline"
          name="Deadline"
          rules="required"
          class="flex-1"
        >
          <template v-slot:label>
            <div class="pb-2 text-lg font-body font-medium dark:text-white">
              Deadline
              <span class="text-red-500">*</span>
            </div>
          </template>
        </HEthiopianDatePicker>

        <div class="flex-1">
          <HSocialMediaSelector
            rules="required|url"
            name="social_media"
            placeholder="https://..."
          >
          </HSocialMediaSelector>
        </div>
      </div>

      <ClientOnly>
        <HTable
          :headers="headers"
          :items="items"
          v-model:sort="order"
          v-model:checkedItems="checkedItems"
          :loading="loading"
          :hasCheckBox="false"
          rowStyle="font-light"
          rowHeadStyle="bg-gray-200"
          supporterClass="overflow-auto pb-20 bg-white"
          @click:row="
            editMode = false;
            clickRow;
          "
        >
          <template v-slot:row="{ item, headers }">
            <td
              v-for="header in headers"
              :key="header.value"
              class="px-2 text-sm border-b py-2 text-secondary"
            >
              <HRow :item="item" :header="header">
                <template #action="{ item }">
                  <div class="flex max-w-[14rem]" v-if="tabs.name == 'Invoice'">
                    <button
                      class="px-2 w-auto text-xs flex gap-x-1 ring-1 ring-primary/30 items-center py-1 self-start rounded-lg bg-primaryLite"
                      @click="clickRow(item, 'invoice')"
                    >
                      <Icon
                        name="basil:invoice-outline"
                        class="text-primary disabled:cursor-not-allowed text-base"
                        aria-hidden="true"
                      />
                      <span>Invoice</span>
                    </button>
                  </div>
                  <HeadlessMenu
                    v-else
                    as="div"
                    class="relative inline-block text-left"
                  >
                    <div>
                      <HeadlessMenuButton
                        class="rounded-full hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 p-1"
                        @click.stop=""
                      >
                        <Icon
                          name="pepicons-pencil:dots-y"
                          class="text-secondary font-bold"
                          aria-hidden="true"
                          size="25"
                        />
                      </HeadlessMenuButton>
                    </div>
                    <transition
                      enter-active-class="transition duration-100 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-75 ease-in"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >
                      <HeadlessMenuItems
                        class="z-20 absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div class="px-1 py-1">
                          <HeadlessMenuItem v-slot="{ active }" @click.stop="">
                            <button
                              class="px-1 w-full flex items-center py-2 self-start rounded-lg hover:bg-primaryLite"
                              @click="
                                editMode = false;
                                clickRow(item, 'payment');
                              "
                            >
                              <Icon
                                name="ant-design:eye-outlined"
                                class="text-primary disabled:cursor-not-allowed mr-2 text-2xl shrink-0"
                                aria-hidden="true"
                              />
                              Review Payment
                            </button>
                          </HeadlessMenuItem>
                          <HeadlessMenuItem v-slot="{ active }" @click.stop="">
                            <button
                              class="px-1 w-full flex items-center py-2 self-start rounded-lg hover:bg-primaryLite"
                              @click="
                                editMode = true;
                                clickRow(item, 'payment');
                              "
                            >
                              <Icon
                                name="iconamoon:edit-duotone"
                                class="text-primary disabled:cursor-not-allowed mr-2 text-2xl shrink-0"
                              />
                              Edit
                            </button>
                          </HeadlessMenuItem>
                        </div>
                      </HeadlessMenuItems>
                    </transition>
                  </HeadlessMenu>
                </template>
              </HRow>
            </td>
          </template>
        </HTable>
      </ClientOnly>
      <div class="flex">
        <div class="flex-1">
          <HImageCropper
            name="log"
            v-model="base64File"
            :uploaded="item.description_image"
            image-class="w-auto"
            @upload="uploadFile"
            :crop-max-hight="10000"
            :crop-max-width="10000"
            rules="required"
            :loading="uploadLoading"
          ></HImageCropper>
        </div>
        <div class="flex-1">
          <DashboardChart />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
