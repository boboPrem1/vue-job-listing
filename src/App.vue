<script setup>
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import JobListings from '@/components/JobListings.vue';

const jobLength = 0;
</script>

<template>
    <Navbar />
    <Hero />
    <HomeCards />
    <JobListings :limit="jobLength" :showButton="true" />
</template>