<script setup>
import AddJobView from "./AddJobView.vue"
import { useRoute } from "vue-router"
import { ref, onMounted, onBeforeMount } from "vue"
import axios from "axios"
import { useAuthStore } from "@/stores/auth"
import router from '@/router'

const route = useRoute()

const jobId = route.params.id

let job = {}
let loading = ref(true)
onBeforeMount(() => {
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated || !(authStore.user.role === 'editor' || authStore.user.role === 'admin')) {
        router.replace('/')
    }
})

onMounted(async () => {
    try {
        const response = await axios.get(`/api/jobs/${jobId}`)

        job = { ...response.data }
        loading.value = false
        // console.log(jobId)
    } catch (error) {
        console.error("Error got when fetching job data : ", error)
    }
})
</script>

<template>
    <AddJobView v-if="!loading" :editing="true" :job="job" :allo="`Allo`" />
</template>