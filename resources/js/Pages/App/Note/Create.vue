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
                autocomplete="off"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <v-toolbar dense flat>
                <v-menu offset-x :close-on-content-click="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-emoticon-outline</v-icon>
                    </v-btn>
                  </template>

                  <v-sheet
                    class="
                      rounded-sm
                      !bg-gray-600
                      !text-gray-700
                      !border !border-gray-400
                    "
                    elevation="1"
                    height="600"
                    width="300"
                  >
                    <div class="w-full px-3 pt-3 fixed top-0">
                      <v-text-field
                        label="Emoji Ara..."
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                    <div
                      class="
                        w-full
                        overflow-y-auto
                        top-16
                        d-flex
                        flex-row flex-wrap
                        items-center
                        px-2
                        absolute
                        calc-h-full-16
                      "
                    >
                      <div
                        class="emoji-item w-10 p-2"
                        v-for="emoji in emojies"
                        :key="emoji"
                      >
                        <v-img
                          class="w-full cursor-pointer mr-3 mb-3"
                          :src="emoji"
                        />
                      </div>
                    </div>
                  </v-sheet>
                </v-menu>

                <v-btn icon>
                  <v-icon>mdi-image-area</v-icon>
                </v-btn>
              </v-toolbar>
              <v-divider></v-divider>
              <AceEditor selector="editor" @descPreview="setDescPreview" />
            </v-col>
            <v-col md="6">
              <v-toolbar dense flat>
                <v-icon class="mr-1">mdi-eye</v-icon>
                <v-toolbar-title>Önizleme</v-toolbar-title>
                <v-progress-linear
                  :active="previewLoading"
                  :indeterminate="previewLoading"
                  absolute
                  bottom
                  color="green accent-3"
                ></v-progress-linear>
              </v-toolbar>
              <v-divider></v-divider>
              <VueShowdown
                :markdown="descPreview"
                v-if="!previewLoading"
                class="p-3"
                flavor="github"
                :options="{
                  emoji: true,
                  ghMentions: true,
                  openLinksInNewWindow: true,
                }"
              />
            </v-col>
          </v-row>
        </div>

        <v-responsive class="overflow-y-auto" max-height="400">
          <div class="pa-6 text-center">Scroll down</div>

          <v-responsive height="200vh" class="text-center pa-2">
            <v-responsive min-height="50vh"></v-responsive>
            <div class="text-center text-body-2 mb-12">
              The card will appear below:
            </div>

            <v-lazy
              v-model="isActive"
              :options="{
                threshold: 0.5,
              }"
              min-height="200"
              transition="fade-transition"
            >
              <v-card class="mx-auto" max-width="336"> </v-card>
            </v-lazy>
          </v-responsive>
        </v-responsive>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
import AppLayout from "@/Layouts/AppLayout";
import AceEditor from "@/components/AceEditor";
import Prism from "prismjs";
import EmojiPath from "@/json/emoji.json";
export default {
  name: "PageDashboard",
  layout: AppLayout,
  components: {
    AceEditor,
  },
  props: {
    notes: Array,
    errors: Object,
  },
  data() {
    return {
      isActive: false,
      emojies: {},
      descPreview: "",
      previewLoading: false,
      editor: "",
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
    setDescPreview(value) {
      this.descPreview = value;
      this.previewLoading = true;
    },
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
    for (const [key, value] of Object.entries(EmojiPath)) {
      this.emojies[value] = `https://twemoji.maxcdn.com/2/svg/${key}.svg`;
    }
    Prism.highlightAll();
  },
  created: function () {},
  watch: {
    descPreview: {
      handler: function (value) {
        setTimeout(() => {
          this.previewLoading = false;
          setTimeout(() => Prism.highlightAll(), 1);
        }, 1000);
      },
    },
  },
};
</script>