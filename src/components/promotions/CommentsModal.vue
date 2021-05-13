<template>
  <form
    @submit.prevent="sendComment"
    class="bg-white w-full flex flex-col p-5 rounded-md"
  >
    <h2 class="my-2 text-xl text-gray-500">Comentários</h2>
    <textarea
      class="h-16 bg-gray-200 p-2 rounded-md"
      placeholder="Deixe seu comentário"
      v-model.trim.lazy="textComment"
    />
    <button type="submit" class="w-20 bg-blue-600 text-white rounded-sm mt-2">
      Enviar
    </button>
    <div class="text-xl text-center p-5" v-if="isLoading">Carregando...</div>

    <div
      class="text-xl text-center p-5"
      v-if="comments.length === 0 && !isLoading"
    >
      Nenhum comentário para essa promoção
      <i class="far fa-frown"></i>
    </div>
    <ul>
      <li
        class="border p-2 rounded-md mt-2"
        v-for="comment in comments"
        :key="comment.id"
      >
        <div class="flex items-center">
          <img
            class="w-8 rounded-full"
            :src="comment.user.avatarUrl"
            :alt="`Foto de ${comment.user.name}`"
          />
          <span class="pl-3 text-gray-500 text-xs">{{
            comment.user.name
          }}</span>
        </div>
        <p class="text-sm mt-3 mb-2">{{ comment.comment }}</p>
        <a
          @click="sendLikes(comment)"
          class="border px-2 py-1 rounded-md cursor-pointer"
        >
          <i class="far fa-thumbs-up mr-1"></i>{{ comment.like }}
        </a>
      </li>
    </ul>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "@/utils/api";
import Comment from "@/Models/Comment";

export default defineComponent({
  props: {
    promotionId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      comments: [] as Comment[],
      textComment: "",
      isLoading: false,
    };
  },
  methods: {
    async getComments(quietly?: boolean) {
      if (!quietly) {
        this.isLoading = true;
      }
      const { data } = await axios({
        method: "GET",
        url: `/comments`,
        params: {
          promotionId: this.promotionId,
          _expand: "user",
        },
      });
      this.comments = data;
      this.isLoading = false;
    },
    async sendComment() {
      const commentData: Comment = {
        promotionId: this.promotionId,
        comment: this.textComment,
        like: 0,
        userId: 2,
      };
      await axios({
        method: "POST",
        url: "/comments",
        data: commentData,
      });
      this.textComment = "";
      this.getComments();
    },
    async sendLikes(comment: Comment) {
      const updatedComment = {
        promotionId: comment.promotionId,
        comment: comment.comment,
        userId: comment.userId,
        like: comment.like + 1,
      };
      await axios({
        method: "PUT",
        url: `/comments/${comment.id}`,
        data: updatedComment,
      });
      this.getComments(true);
    },
  },
  mounted() {
    this.getComments();
  },
});
</script>
