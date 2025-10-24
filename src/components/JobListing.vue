<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  job: {
    type: Object,
    required: true
  }
})

const isModalOpen = ref(false)

const truncatedDescription = computed(() => {
  const description = props.job.description
  return description.length > 90 ? description.substring(0, 90) + "..." : description
})

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        <div class="text-gray-600 my-2">{{ job.type }}</div>
        <h3 class="text-xl font-bold">{{ job.title }}</h3>
      </div>

      <div class="mb-5">
        <div>{{ truncatedDescription }}</div>
        <button class="text-green-500 hover:text-green-600" @click="openModal">
          Show more
        </button>
      </div>

      <h3 class="text-green-500 mb-2">{{ job.salary }} / Year</h3>

      <div class="border border-gray-100 mb-5"></div>

      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <div class="text-orange-700 mb-3 flex items-center gap-1">
          <i class="pi pi-map-marker text-orange-700"></i>
          {{ job.location }}
        </div>
        <RouterLink
          :to="`/jobs/${job.id}`"
          class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          Read More
        </RouterLink>
      </div>
    </div>
  </div>

  <!-- ✅ MODAL -->
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
  >
    <div class="bg-white rounded-xl shadow-lg max-w-lg w-full mx-4 p-6 relative animate-fade-in">
      <button
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        @click="closeModal"
      >
        ✕
      </button>

      <h2 class="text-xl font-bold mb-2">{{ job.title }}</h2>
      <p class="text-gray-600 mb-4">{{ job.type }} • {{ job.salary }} / Year</p>
      <p class="text-gray-800 leading-relaxed">{{ job.description }}</p>

      <div class="flex justify-end mt-6">
        <button
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          @click="closeModal"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>
