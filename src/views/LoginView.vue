<script setup>
import { reactive, onMounted, ref } from "vue"
import axios from "axios"
import router from "@/router"
import { useRoute } from "vue-router"
import { useToast } from 'vue-toastification'
import { useAuthStore } from "@/stores/auth"

const route = useRoute()

let form = reactive({
    email: "",
    username: "",
    password: ""
})

const loginType = ref('username');

const toast = useToast();

const authStore = useAuthStore();

const switchloginType = () => {
    loginType.value = loginType.value === 'email' ? 'username' : 'email'
}

const handleSubmit = async () => {
    const loginData = loginType.value === 'username' ? {
        username: form.username,
        password: form.password
    } : {
        email: form.email,
        password: form.password
    };

    try {
        const response = await axios.post('/api/auth/login', loginData);
        authStore.login(response.data.user)
        toast.success(response.data.message)
        router.push(`/jobs`)
    } catch (error) {
        console.error("Login error", error)
        toast.error(`Something whent wrong, ${error.response.data.message}`)
    }
}

// onMounted(async () => {
//     try {
//         jobId.value = job.id
//         if (editing && job) {
//             form.type = job.type,
//                 form.title = job.title,
//                 form.description = job.description,
//                 form.salary = job.salary,
//                 form.location = job.location,
//                 form.company.name = job.company.name,
//                 form.company.description = job.company.description,
//                 form.company.contactEmail = job.company.contactEmail,
//                 form.company.contactPhone = job.company.contactPhone
//         }
//     } catch (error) {
//         console.error("Error got when fetching job data : ", error)
//     }
// })
</script>

<template>
    <section class="bg-green-50">
        <div class="container m-auto max-w-2xl py-24">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="handleSubmit">
                    <h2 class="text-3xl text-center font-semibold mb-6">Login into your account</h2>

                    <div class="flex justify-center gap-x-8 mb-4">
                        <label for="radioUsername" class="flex justify-start gap-x-3">
                            <input :click="switchloginType" v-model="loginType" type="radio" name="radioUsernameOrEmail"
                                value="username" id="radioUsername">
                            <span>With Username</span>
                        </label>
                        <label for="radioEmail" class="flex justify-start gap-x-3">
                            <input :click="switchloginType" v-model="loginType" type="radio" name="radioUsernameOrEmail"
                                value="email" id="radioEmail">
                            <span>With Email</span>
                        </label>
                    </div>

                    <div v-if="loginType === 'email'" class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Email <span
                                class="text-red-500">*</span></label>
                        <input v-model="form.email" type="email" id="email" name="email"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="jane.doe@gmail.com" required />
                    </div>

                    <div v-else class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Username <span
                                class="text-red-500">*</span></label>
                        <input v-model="form.username" type="text" id="username" name="username"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="123jane_doe" required />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Password <span
                                class="text-red-500">*</span></label>
                        <input v-model="form.password" type="password" id="password" name="password"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="********" required />
                    </div>

                    <div>
                        <button
                            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            Login
                        </button>
                    </div>
                </form>
                <div class="mt-3">
                    Don't have an account yet? <RouterLink
                        class="text-green-500 hover:text-green-400 active:text-green-600 visited:text-green-700"
                        to="/register">Create one</RouterLink>
                </div>
            </div>
        </div>
    </section>

</template>