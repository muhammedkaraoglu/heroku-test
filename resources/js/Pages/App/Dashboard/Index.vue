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
  </v-container>
</template>

<script>
import AppLayout from "@/Layouts/AppLayout";
export default {
  name: "PageDashboard",
  layout: AppLayout,
  props: {},
  data: () => ({
    notes: [],
    notesLoad: false,
    note: {
      title: "",
      description: "",
      created_at: "",
      updated_at: "",
    },
  }),
  methods: {
    getNote() {
      axios
        .get(route("app.api.note.index"))
        .then((res) => {
          this.notes = res.data;
          this.notesLoad = true;
          Toast.fire({
            icon: "info",
            title: "Hoşgeldin muhammed, seni burda görmek güzel.",
          });
        })
        .catch((res) => {
          console.log(this.notes);
        });
    },
    async addNote() {
      const res = await axios.post("/api/notes", this.note);
      if (res.status === 201) {
        Toast.fire({
          icon: "success",
          title: res.data,
        });
        console.log(res.data);
      }
    },
  },
  mounted: function () {},
  created: function () {
    this.getNote();
    //this.$emit("update:layout", AppLayout);
  },
};
</script>
