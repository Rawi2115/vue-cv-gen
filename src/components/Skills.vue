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
  skill: yup.string().required("Skill is required"),
};
const schema = yup.object({
  skills: yup.array().of(yup.object().shape(formSchema)),
});
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});
const { remove, push, fields } = useFieldArray("skills");
const appendSkill = () => {
  push({ skill: "" });
};
const removeSkill = (index) => {
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
      appendSkill();
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
            <label :for="`skills[${idx}].skill`"> Skill </label>
            <Field :name="`skills[${idx}].skill`" v-slot="{ field, meta }">
              <InputText v-bind="field" placeholder="Enter a skill" />
            </Field>
            <ErrorMessage :name="`skills[${idx}].skill`" />
          </div>

          <Button type="button" v-if="idx > 0" @click="removeSkill(idx)">
            Remove skill
          </Button>
        </div>
        <div class="buttonContainer">
          <Button type="button" @click="handlePreviousStep">Back</Button>

          <Button type="button" @click="appendSkill">Add Skill</Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  </section>
</template>
