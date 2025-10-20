<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import JobListings from '@/components/JobListings.vue';

const jobLength = 0;
</script>

<template>
    <Hero />
    <HomeCards />
    <JobListings :limit="jobLength" :showButton="true" />
</template>