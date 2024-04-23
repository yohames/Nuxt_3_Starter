<script setup>
import { useDebounceFn, onClickOutside } from "@vueuse/core";
const showList = ref(false);
const items = ref([
  { id: "1", name: "One" },
  { id: "2", name: "Two" },
]);
const listRef = ref(null);
onClickOutside(listRef, (e) => (showList.value = false));
const loading = ref(true);

function select(itm) {
  console.log("Selected", itm);
}
</script>
<template>
  <ul>
    <li
      ref="listRef"
      @click="showList = true"
      :class="[
        'bg-white px-4 py-2 text-lg  ring-1 ring-gray-300 mb-1',
        showList ? 'rounded-t-lg' : 'rounded-lg',
      ]"
    >
      Select
    </li>
    <ul
      :class="[
        'bg-gray-100 ring-2 ring-gray-300 shadow-md rounded-b-lg overflow-clip',
        showList ? '' : 'hidden',
      ]"
    >
      <li class="px-2 p-2">
        <input
          type="text"
          class="bg-white px-4 p-1 text-lg w-full rounded-lg"
          placeholder="Search . . ."
          @click="showList = true"
          @focus="showList = true"
          @blur="showList = false"
        />
      </li>
      <li class="h-1">
        <HProgress
          v-if="loading"
          class="rounded-xl w-full"
          color1="bg-primary/40"
          color2="bg-primary"
          color3="bg-dark-blue"
          height="h-1"
        ></HProgress>
      </li>
      <slot name="list" :items="items" />
    </ul>
  </ul>
</template>

<style scoped></style>
