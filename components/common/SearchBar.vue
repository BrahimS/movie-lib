<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label?: string
}>()
const emit = defineEmits(['update:modelValue', 'search'])

const model = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})

function onSearch() {
  emit('search')
}
</script>
<template>
  <v-row justify="center" class="search-bar">
    <v-col cols="12" sm="8" md="6">
      <v-text-field
        v-model="model"
        :label="label"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        elevation="16"
        hide-details
        @keyup.enter="onSearch"
      />
    </v-col>
  </v-row>
</template>

<style lang="scss">
.search-bar {
  margin-top: -100px;
  margin-bottom: 90px;
  & input {
    height: 80px;
  }
}
</style>
