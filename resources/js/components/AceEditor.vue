<template>
  <div :id="selector"></div>
</template>
<script>
import debounce from "lodash/debounce";
var ace = require("brace");
require("brace/ext/language_tools");
require("brace/mode/html");
require("brace/mode/css");
require("brace/mode/javascript");
require("brace/worker/html");
require("brace/theme/dracula");
export default {
  name: "AceEditor",
  props: {
    selector: String,
  },
  data() {
    return {
      editor: {},
      value: "",
    };
  },
  methods: {},
  mounted() {
    this.editor = ace.edit(this.selector);
    this.editor.session.setOptions({
      tabSize: 2,
    });
    this.editor.setTheme("ace/theme/dracula");
    this.editor.setShowPrintMargin(false);
    this.editor.renderer.setShowGutter(false);
    this.editor.renderer.setPadding(15);
    this.editor.session.setMode("ace/mode/css");
    this.editor.session.setMode("ace/mode/javascript");
    this.editor.session.setMode("ace/mode/html");
    document.getElementById(this.selector).style.cssText =
      "font-size:15px; height:230px;width:100%";
    this.editor.getSession().on("change", () => {
      this.value = this.editor.getValue();
    });
  },
  watch: {
    value: {
      handler: debounce(function (value) {
        this.$emit("descPreview", value);
      }, 500),
      deep: false,
    },
  },
};
</script>
<style>
.ace_content {
  background: rgb(31, 31, 31) !important;
}
</style>