<template>
  <div class="h-screen">
    <Form :id="id" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Form from "@/components/promotions/Form.vue";

export default defineComponent({
  components: {
    Form,
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
});
</script>

<style scoped></style>
