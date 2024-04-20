<script setup>
import { useField } from "vee-validate";

import { useDebounceFn } from "@vueuse/core";

const props = defineProps({
  id: String,
  leadingIcon: Boolean,
  trailingIcon: String,
  query: Object,
  items: {
    type: Array,
    default: () => [],
  },
  placeholder: String,
  label: String,
  labelClass: String,
  clearable: Boolean,
  returnObject: Boolean,
  listLeadingIcon: Boolean,
  listLeadingImage: Boolean,
  iconOnly: Boolean,
  modelValue: {
    type: [String, Number, Object, Boolean],
    default: undefined,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
    required: false,
  },
  labelClass: {
    type: String,
    default: "",
    required: false,
  },
  rules: {
    type: String,
    default: "",
    required: false,
  },
  class: {
    type: String,
    default: "",
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  listHeight: String,
  placeholderStyle: String,
  hideDetail: {
    type: Boolean,
    default: true,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue", "returnedObject"]);
const selected = ref("");
const { items } = toRefs(props) || [];
const show = ref(false);
const placeholder = ref("");
const input = ref(null);
const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

const outside = useDebounceFn(() => {
  show.value = false;
}, 300);

const set = (item) => {
  inputValue.value = item["id"];
  show.value = false;
  if (props.returnObject) {
    emit("update:modelValue", item);
  } else {
    emit("update:modelValue", item.id);
    emit("returnedObject", item);
    selected.value = item.id;
  }
};
const clear = () => {
  placeholder.value = undefined;
  inputValue.value = "";
  show.value = false;
  input.value.focus();
  emit("update:modelValue", undefined);
};

watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal;
    selected.value = newVal;
    let selectedItem = props.items.find((item) => item.id == newVal);
    if (selectedItem) {
      placeholder.value = selectedItem.name;
    }
  }
);

onMounted(() => {
  let selectedItem = props.items.find((item) => item.id == props.modelValue);
  if (selectedItem) {
    inputValue.value = selectedItem.id;
    selected.value = props.modelValue;
    placeholder.value = selectedItem.name;
  }
});
</script>
<template>
  <div class="relative">
    <div class="flex gap-x-2">
      <slot name="label"> </slot>
    </div>
    <div class="relative rounded-md shadow-sm font-body">
      <div
        v-if="leadingIcon && !disabled"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <Icon :name="inputValue.leadingImage" v-if="listLeadingIcon" />
        <img
          :src="
            items.find((e) => e.id == inputValue)?.leadingImage ||
            'https://api.iconify.design/mdi/link.svg'
          "
          v-if="listLeadingImage"
          class="w-5 h-5"
        />
      </div>
      <input
        ref="input"
        v-model="placeholder"
        @click="show = true"
        @focus="show = true"
        @blur="outside"
        autocomplete="off"
        :type="type"
        :placeholder="props.placeholder || 'Select'"
        :name="props.name"
        :id="id"
        class="block w-full pr-10 focus:outline-none md:text-base text-sm rounded-md dark:bg-secondary-hover dark:text-white"
        :class="[
          errorMessage
            ? 'focus:ring-red-500 focus:border-red-500 hover:border-red-500 border-red-500 '
            : 'focus:ring-primary focus:border-primary hover:border-primary/70 border-gray-300 border-1',
          disabled ? ' bg-gray-100 cursor-not-allowed' : '',
          props.class ? props.class : '',
          props.placeholderStyle
            ? props.placeholderStyle
            : ' placeholder-gray-500',
        ]"
        :disabled="disabled"
        aria-invalid="true"
        aria-describedby="email-error"
      />
      <!-- icon -->
      <div
        v-if="clearable && !disabled && inputValue"
        @click="clear"
        class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
      >
        <Icon
          name="gg:close"
          width="25"
          height="25"
          color="gray"
          class="cursor-pointer"
        />
      </div>
      <div
        v-else
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none z-[99]"
      >
        <Icon name="tabler:chevron-down" width="25" height="25" color="gray" />
      </div>
    </div>
    <ul
      v-show="show"
      class="absolute z-50 overflow-y-scroll overflow-x-hidden w-full bg-white dark:bg-secondary-hover border border-gray-300 shadow max-h-56 h-auto rounded-md text-base"
      :class="listHeight ? listHeight : ''"
    >
      <li
        v-for="item in items"
        :key="item.id"
        @click="set(item)"
        :class="{
          'bg-primaryLite/30 dark:bg-gray-400/30': selected == item.id,
        }"
        class="border-b border-gray-200 select-none relative py-3 px-3 hover:bg-primary/5 dark:hover:bg-gray-400/30 text-secondary dark:text-white cursor-pointer overflow-auto"
      >
        <div
          class="flex items-center justify-between"
          :class="[
            labelClass
              ? labelClass
              : 'text-secondary dark:text-white font-normal block font-body',
          ]"
        >
          <div class="flex items-center gap-x-3">
            <Icon :name="item.leadingImage" v-if="listLeadingIcon" />
            <img
              :src="item.leadingImage"
              v-if="listLeadingImage"
              class="w-5 h-5"
            />
            <span class="block capitalize break-words" v-if="!iconOnly">{{
              item.name
            }}</span>
          </div>
          <div class="flex space-x-1">
            <p
              class="text-sm text-secondary dark:text-white font-light"
              v-if="item.identifier"
            >
              {{ item.identifier }}
            </p>
            <Icon
              v-if="placeholder == item.name"
              name="ic:round-check"
              width="25"
              height="25"
              class="cursor-pointer dark:text-white text-primary"
            />
          </div>
        </div>
      </li>
    </ul>
    <p
      v-if="!hideDetail"
      class="col-span-5 mt-1 font-body text-sm text-red-600 duration-300 transition-all"
      :visible="errorMessage"
      :class="errorMessage ? 'h-5' : 'h-0'"
      id="email-error"
    >
      {{ errorMessage }} &nbsp;
    </p>
  </div>
</template>
<style scoped>
.zz {
  z-index: 99;
}

::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px white;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #80cbc4;
  border-radius: 3px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #80cbc4;
}
</style>
