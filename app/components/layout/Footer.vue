<script setup lang="ts">

</script>

<template>
    <footer class="footer">
        <div class="footer__inner">
            <p class="footer__info">
                Created Polls: <span class="accent-secondary">8,008,135</span>  |  Polls responses: <span class="accent-primary">45,453</span>
            </p>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    padding: 22px 0px 40px;
    background-color: var(--footer-bg);
}

.footer__inner {
    width: 100%;
    text-align: center;
}

.footer__info {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    color: var(--text-secondary);
}
</style>