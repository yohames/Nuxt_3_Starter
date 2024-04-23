<script setup>
const props = defineProps({
  modelValue: {
    type: [Object, Function, String],
  },
  name: {
    type: String,
    default: "Area",
  },
  placeHolder: {
    type: String,
    default: "Select",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  prefix: String,
  textClass: {
    type: [String, Boolean],
    default: true,
  },
  rules: String,
  showLabel: {
    type: Boolean,
    default: true,
  },
  hideDetail: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: "text-gray-800",
  },
  labelClass: {
    type: String,
  },
  disableClass: {
    type: String,
    default: "",
  },
  init: {
    type: [Object, Array, String],
  },
  client: {
    type: String,
    default: "default",
  },
  role: {
    type: String,
    default: "core:basic",
  },
});

const emits = defineEmits(["update:modelValue", "update:name"]);

const items = ref([
  {
    id: "1",
    name: "Abel",
    picture:
      "https://images.unsplash.com/photo-1601576084861-5de423553c0f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    name: "Bereket",
    picture:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    name: "Daniel",
    picture:
      "https://plus.unsplash.com/premium_photo-1661265882272-baf497d7a0a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "4",
    name: "Elsa",
    picture:
      "https://images.unsplash.com/photo-1674553101741-5f5302a8c355?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]);
const helper = ref({});

const search = ref();
const limit = ref(10);

// const filter = computed(() => {
//   let default_filter = {};
//   if (search.value) {
//     default_filter.name = { _ilike: `%${search.value}%` };
//   }
//   return default_filter;
// });

const role = ref("console:admin");
// const { onResult, onError, loading, refetch } = lists_composable(
//   fetch_instructors,
//   {
//     filter: filter,
//     limit: limit,
//     role,
//   }
// );

// onResult(({ data }) => {
//   if (data) {
//     console.log("show the data", data);
//     items.value = data.muya?.items;
//   }
//   if (props.modelValue) {
//     helper.value.instructor_id = props.modelValue;
//   }
//   if (props.init) {
//     items.value.push(props.init);
//   }
// });

const onSearch = (value) => {
  search.value = value;
};

const getValue = (value) => {
  if (!value) {
    if (!props.textClass) return;
    emits("update:modelValue", undefined);
    emits("update:name", undefined);
  } else {
    emits("update:modelValue", value.id);
    emits("update:name", value.name);
  }
};
const loading = ref(false);
</script>
<template>
  <div class="w-full z-10">
    <HNewListSearchSelect
      v-model="helper.area"
      v-model:selected="helper.instructor_id"
      @search="onSearch"
      :items="items"
      @onSelectionFound="getValue"
      :name="name"
      :placeHolder="placeHolder"
      :trailingIcon="!helper.instructor_id ? 'tabler:chevron-down' : undefined"
      :clearable="helper.instructor_id ? true : false"
      :class="['placeholder-gray-500 font-body text-base h-10', props.class]"
      :loading="loading"
      supporter="h-52"
      :hideDetail="hideDetail"
      :disabled="disabled"
      :disableClass="disableClass"
      :rules="rules"
      class="focus:ring-primary"
    >
      <template #list="{ items }">
        <li
          v-for="i in items"
          class="px-4 py-2 text-lg hover:gray-200 border-b-2 last:border-b-0"
          @click="select"
        >
          {{ i.name }}
        </li>
      </template>
    </HNewListSearchSelect>
  </div>
</template>
