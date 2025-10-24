<script setup>
import AddJobView from "./AddJobView.vue"
import { useRoute } from "vue-router"
import { ref, onMounted } from "vue"
import axios from "axios"

const route = useRoute()

const jobId = route.params.id

let job = {}
let loading = ref(true)

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