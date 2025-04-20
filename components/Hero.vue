<script setup lang="ts">
defineOptions({
  name: 'Hero',
})
</script>
<template>
  <v-parallax
    src="/imgs/heroImage.jpg"
    class="tw-relative tw-h-[400px] md:tw-h-[500px]"
  >
    <div class="tw-absolute tw-inset-0 tw-bg-black/60 tw-z-10"></div>
    <v-container class="tw-h-full">
      <v-row class="tw-h-full tw-items-center tw-justify-center">
        <v-col cols="12" sm="8" md="6" class="tw-text-center">
          <h1
            class="tw-text-4xl md:tw-text-6xl tw-font-bold tw-mb-6 tw-text-white"
          >
          Movie library
          </h1>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>
