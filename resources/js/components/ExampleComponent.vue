<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Example Component</div>

          <div class="card-body">
            Hi, my names Muhammed Emin. $this my project ==> heroku test

            <p>Selam burda mesahjım var : {{ message }}</p>
            <div class="form-group">
              <input v-model="message" class="form-control" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello World",
    };
  },
  mounted() {
    console.log("Component mounted.");
  },
};
</script>
