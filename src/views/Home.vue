<template>
  <div class="max-w-3xl mx-auto p-2">
    <div class="mt-5">
      <router-link class="p-3 bg-green-500 text-white rounded-md" to="/create"
        >Nova Promoção</router-link
      >
    </div>

    <List :loadInfo="loadInfo" :deletePromotion="deletePromotion" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import List from "@/components/promotions/List.vue";
import axios from "@/utils/api";
import Promotion from "@/Models/Promotion";

export default defineComponent({
  components: {
    List,
  },
  data() {
    return {
      loadInfo: {
        loading: false,
        promotions: [] as Promotion[],
        error: false,
      },
    };
  },
  methods: {
    async fetchPromotions() {
      try {
        this.loadInfo.loading = true;
        const { data } = await axios.get("/promotions", {
          params: {
            _embed: "comments",
            _sort: "id",
            _order: "desc",
          },
        });
        this.loadInfo.loading = false;
        this.loadInfo.promotions = data;
      } catch (error) {
        this.loadInfo.error = true;
        console.warn(error);
      }
    },
    async deletePromotion(id: string) {
      await axios({
        method: "DELETE",
        url: `/promotions/${id}`,
      });
      this.loadInfo.promotions = this.loadInfo.promotions.filter(
        (item) => item.id != Number(id)
      );
    },
  },
  mounted() {
    this.fetchPromotions();
  },
});
</script>
