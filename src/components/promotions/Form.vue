<template>
  <div class="max-w-3xl mx-auto">
    <h2 class="formTitle" v-if="id">Editar Promoção</h2>
    <h2 class="formTitle" v-else>Nova Promoção</h2>
    <form
      class="p-3 shadow-2xl rounded-md mt-3"
      @submit.prevent="savePromotion"
    >
      <div>
        <label class="label" for="title">Título</label>
        <input type="text" id="title" v-model.lazy.trim="form.title" />
      </div>
      <div>
        <label class="label" for="url">Link para o site</label>
        <input type="text" id="url" v-model.lazy.trim="form.url" />
      </div>
      <div>
        <label class="label" for="imageUrl">Imagem(Url da Imagem)</label>
        <input type="text" id="imageUrl" v-model.lazy.trim="form.imageUrl" />
      </div>
      <div>
        <label class="label" for="price">Preço</label>
        <input type="text" id="price" v-model.lazy.trim="form.price" />
      </div>
      <button
        class="mt-5 bg-blue-500 py-1 px-9 rounded-md text-white"
        type="submit"
      >
        Enviar
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "@/utils/api";

export default defineComponent({
  data() {
    return {
      form: {
        title: "",
        price: "",
        imageUrl: "",
        url: "",
      },
    };
  },
  props: {
    id: String,
  },
  methods: {
    async savePromotion() {
      await axios({
        url: this.id ? `/promotions/${this.id}` : "/promotions",
        method: this.id ? "PUT" : "POST",
        data: this.form,
      });
      this.$router.push("/");
    },
    async loadPromotion() {
      const { data } = await axios({
        url: `/promotions/${this.id}`,
        method: "GET",
      });
      this.form = data;
    },
  },
  mounted() {
    if (this.id) {
      this.loadPromotion();
    }
  },
});
</script>

<style lang="postcss" scoped>
form div {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
form div input {
  border: 1px solid #000;
  border-radius: 4px;
  padding: 3px;
}

.label {
  @apply text-xl;
}
.formTitle {
  @apply text-center text-4xl text-gray-500 pt-10;
}
</style>
