<script setup>
import { ErrorMessage, Field, useFieldArray, useForm } from "vee-validate";
import { onMounted, watch } from "vue";
import * as yup from "yup";
const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  step: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["nextStep", "dataEmit", "previousStep"]);
const formSchema = {
  companyName: yup.string().required("Company name is required"),
  jobTitle: yup.string().required("Job Title is required"),
  duration: yup.string().required("Duration is required"),
};
const schema = yup.object({
  experiences: yup.array().of(yup.object().shape(formSchema)),
});
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});
const { remove, push, fields } = useFieldArray("experiences");
const appendExperience = () => {
  push({ companyName: "", jobTitle: "", duration: "" });
};
const removeExperience = (index) => {
  remove(index);
};
const onSubmit = handleSubmit((values) => {
  emit("dataEmit", values);
  emit("nextStep");
});
const handlePreviousStep = () => {
  emit("previousStep");
};

watch(
  () => props.currentStep,
  (newStep) => {
    if (newStep == props.step) {
      appendExperience();
    }
  },
  { immediate: true }
);
</script>
<template>
  <section v-if="props.currentStep == props.step" class="py-20">
    <div class="formContainer">
      <form class="formClass" @submit="onSubmit">
        <div class="innerContainer" v-for="(field, idx) in fields" :key="idx">
          <div class="inputContainer">
            <label :for="`experiences[${idx}].companyName`">
              Company Name
            </label>
            <Field
              :name="`experiences[${idx}].companyName`"
              v-slot="{ field, meta }"
            >
              <InputText v-bind="field" placeholder="Enter company name" />
            </Field>
            <ErrorMessage :name="`experiences[${idx}].companyName`" />
          </div>
          <div class="inputContainer">
            <label :for="`experiences[${idx}].jobTitle`"> Job Title </label>
            <Field
              :name="`experiences[${idx}].jobTitle`"
              v-slot="{ field, meta }"
            >
              <InputText v-bind="field" placeholder="Enter job title" />
            </Field>
            <ErrorMessage :name="`experiences[${idx}].jobTitle`" />
          </div>
          <div class="inputContainer">
            <label :for="`experiences[${idx}].duration`"> Duration </label>
            <Field
              :name="`experiences[${idx}].duration`"
              v-slot="{ field, meta }"
            >
              <InputText v-bind="field" placeholder="Enter duration" />
            </Field>
            <ErrorMessage :name="`experiences[${idx}].duration`" />
          </div>
          <Button type="button" v-if="idx > 0" @click="removeExperience(idx)">
            Remove experience
          </Button>
        </div>
        <div class="buttonContainer">
          <Button type="button" @click="handlePreviousStep">Back</Button>

          <Button type="button" @click="appendExperience"
            >Add Experience</Button
          >
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  </section>
</template>
