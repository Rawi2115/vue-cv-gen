<script setup>
import { BiLinkedin } from "oh-vue-icons/icons";
import html2pdf from "html2pdf.js";

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

const emit = defineEmits(["previousStep"]);
const handlePreviousStep = () => {
  emit("previousStep");
};

const generatePDF = () => {
  const element = document.getElementById("cv-preview");
  const opt = {
    margin: 1,
    filename: "myCV.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf().from(element).set(opt).save();
};
</script>

<template>
  <section
    class="py-20 flex flex-col justify-center items-center"
    v-if="props.currentStep === props.step"
  >
    <div>
      <Button @click="handlePreviousStep" class="mr-4">Back</Button>
      <Button class="mb-4" @click="generatePDF">Download as PDF</Button>
      <div id="cv-preview" class="preview-container bg-white">
        <div class="left-column">
          <h2 class="section-title">Personal Information</h2>
          <p class="section-content">
            Name: {{ props.data.information.fullName }}
          </p>
          <p class="section-content">
            Email:
            <a href="mailto:john.doe@example.com">{{
              props.data.information.email
            }}</a>
          </p>
          <p class="section-content">
            LinkedIn:
            <a href="https://linkedin.com/in/johndoe" target="_blank">{{
              props.data.information.linkedin
            }}</a>
          </p>
          <p class="section-content">
            GitHub:
            <a href="https://github.com/johndoe" target="_blank">{{
              props.data.information.github
            }}</a>
          </p>
        </div>
        <div class="right-column">
          <h2 class="section-title">Experience</h2>
          <ul v-for="experience in props.data.experiences">
            <li class="flex gap-2">
              <p class="section-content capitalize">
                Company name: {{ experience?.companyName }}
              </p>
              <p class="section-content capitalize">
                Job Title: {{ experience?.jobTitle }}
              </p>
              <p class="section-content">
                Duration: {{ experience?.duration }}
              </p>
            </li>
          </ul>
        </div>
        <div class="right-column">
          <h2 class="section-title">Education</h2>
          <ul>
            <li v-for="education in props.data.education" class="flex gap-4">
              <p class="section-content capitalize">
                School/College name: {{ education?.school }}
              </p>
              <p class="section-content capitalize">
                Course name: {{ education?.courseName }}
              </p>
              <p class="section-content">Duration: {{ education?.duration }}</p>
            </li>
          </ul>
        </div>
        <div class="right-column">
          <h2 class="section-title">Skills</h2>
          <ul class="flex flex-wrap gap-4">
            <li v-for="skill in props.data.skills" class="flex gap-4">
              <p class="section-content capitalize">
                {{ skill?.skill }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.preview-container {
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 0 auto;
  padding: 20px;

  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.left-column,
.right-column {
  width: 100%;
  padding: 20px;
}

.left-column {
}

.right-column {
}

.section-title {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #333;
}

.section-content {
  font-size: 1em;
  color: #666;
}

@media (max-width: 1024px) {
  .preview-container {
    width: 90vw;
    height: auto;
    /* flex-direction: row; */
  }
}

@media (max-width: 768px) {
  .preview-container {
    width: 100vw;
    height: auto;
    flex-direction: column;
  }

  .left-column {
    width: 100%;
    padding: 10px;
  }
}
</style>
