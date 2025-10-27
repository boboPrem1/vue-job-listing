<script setup>
import { reactive, onMounted, ref } from "vue"
import axios from "axios"
import router from "@/router"
import { useRoute } from "vue-router"
import { useToast } from 'vue-toastification'
import { RouterLink } from "vue-router"

const route = useRoute()

let form = reactive({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
})


const toast = useToast();

const handleSubmit = async () => {
    const loginData = {
        ...form
    };

    try {
        const response = await axios.post('/api/auth/login', loginData);
        toast.success("You've been logged successfully !")
        router.push(`/jobs/${response.data.id}`)
    } catch (error) {
        console.error("Login error", error)
        toast.error("Something whent wrong ...")
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
        <div class="container m-auto max-w-sm py-24">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="handleSubmit">
                    <h2 class="text-3xl text-center font-semibold mb-6">Register a new account</h2>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">Firstname <span class="text-red-500">*</span></label>
                        <input v-model="form.firstname" type="text" id="firstname" name="firstname"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Jane" required />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">Lastname</label>
                        <input v-model="form.lastname" type="text" id="lastname" name="lastname"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Doe" />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">Email <span class="text-red-500">*</span></label>
                        <input v-model="form.email" type="email" id="email" name="email"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="jane.doe@gmail.com" required />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">Username</label>
                        <input v-model="form.username" type="text" id="username" name="username"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="123jane_doe" />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">Password <span class="text-red-500">*</span></label>
                        <input v-model="form.password" type="password" id="password" name="password"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="********" required />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">Confirm your password <span class="text-red-500">*</span></label>
                        <input v-model="form.confirmPassword" type="password" id="confirmPassword" name="confirmPassword"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="********" required />
                    </div>

                    <div>
                        <button
                            class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            Register
                        </button>
                    </div>
                </form>
                <div class="mt-3">
                    Already have an account ? <RouterLink class="text-green-500 hover:text-green-400 active:text-green-600 visited:text-green-700" to="/login">Login</RouterLink>
                </div>
            </div>
        </div>
    </section>

</template>