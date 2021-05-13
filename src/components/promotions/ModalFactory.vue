<template>
  <teleport to="body">
    <div class="overlay">
      <div
        class="
          modal
          relative
          animate__animated animate__slideInDown animate__faster
        "
      >
        <button
          @click="$emit('closeModal')"
          class="
            absolute
            -right-3
            -top-4
            bg-black
            text-white
            px-3
            py-1
            rounded-full
          "
        >
          <i class="fas fa-times"></i>
        </button>
        <component
          class="mt-12"
          :is="currentModal"
          :promotionId="promotionId"
        />
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommentsModal from "@/components/promotions/CommentsModal.vue";

export default defineComponent({
  components: {
    CommentsModal,
  },
  emits: {
    closeModal() {
      return true;
    },
  },
  props: {
    currentModal: {
      type: String,
    },
    promotionId: {
      type: Number,
    },
  },
});
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}

.modal {
  max-width: 750px;
  margin: auto;
}
</style>
