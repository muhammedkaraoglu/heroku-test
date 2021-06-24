<template>
  <v-container class="py-8 px-6" fluid>
    <v-sheet min-height="20vh" rounded="lg">
      <v-form ref="storeNoteForm" @submit.prevent>
        <div class="sheet-header">
          <h3 class="title text-xl">Yeni Not Oluştur</h3>
          <v-btn
            type="submit"
            @click="validate"
            :disabled="sending"
            :loading="sending"
            color="success"
            >KAYDET</v-btn
          >
        </div>
        <div class="sheet-content">
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="model.title"
                label="Not Başlığı"
                :rules="titleRules"
                :error-messages="errors.title"
                counter
                clearable
                clear-icon="mdi-close-circle"
                prepend-icon="mdi-text"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-textarea
                v-model="model.description"
                label="Not Açıklaması"
                :error-messages="errors.description"
                rows="4"
                row-height="30"
                counter
                clearable
                clear-icon="mdi-close-circle"
                prepend-icon="mdi-comment"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div id="editorjs"></div>
            </v-col>
          </v-row>
        </div>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
import AppLayout from "@/Layouts/AppLayout";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
export default {
  name: "PageDashboard",
  layout: AppLayout,
  props: {
    notes: Array,
    errors: Object,
  },
  data() {
    return {
      sending: false,
      model: this.$inertia.form({
        title: "",
        description: "",
      }),
      titleRules: [
        (v) => !!v || "Başlık alanı gereklidir.",
        (v) =>
          (v && v.length >= 3) ||
          "Balık alanı 3 karakter değerinden büyük olmalıdır.",
      ],
    };
  },
  methods: {
    validate() {
      let form = this.$refs.storeNoteForm;
      if (form.validate()) {
        this.store();
      }
    },
    store() {
      this.$inertia.post(route("app.api.note.store"), this.model, {
        preserveScroll: true,
        onStart: () => (this.sending = true),
        onSuccess: (page) => {
          if (Object.keys(this.$page.props.errors).length === 0) {
            this.model.reset();
            this.$refs.storeNoteForm.resetValidation();
          }
        },
        onFinish: () => (this.sending = false),
      });
    },
  },
  mounted: function () {
    const editor = new EditorJS({
      placeholder: "Not Açıklaması",
      tools: {
        header: {
          class: Header,
          inlineToolbar: ["link"],
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
      },
    });
  },
  created: function () {},
};
</script>