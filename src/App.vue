<script setup>
import { ref, watch } from "vue";
import StepperHeader from "./components/StepperHeader.vue";
import StepperStep from "./components/StepperStep.vue";
import PersonalInformation from "./components/PersonalInformation.vue";
import Experiences from "./components/Experiences.vue";
import Skills from "./components/Skills.vue";
import Education from "./components/Education.vue";
import Preview from "./components/Preview.vue";
const currentStep = ref(1);
const data = ref([]);
const handleNextStep = () => {
  currentStep.value++;
};
const handlePreviousStep = () => {
  currentStep.value--;
};
const handleDataUpdate = (formData) => {
  data.value = { ...data.value, ...formData };
};
</script>
<template>
  <h1 class="text-center text-2xl pt-2">Cv Generator</h1>
  <StepperHeader>
    <StepperStep :currentStep="currentStep" :step="1"
      >Personal Information</StepperStep
    >
    <StepperStep :currentStep="currentStep" :step="2">Experiences</StepperStep>
    <StepperStep :currentStep="currentStep" :step="3">Skills</StepperStep>
    <StepperStep :currentStep="currentStep" :step="4">Education</StepperStep>
    <StepperStep :currentStep="currentStep" :step="5">Preview</StepperStep>
  </StepperHeader>

  <PersonalInformation
    :currentStep="currentStep"
    :step="1"
    :data="data"
    @dataEmit="handleDataUpdate"
    @nextStep="handleNextStep"
  />
  <Experiences
    :currentStep="currentStep"
    :step="2"
    :data="data"
    @dataEmit="handleDataUpdate"
    @nextStep="handleNextStep"
    @previousStep="handlePreviousStep"
  />
  <Skills
    :currentStep="currentStep"
    :step="3"
    :data="data"
    @dataEmit="handleDataUpdate"
    @nextStep="handleNextStep"
    @previousStep="handlePreviousStep"
  />
  <Education
    :currentStep="currentStep"
    :step="4"
    :data="data"
    @dataEmit="handleDataUpdate"
    @nextStep="handleNextStep"
    @previousStep="handlePreviousStep"
  />
  <Preview
    :currentStep="currentStep"
    :step="5"
    :data="data"
    @dataEmit="handleDataUpdate"
    @nextStep="handleNextStep"
    @previousStep="handlePreviousStep"
  />
</template>
