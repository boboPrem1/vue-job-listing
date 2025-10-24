<script setup>
import AddJobView from "./AddJobView.vue"
import { useRoute } from "vue-router"
import { ref, onMounted } from "vue"
import axios from "axios"

const route = useRoute()

const jobId = route.params.id

const job = ref(null)

onMounted(async () => {
    try {
        const response = await axios.get(`/api/jobs/${jobId}`)

        job.value = response.data
        // console.log(jobId)
    } catch (error) {
        console.error("Error got when fetching job data : ", error)
    }
})
</script>

<template>
    <AddJobView v-if="job" :editing="true" :job="job" />

    <!-- <AddJobView :editing="true" :job="job.value" /> -->
</template>