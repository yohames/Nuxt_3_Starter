<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";
import ImageUploader from "quill-image-uploader";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "quill-image-uploader/dist/quill.imageUploader.min.css";
import upload_query from "@/query/file_upload.gql";
import mutator from "@/composables/mutator_with_role.js";

const item = ref({});
const props = defineProps({
  modelValue: {
    type: [String, Object, Array, Number],
  },
  rules: {
    type: String,
  },
  name: {
    type: String,
    default: undefined,
    required: true,
  },
  label: {
    type: String,
    default: "Description",
  },
  height: {
    type: [String, Number],
    default: "150px",
  },
  toolbar: {
    type: [String, Array],
    default: "minimal",
  },
});
const emit = defineEmits(["update:modelValue"]);

const { mutate, onDone, loading, onError } = mutator(upload_query);
function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const modules = [
  {
    name: "imageUploader",
    module: ImageUploader,
    options: {
      upload: (file) => {
        return new Promise(async (resolve, reject) => {
          console.log("what do we get here", file);

          const base64 = await readFileAsBase64(file);
          mutate({ file: base64, folder: "jobDescription" })
            .then(({ data }) => {
              console.log("show data", data);
              resolve(data?.upload_files?.extension?.secure_url);
            })
            .catch((error) => {
              console.error("Error:", error);
              reject("Upload failed");
            });
        });
      },
    },
  },
  {
    name: "blotFormatter",
    module: BlotFormatter,
    // options: {
    //   /* options */
    // },
  },
];

const content = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    if (newVal == "<p><br></p>") {
      emit("update:modelValue", undefined);
    } else {
      emit("update:modelValue", newVal);
    }
  },
});

const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal;
    emit("update:modelValue", newVal);
  }
);
</script>

<template>
  <div>
    <ClientOnly>
      <h1 class="my-2 ml-2" v-if="label">{{ label }}</h1>
      <QuillEditor
        theme="snow"
        contentType="html"
        :modules="modules"
        :content="content"
        v-model:content="content"
        :options="{
          placeholder: 'Text Description...',
        }"
        :toolbar="toolbar"
      />
      <p class="text-sm text-red-600 mt-2" v-if="errorMessage">
        {{ errorMessage }}
      </p>
    </ClientOnly>
  </div>
</template>
<style>
.ql-editor {
  height: v-bind(height);
}
.ql-toolbar.ql-snow {
  border-radius: 10px 10px 0px 0px;
}
.ql-container {
  border-radius: 0px 0px 10px 10px;
}
</style>
