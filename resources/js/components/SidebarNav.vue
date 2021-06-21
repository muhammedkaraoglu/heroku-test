<template>
  <div>
    <v-list v-for="nav in navs" :value="false" :key="nav.title">
      <v-list-group
        v-if="nav.childs"
        :value="false"
        no-action
        :prepend-icon="nav.icon"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>{{ nav.title }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <div v-if="nav.childs">
          <sidebar-nav class="py-0 pl-5" :navs="nav.childs"></sidebar-nav>
        </div>
      </v-list-group>
      <inertia-link v-else :href="route(nav.href)">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>{{ nav.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ nav.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </inertia-link>
    </v-list>
  </div>
</template>
<script>
export default {
  name: "SidebarNav",
  props: {
    navs: Array,
  },
};
</script>