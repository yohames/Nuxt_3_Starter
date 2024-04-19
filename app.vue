<template>
  <NuxtLayout>

    <NuxtLoadingIndicator
      :height="5"
      color="repeating-linear-gradient(to right,#009688 0%,#6ec8c0 50%,#009688 100%)"
    />
    <NuxtPage class="font-body" />
  </NuxtLayout>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: 300ms ease all;
}
.page-enter-from,
.page-leave-to {
  scale: 1;
  opacity: 0;
  transform: translatex(-7px);
}

.layout-enter-active,
.layout-leave-active {
  transition: 300ms ease all;
}
.layout-enter-from,
.layout-leave-to {
  scale: 1;
  opacity: 0;
  transform: translatex(-7px);
}
</style>
