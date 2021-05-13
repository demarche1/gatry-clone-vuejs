<template>
  <div class="h-screen">
    <input
      class="mt-5 border w-full rounded-md px-2 py-1"
      type="search"
      placeholder="Perquisar promoção"
      v-model="searchBox"
    />
    <div
      class="infos text-5xl text-center mt-24 text-gray-400"
      v-if="loadInfo.loading && !loadInfo.error"
    >
      Carregando...
    </div>
    <div
      class="infos text-5xl text-center mt-24 text-gray-400"
      v-else-if="havePromotions && !loadInfo.error"
    >
      Nenhum resultado encontrado
    </div>
    <div
      class="infos text-5xl text-center mt-24 text-red-600"
      v-else-if="loadInfo.error"
    >
      Desculpe ocorreu algum erro!
    </div>
    <ul>
      <li
        v-for="promotion in filredPromotions"
        :key="promotion.id"
        class="py-5"
      >
        <Card
          :promotion="promotion"
          :deletePromotion="deletePromotion"
          @openModal="toggleModal($event)"
        />
      </li>
    </ul>
  </div>

  <ModalFactory
    v-if="promotionId"
    :currentModal="currentModal"
    :promotionId="promotionId"
    @closeModal="toggleModal"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/promotions/Card.vue";
import ModalFactory from "@/components/promotions/ModalFactory.vue";
import ModalRender from "@/Models/ModalRender";
import Promotion from "@/Models/Promotion";

export default defineComponent({
  components: {
    Card,
    ModalFactory,
  },
  data() {
    return {
      promotionId: "",
      currentModal: "",
      searchBox: "",
    };
  },
  props: {
    loadInfo: {
      type: Object,
      required: true,
    },
    deletePromotion: {
      type: Function,
      required: true,
    },
  },
  computed: {
    havePromotions(): boolean {
      return this.loadInfo.promotions.length > 0 ? false : true;
    },
    filredPromotions(): Promotion[] {
      return this.loadInfo.promotions.filter((promo: Promotion) =>
        promo.title.toLowerCase().includes(this.searchBox.toLowerCase())
      );
    },
  },
  methods: {
    toggleModal(render: ModalRender) {
      if (render) {
        this.promotionId = render.id;
        this.currentModal = render.modal;
      } else {
        (this.promotionId = ""), (this.currentModal = "");
      }
    },
  },
});
</script>
