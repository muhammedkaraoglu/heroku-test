<template>
  <v-app id="inspire">
    <v-navigation-drawer app v-model="drawer">
      <v-sheet color="" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-2" size="64"></v-avatar>
        <div>john@vuetifyjs.com</div>
      </v-sheet>

      <!-- <v-list class="">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon> mdi-eye </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> TEST </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list> -->

      <sidebar-nav :navs="navs"></sidebar-nav>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-app-bar app flat>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-breadcrumbs>
          <v-breadcrumbs-item
            v-for="(item, index) in breadcrumbs"
            :key="item.title"
          >
            <inertia-link :href="item.url">
              {{ item.title }}
              <v-icon v-if="index != breadcrumbs.length - 1"
                >mdi-chevron-right</v-icon
              >
            </inertia-link>
          </v-breadcrumbs-item>
        </v-breadcrumbs>

        <v-avatar
          class="hidden-sm-and-down"
          color="grey darken-1 shrink"
          size="32"
        ></v-avatar>
      </v-app-bar>

      <main>
        <slot></slot>
      </main>
    </v-main>
  </v-app>
</template>


<script>
import SidebarNav from "@/components/SidebarNav";

export default {
  name: "AppLayout",
  components: {
    SidebarNav,
  },
  props: {},
  data: () => ({
    drawer: true,
    navs: [
      {
        id: 1,
        title: "Gösterge Paneli",
        icon: "mdi-view-dashboard-variant-outline",
        href: "app.dashboard",
      },
      {
        id: 2,
        title: "Notlarım",
        icon: "mdi-playlist-edit",
        href: "app.dashboard",
        childs: [
          {
            id: 3,
            title: "Not Listesi",
            icon: "mdi-playlist-edit",
            href: "app.dashboard",
            childs: [
              {
                id: 4,
                title: "Not Listesi 2",
                icon: "mdi-playlist-edit",
                href: "app.dashboard",
              },
              {
                id: 5,
                title: "Not Listesi 2123231",
                icon: "mdi-playlist-edit",
                href: "app.dashboard",
              },
            ],
          },
          {
            id: 6,
            title: "Noy Oluştur",
            icon: "mdi-view-dashboard-variant-outline",
            href: "app.dashboard",
          },
        ],
      },
    ],
    links: [
      ["mdi-inbox-arrow-down", "Inbox"],
      ["mdi-send", "Send"],
      ["mdi-delete", "Trash"],
      ["mdi-alert-octagon", "Spam"],
    ],
  }),
  computed: {
    breadcrumbs() {
      if (this.$page.props.pageBreadcrumb == undefined) {
        this.$page.props.pageBreadcrumb = {};
      }
      return this.$page.props.pageBreadcrumb;
    },
  },
  mounted: function () {
    //this.breadcrumbItems.map((item) => this.breadcrumbs.push(item));
  },
  created: function () {
    //this.$emit("update:layout", AppLayout);
  },
};
</script>
