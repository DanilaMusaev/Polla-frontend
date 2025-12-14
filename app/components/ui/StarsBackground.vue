<script setup lang="ts">
type Props = {
    starCount?: number;
    minBrightness?: number;
    maxBrightness?: number;
    twinkleSpeed?: number;
    minLifetime?: number;
    maxLifetime?: number;
    minStarSize?: number;
    maxStarSize?: number;
    minStarSpeed?: number;
    maxStarSpeed?: number;
    className?: string;
};

const props = withDefaults(defineProps<Props>(), {
    starCount: 30,
    minBrightness: 0.1,
    maxBrightness: 0.9,
    twinkleSpeed: 0.0008,
    minLifetime: 3000,
    maxLifetime: 7000,
    minStarSize: 0.3,
    maxStarSize: 1.1,
    minStarSpeed: 0.0008,
    maxStarSpeed: 0.0028,
    className: '',
});

const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationId: number | null = null;
let stars: ReturnType<typeof useBgStars> | null = null;
let starsArray: any[] = [];

const starParams = computed<StarsParams>(() => ({
    starCount: props.starCount,
    minBrightness: props.minBrightness,
    maxBrightness: props.maxBrightness,
    twinkleSpeed: props.twinkleSpeed,
    minLifetime: props.minLifetime,
    maxLifetime: props.maxLifetime,
    minStarSize: props.minStarSize,
    maxStarSize: props.maxStarSize,
    minStarSpeed: props.minStarSpeed,
    maxStarSpeed: props.maxStarSpeed,
}));

const initCanvas = () => {
    if (!canvasRef.value) return;

    const canvas = canvasRef.value;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    stars = useBgStars(starParams.value);
    stars.resizeCanvas(canvas);
    starsArray = stars.initStars(canvas);

    stars.startAnimation(canvas, ctx, starsArray);
};

const handleResize = () => {
    if (!canvasRef.value || !stars) return;
    stars.updateCanvasSize(canvasRef.value, starsArray);
};

const cleanup = () => {
    if (stars) {
        stars.stopAnimation();
    }
    starsArray = [];
    stars = null;
};

const restartAnimation = () => {
    cleanup();
    initCanvas();
};

onMounted(() => {
    initCanvas();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    cleanup();
    window.removeEventListener('resize', handleResize);
});
</script>

<template>
    <canvas ref="canvasRef" :class="props.className"> </canvas>
</template>

<style scoped></style>
