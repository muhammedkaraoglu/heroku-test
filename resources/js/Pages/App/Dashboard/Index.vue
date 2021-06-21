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
            <v-list subheader>
              <v-subheader>Notlarım </v-subheader>

              <v-list-item v-for="note in notes" :key="note.id" link>
                <v-list-item-content>
                  <v-list-item-title v-text="note.title"></v-list-item-title>
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
            </v-list>
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
    notes: [
      { id: 1, title: "Test Note", description: "Notun içeriği" },
      { id: 2, title: "test note 2", description: "deneme" },
    ],
  }),
  mounted: function () {},
  created: function () {
    //this.$emit("update:layout", AppLayout);
  },
};
</script>
