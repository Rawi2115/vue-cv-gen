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
  school: yup.string().required("Skill is required"),
  duration: yup.string().required("Duration is required"),
  couresName: yup.string().required("Course name is required"),
};
const schema = yup.object({
  education: yup.array().of(yup.object().shape(formSchema)),
});
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});
const { remove, push, fields } = useFieldArray("education");
const appendEducation = () => {
  push({ school: "", duration: "", couresName: "" });
};
const removeEducation = (index) => {
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
      appendEducation();
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
            <label :for="`education[${idx}].school`"> school </label>
            <Field :name="`education[${idx}].school`" v-slot="{ field, meta }">
              <InputText v-bind="field" placeholder="Enter a school" />
            </Field>
            <ErrorMessage :name="`education[${idx}].school`" />
          </div>
          <div class="inputContainer">
            <label :for="`education[${idx}].couresName`"> Course Name </label>
            <Field
              :name="`education[${idx}].couresName`"
              v-slot="{ field, meta }"
            >
              <InputText v-bind="field" placeholder="Enter a coures name" />
            </Field>
            <ErrorMessage :name="`education[${idx}].couresName`" />
          </div>
          <div class="inputContainer">
            <label :for="`education[${idx}].duration`"> Duration </label>
            <Field
              :name="`education[${idx}].duration`"
              v-slot="{ field, meta }"
            >
              <InputText v-bind="field" placeholder="Enter a duration" />
            </Field>
            <ErrorMessage :name="`education[${idx}].duration`" />
          </div>

          <Button type="button" v-if="idx > 0" @click="removeEducation(idx)">
            Remove Education
          </Button>
        </div>
        <div class="buttonContainer">
          <Button type="button" @click="handlePreviousStep">Back</Button>

          <Button type="button" @click="appendEducation">Add Education</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  </section>
</template>
