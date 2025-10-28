<script setup>
import logo from '@/assets/img/logo.png'
import { RouterLink, useRoute } from 'vue-router';
import { useAuthStore } from "@/stores/auth"
import router from "@/router"

const isActiveLink = (routPath) => {
    const route = useRoute()
    return route.path == routPath ?
        ['bg-green-900 hover:text-white', 'text-white', 'px-3', 'py-2', 'rounded-md']
        :
        ['text-white hover:bg-green-900 hover:text-white rounded-md px-3 py-2']
}

const auth = useAuthStore()

const handleLogout = () => {
    auth.logout()
    router.push('/')
}

</script>

<template>
    <nav class="bg-green-700 border-b border-green-500">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between">
                <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                    <!-- Logo -->
                    <RouterLink class="flex shrink-0 items-center mr-4" to="/">
                        <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
                        <span class="hidden md:block text-white text-2xl font-bold ml-2">Vue Jobs</span>
                    </RouterLink>
                    <div class="md:ml-auto flex justify-start items-center gap-10">
                        <div class="flex space-x-2">
                            <RouterLink to="/" :class="isActiveLink('/')">
                                Home</RouterLink>
                            <RouterLink to="/jobs" :class="isActiveLink('/jobs')">Jobs
                            </RouterLink>
                            <RouterLink to="/jobs/add" :class="isActiveLink('/jobs/add')">Add Job
                            </RouterLink>
                        </div>
                        <div v-if="auth.isAuthenticated" class="flex justify-center items-center gap-x-5">
                            <span>Welcome {{ auth.user.firstname }}.{{ auth.user.firstname[0].toUpperCase() }}</span>

                            <button @click="handleLogout()"
                                class="border-2 border-green-900 hover:bg-white hover:text-green-900 text-white px-3 py-2 rounded-md">
                                Logout
                            </button>
                        </div>
                        <div v-else class="flex space-x-2">
                            <RouterLink to="/login"
                                class="border-2 border-green-900 hover:bg-white hover:text-green-900 text-white px-3 py-2 rounded-md">
                                Login
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <slot></slot>
</template>