<template>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet min-height="20vh" rounded="lg">
          <div class="header p-3">
            <v-row>
              <v-col>
                <h3 class="title text-xl">Son Eklenen Notlar</h3>
              </v-col>
            </v-row>
          </div>
          <v-divider></v-divider>
          <div class="body">
            <v-expand-transition>
              <div v-if="notesLoad">
                <v-list subheader>
                  <v-subheader>Notlarım </v-subheader>
                  <v-list-item v-for="note in notes" :key="note.id" link>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="note.title"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        class="pl-2 pt-2"
                        v-html="note.description"
                      ></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <inertia-link :href="route('app.dashboard')">
                        <v-icon :color="'primary'"> mdi-eye </v-icon>
                      </inertia-link>
                    </v-list-item-icon>
                  </v-list-item>
                  <v-alert
                    v-if="notes.length <= 0"
                    border="left"
                    color="red"
                    elevation="3"
                    type="info"
                    class="mx-3"
                    >Henüz eklenmiş olan notunuz bulunmamaktadır.</v-alert
                  >
                </v-list>
              </div>
            </v-expand-transition>
            <v-skeleton-loader
              v-show="notesLoad == false"
              elevation="2"
              type="article"
            ></v-skeleton-loader>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet min-height="20vh" rounded="lg">
          <div class="header p-3">
            <v-row>
              <v-col>
                <h3 class="title text-xl">Yeni Not Oluştur</h3>
              </v-col>
            </v-row>
          </div>
          <v-divider></v-divider>
          <div class="body">
            <v-form ref="noteAddForm" @submit.prevent>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="focus:outline-none"
                      v-model="note.title"
                      :rules="requiredRules"
                      label="Not Başlığı"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="note.description"
                      :rules="requiredRules"
                      label="Not Açıklaması"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn type="submit" @click="validate" color="success"
                      >KAYDET</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppLayout from "@/Layouts/AppLayout";
export default {
  name: "PageDashboard",
  layout: AppLayout,
  props: {},
  data: () => ({
    requiredRules: [(v) => !!v || "Lütfen alanı doldurunuz"],
    notes: [],
    notesLoad: false,
    note: { title: "", description: "", created_at: "", updated_at: "" },
  }),
  methods: {
    validate() {
      let validate = this.$refs.noteAddForm.validate();
      if (validate) {
        this.addNote();
      }
    },
    getNote() {
      axios
        .get(route("app.api.note.index"))
        .then((res) => {
          this.notes = res.data;
          this.notesLoad = true;
        })
        .catch((res) => {});
    },
    async addNote() {
      this.notesLoad = false;
      const res = await axios.post(route("app.api.note.store"), this.note);

      if (res.status === 201) {
        Toast.fire({
          icon: "success",
          title: res.data,
        });
        this.note.title = "";
        this.note.description = "";
        this.$refs.noteAddForm.resetValidation();
        this.getNote();
      }
    },
  },
  mounted: function () {},
  created: function () {
    this.getNote();
  },
};
</script>
