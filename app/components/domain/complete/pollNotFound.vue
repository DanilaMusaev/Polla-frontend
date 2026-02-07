<script setup lang="ts">
import {ROUTES} from '~/config/routes';

interface Props {
    pollId: string;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="complete-poll__not-found">
        <h2 class="title-1 complete-poll__not-found__title">
            The poll was not found
        </h2>
        <p class="complete-poll__not-found__text">
            The poll with id: <span>"{{ props.pollId }}"</span> was not found. Please, make
            sure that the ID or the link you clicked through to is correct. You
            can also:
        </p>
        <NuxtLink :to="ROUTES.main" class="text-link"
            >Back to main page</NuxtLink
        >
    </div>
</template>

<style scoped>
.complete-poll__not-found {
    margin-top: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.complete-poll__not-found__title {
    margin-bottom: 15px;
}

.complete-poll__not-found__text {
    margin-bottom: 10px;
    max-width: 600px;
}

.complete-poll__not-found__text span {
    color: var(--secondary);
}
</style>
