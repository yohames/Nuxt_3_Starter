<script setup>
import { useField, useForm } from "vee-validate";

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: undefined,
  },
  placeholder: {
    type: String,
    default: "Select",
    required: false,
  },
  name: {
    type: String,
    default: undefined,
    required: true,
  },
  rules: {
    type: String,
    default: undefined,
    required: false,
  },
  type: {
    type: String,
    default: "text",
    required: false,
  },
});
const emit = defineEmits(["update:modelValue"]);
const { handleSubmit } = useForm({});

const items = ref({});
provide("selectable", items);

const socialMediaItems = ref([
  {
    id: 1,
    name: "Facebook",
    icon: "https://cdn-icons-png.flaticon.com/512/3128/3128304.png",
  },
  {
    id: 2,
    name: "Twitter",
    icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png ",
  },
  {
    id: 3,
    name: "Instagram",
    icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
  },
]);

let socialMediaLinks = ref([]);
const socialPicker = ref(null);
const submit = handleSubmit(async (values, { resetForm }) => {
  // socialPicker.value.set();
  socialMediaLinks.value.push({ ...items.value });
  resetForm();
});
function removeSocial(index) {
  socialMediaLinks.value.splice(index, 1);
}
</script>
<template>
  <div
    class="relative flex flex-col gap-y-4 rounded-lg shadow-md p-2 pt-5 ring-2 ring-gray-200"
  >
    <span
      class="absolute -top-4 text-base px-3 bg-gray-200 rounded-lg text-gray-600"
      >Social Media</span
    >
    <ul class="flex gap-x-5 gap-y-3 flex-wrap">
      <li
        class="flex gap-x-2 px-2 py-0.5 text-base items-center ring-1 ring-gray-300 shadow-md hover:shadow-lg rounded-md"
        v-for="(i, index) in socialMediaLinks"
        :title="i?.social_media_link"
      >
        <img
          :src="i?.social?.icon || '/images/select_icon.png'"
          class="w-4 h-4"
        />
        <small>{{ i?.social?.name }}</small>
        <Icon
          @click="removeSocial(index)"
          name="iconamoon:close-light"
          class="hover:scale-125 duration-150 cursor-pointer hover:text-red-500"
        />
      </li>
    </ul>
    <div class="flex-1">
      <HTextField
        :rules="rules"
        name="social_media_link"
        v-model="items.social_media_link"
        :placeholder="placeholder"
        leadingIconClass="border-r-[1px] border-gray-300"
        iconLeadingClass="pl-2"
        trailing-icon="ph:link"
        id="link"
        class="text-gray-600 focus:border-primary dark:bg-gray-500 dark:text-white duration-200 rounded-none"
      >
        <template #leading>
          <div class="flex items-center">
            <HMenuDropdown
              v-model="items.social"
              rules="required"
              name="social-media"
              placeholder="Select social media"
              popup-class="z-[100] absolute left-0 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              :items="socialMediaItems"
              ref="socialPicker"
            >
              <template #button="{ selected }">
                <button
                  type="button"
                  class="p-3 rounded-l-md flex gap-x-1 items-center text-sm justify-center bg-gray-300 py-2.5 hover:bg-gray-50 duration-150 focus:outline-none"
                >
                  <img
                    :src="selected?.icon || '/images/select_icon.png'"
                    class="w-6 h-6"
                  />
                </button>
              </template>
              <template #list="{ item }">
                <div class="flex gap-x-2">
                  <img :src="item.icon" class="w-6 h-6" />
                  {{ item.name }}
                </div>
              </template>
            </HMenuDropdown>
          </div>
        </template>

        <template #button>
          <button
            @click="submit"
            type="submit"
            class="text-white bg-gray-300 hover:bg-primary hover:ring-primary self-center text-base rounded-r-lg ring-1 ring-gray-300 py-2.5 px-4"
          >
            Add
          </button>
        </template>
      </HTextField>
    </div>
  </div>
</template>
