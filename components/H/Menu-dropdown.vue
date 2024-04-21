<script setup>
import { useField, useForm } from "vee-validate";

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    default: undefined,
  },
  rules: {
    type: String,
    default: "",
    required: false,
  },
  name: {
    type: String,
    default: undefined,
    required: true,
  },

  placeholder: {
    type: String,
    default: "Select",
    required: false,
  },
  items: {
    type: [Array, Object],
    default: [],
    required: false,
  },
  popupClass: {
    type: String,
    default:
      "absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none",
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
const { handleSubmit } = useForm({});
const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

const selected = ref({});
const set = (item) => {
  // inputValue.value = item?.id;
  emit("update:modelValue", item);
  selected.value = item;
};
defineExpose({
  set,
});
</script>
<template>
  <div class="self-center text-right">
    <LazyClientOnly>
      <HeadlessMenu as="div" class="relative inline-block text-left">
        <div>
          <HeadlessMenuButton
            class="inline-flex w-full"
            :class="
              errorMessage
                ? '!ring-red-600  ring-1 rounded-l-md'
                : 'rounded-l-md ring-1 ring-gray-300 hover:ring-primary'
            "
          >
            <div v-if="$slots.button">
              <slot name="button" :selected="selected" />
            </div>
            <div
              v-else
              class="border-r-2 pr-2 pl-2 ml-0.5 flex items-center text-sm justify-center rounded-l-md bg-gray-50 py-2.5 hover:bg-gray-100 duration-150 focus:outline-none"
            >
              {{ selected?.name || placeholder }}
            </div>
          </HeadlessMenuButton>
          <small
            class="absolute text-sm -top-5 left-0 text-left whitespace-nowrap"
          >
            {{ errorMessage }}
          </small>
        </div>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <HeadlessMenuItems :class="popupClass">
            <ul class="px-1 py-1">
              <HeadlessMenuItem
                v-slot="{ active }"
                as="list"
                v-for="item in items"
              >
                <button
                  :key="item.id"
                  @click="set(item)"
                  type="button"
                  :class="[
                    active ? 'bg-primary/10 text-primary' : 'text-gray-400',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  <div v-if="$slots.list">
                    <slot name="list" :item="item" />
                  </div>
                  <div v-else>
                    {{ item.icon }}
                    {{ item.name }}
                  </div>
                </button>
              </HeadlessMenuItem>
            </ul>
          </HeadlessMenuItems>
        </transition>
      </HeadlessMenu>

      <template #fallback>
        <div
          class="py-3 px-5 ring-1 ring-gray-300 flex justify-center items-center bg-gray-300 animate-pulse rounded-l-md"
        >
          <Icon name="svg-spinners:3-dots-scale-middle" class="text-xl"></Icon>
        </div>
      </template>
    </LazyClientOnly>
  </div>
</template>
