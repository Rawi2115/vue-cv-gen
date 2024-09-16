<template>
  <h1 :class="currentStep == step ? 'underline' : ''">
    <slot></slot>
  </h1>
</template>
<script setup>
defineProps({
  step: Number,
  currentStep: Number,
});
</script>
