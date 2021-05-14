<template>
  <div
    class="
      flex
      gap-5
      justify-start
      items-center
      bg-white
      p-2
      shadow-xl
      rounded-md
      max-w-3xl
      relative
    "
  >
    <img
      class="w-20 h-20 rounded-md md:w-36 md:h-36"
      :src="promotion.imageUrl"
    />
    <section class="flex flex-col h-full justify-around w-full">
      <h2 class="text-gray-600 text-lg">
        {{ promotion.title }}
      </h2>
      <span class="text-gray-400 text-3xl font-semibold my-2 md:text-5xl">{{
        promotion.price
      }}</span>
      <p
        class="
          text-gray-500
          max-w-sm
          whitespace-nowrap
          overflow-ellipsis overflow-hidden
        "
        v-if="promotion.comments[0]"
      >
        "{{ promotion.comments[0].comment }}"
      </p>
      <footer class="flex gap-2 text-gray-600 sm:justify-between mt-2">
        <button
          @click="
            $emit('openModal', { id: promotion.id, modal: 'CommentsModal' })
          "
          class="
            bg-gray-500
            text-white
            px-2
            rounded-sm
            whitespace-nowrap
            overflow-hidden
          "
          v-if="promotion.comments.length > 1"
        >
          {{ promotion.comments.length }} Comentários
        </button>
        <button
          @click="
            $emit('openModal', { id: promotion.id, modal: 'CommentsModal' })
          "
          class="
            bg-gray-500
            text-white
            px-2
            rounded-sm
            whitespace-nowrap
            overflow-hidden
          "
          v-if="promotion.comments.length <= 1"
        >
          {{ promotion.comments.length }} Comentário
        </button>
        <a
          :href="promotion.url"
          class="
            bg-blue-600
            px-2
            rounded-sm
            text-white
            whitespace-nowrap
            overflow-hidden
          "
          >Ir para o site</a
        >
        <router-link
          class="
            bg-green-600
            px-2
            rounded-sm
            text-white
            whitespace-nowrap
            overflow-hidden
          "
          :to="{ name: 'Editar Promoção', params: { id: promotion.id } }"
          ><button>Editar</button></router-link
        >
        <button @click="deletePromotion(promotion.id)">
          <i class="fas fa-trash-alt text-red-700 sm:mr-5"></i>
        </button>
      </footer>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    promotion: {
      type: Object,
      requiered: true,
    },
    deletePromotion: {
      type: Function,
      required: true,
    },
  },
});
</script>
