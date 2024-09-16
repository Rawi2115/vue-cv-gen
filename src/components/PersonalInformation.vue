<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
defineProps({
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
const emit = defineEmits(["nextStep", "dataEmit"]);
const schema = yup.object({
  fullName: yup.string().required("Fullname is required"),
  email: yup.string().email().required("Email is required"),
  linkedin: yup
    .string()
    .matches(/(www\.)?linkedin\.com\/.*$/, "Incorrect Link")
    .required("LinkedIn profile link is required"),
  github: yup
    .string()
    .matches(/^https:\/\/(www\.)?github\.com\/.*$/, "Incorrect Link")
    .required("GitHub profile link is required"),
});
const { defineField, handleSubmit, resetForm, errors } = useForm({
  validationSchema: schema,
});
const [fullName] = defineField("fullName");
const [email] = defineField("email");
const [linkedin] = defineField("linkedin");
const [github] = defineField("github");
const onSubmit = handleSubmit((values) => {
  emit("dataEmit", { information: values });
  emit("nextStep");
});
</script>
<template>
  <section v-if="currentStep == step" class="py-20">
    <div class="formContainer">
      <form class="formClass" @submit="onSubmit">
        <div class="innerContainer">
          <div class="inputContainer">
            <label for="fullName">Fullname</label>
            <InputText
              v-model="fullName"
              aria-describedby="fullName-help"
              :class="{ 'p-invalid': errors.fullName }"
              placeholder="Fullname"
            />
            <small id="fullName-help" class="text-red-600">{{
              errors.fullName
            }}</small>
          </div>
          <div class="inputContainer">
            <label for="email">Email</label>
            <InputText
              v-model="email"
              aria-describedby="email-help"
              :class="{ 'p-invalid': errors.email }"
              placeholder="Email"
            />
            <small id="email-help" class="text-red-600">{{
              errors.email
            }}</small>
          </div>
          <div class="inputContainer">
            <label for="linkedin">Linkedin</label>
            <InputText
              v-model="linkedin"
              aria-describedby="linkedin-help"
              :class="{ 'p-invalid': errors.linkedin }"
              placeholder="Linkedin profile link"
            />
            <small id="linkedin-help" class="text-red-600">{{
              errors.linkedin
            }}</small>
          </div>
          <div class="inputContainer">
            <label for="github">Github</label>
            <InputText
              v-model="github"
              aria-describedby="github-help"
              :class="{ 'p-invalid': errors.github }"
              placeholder="Github profile link"
            />
            <small id="github-help" class="text-red-600">{{
              errors.github
            }}</small>
          </div>
        </div>
        <div class="flex justify-end pr-7">
          <Button type="submit"> Next </Button>
        </div>
      </form>
    </div>
  </section>
</template>
