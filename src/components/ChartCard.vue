<script setup>

defineProps({
  imgUrl: String,
  title: String,
  number: Number
})
</script>

<template>
  <v-card variant="elevated" hover class="cursor-default" color="grey-lighten-5">
    <v-card-item :prepend-avatar="imgUrl">
      <template v-slot:prepend>
        <v-avatar rounded="0" class="mx-2"></v-avatar>
      </template>
      <v-card-title>
        {{ number }}
      </v-card-title>
      <v-card-subtitle>
        {{ title }}
      </v-card-subtitle>
    </v-card-item>

    <v-divider></v-divider>
    <v-card-text class="pt-0 d-flex justify-center">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>