<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  modelValue: [String, Date],
  name: {
    type: String,
    default: undefined,
    required: true,
  },
  id: String,
  rules: {
    type: String,
    default: "",
    required: false,
  },
  label: String,
  labelClass: {
    type: String,
    default: () => "",
    required: false,
  },
  placeholder: String,
  disabled: Boolean,
  min: [String, Date],
  max: [String, Date],
  value: {
    type: [String, Date],
    default: () => new Date("01-01-2001"),
    required: false,
  },
  svgIcon: {
    type: String,
    default:
      '<svg xmlns="http://www.w3.org/2000/svg" style="color:#203468;transform:scale(.5)" fill="#203468" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>',
    required: false,
  },
  rules: {
    type: String,
    default: "",
    required: false,
  },
  showStar: {
    type: Boolean,
    default: true,
  },
  leadingIcon: {
    type: String,
    default: "ic:outline-calendar-month",
  },
  leadingIconClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

const minDate = ref(props.min);
const maxDate = ref(props.max);

watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal;
  }
);

const input = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>

<template>
  <div>
    <label
      :class="labelClass"
      :for="id"
      class="flex gap-x-2 items-center dark:text-white"
      ><Icon
        :name="leadingIcon"
        :class="leadingIconClass || 'text-xl text-primary dark:text-primary-2'"
      />{{ label }}
      <span v-show="rules !== '' && props.showStar" class="text-red-500"
        >*</span
      ></label
    >
    <div class="relative rounded-md shadow-sm">
      <input
        v-model="inputValue"
        :disabled="disabled"
        type="date"
        @input="input($event)"
        @change="input($event)"
        :id="id"
        :min="minDate"
        :max="maxDate"
        :class="[
          errorMessage
            ? 'focus:ring-red-500 focus:border-red-500 hover:border-red-500 border-red-500'
            : 'focus:ring-primary  focus:border-primary hover:border-primary-2 border-gray-300 border-1',
          props.disabled
            ? 'bg-gray-100 dark:bg-secondary-hover border-gray-200 hover:border-gray-200 text-gray-400 pointer-events-none shadow-none'
            : ' focus:ring-1',
        ]"
        class="block w-full text-secondary dark:text-white placeholder-primary focus:outline-none text-base rounded-md dark:bg-secondary-hover"
        aria-invalid="true"
        aria-describedby="date-error"
      />
    </div>
    <p
      :visible="errorMessage"
      class="text-sm text-red-600"
      :class="errorMessage ? 'h-5 mt-2' : 'h-0 mt-0'"
      id="email-error"
    >
      {{ errorMessage }} &nbsp;
    </p>
  </div>
</template>

<style scoped>
[type="date"]::-webkit-inner-spin-button {
  display: none;
}
[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  opacity: 0;
  padding: 5px;
  width: 100%;
  cursor: pointer;
}
</style>
