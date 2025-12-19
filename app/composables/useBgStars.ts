interface StarsConfig {
    starCount: number;
    minBrightness: number;
    maxBrightness: number;
    twinkleSpeed: number;
    minLifetime: number;
    maxLifetime: number;
    minStarSize: number;
    maxStarSize: number;
    minStarSpeed: number;
    maxStarSpeed: number;
}

export type StarsParams = Partial<StarsConfig>;

const defaultConfig: StarsConfig = {
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
};

class Star {
    config: StarsConfig;
    canvas: HTMLCanvasElement;
    lifetime: number = 0;
    maxLifetime: number;
    x: number = 0;
    y: number = 0;
    size: number = 0;
    brightness: number = 0;
    speed: number = 0;
    increasing: boolean = false;

    constructor(canvas: HTMLCanvasElement, config: StarsConfig) {
        this.canvas = canvas;
        this.config = config;
        this.reset();
        this.maxLifetime = this.randomMinToMax(
            this.config.minLifetime,
            this.config.maxLifetime
        );
    }

    reset(): void {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = this.randomMinToMax(
            this.config.minStarSize,
            this.config.maxStarSize
        );
        this.brightness = this.config.minBrightness;
        this.speed = this.randomMinToMax(
            this.config.minStarSpeed,
            this.config.maxStarSpeed
        );
        this.increasing = true;
        this.lifetime = 0;
        this.maxLifetime = this.randomMinToMax(
            this.config.minLifetime,
            this.config.maxLifetime
        );
    }

    update(): void {
        this.lifetime++;

        if (this.isDead()) {
            this.reset();
            return;
        }

        // Управление мерцанием звездочки
        if (this.increasing) {
            this.brightness += this.speed;
            if (this.brightness >= this.config.maxBrightness) {
                this.increasing = false;
            }
        } else {
            this.brightness -= this.speed;
            if (this.brightness <= this.config.minBrightness) {
                this.increasing = true;
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // Сама звезда
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        ctx.fill();

        // Свечение для больших звезд
        if (this.size > 0.7) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness * 0.15})`;
            ctx.fill();
        }
    }

    isDead(): boolean {
        return this.lifetime >= this.maxLifetime;
    }

    private randomMinToMax(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}
/**
 * Composable to add the effect of stars on the background 
 * 
 * @param options - initial settings for the background of stars
 * @returns 
 */
export const useBgStars = (options?: StarsParams) => {
    const config: StarsConfig = {
        ...defaultConfig,
        ...options,
    };
    // Переменная с id фрейма анимации
    let animationFrameId: number | null = null;

    const initStars = (canvas: HTMLCanvasElement): Star[] => {
        const stars: Star[] = [];
        for (let i = 0; i < config.starCount; i++) {
            stars.push(new Star(canvas, config));
        }
        return stars;
    };

    const resizeCanvas = (canvas: HTMLCanvasElement): void => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    const updateCanvasSize = (
        canvas: HTMLCanvasElement,
        stars: Star[]
    ): void => {
        const oldWidth = canvas.width;
        const oldHeight = canvas.height;

        resizeCanvas(canvas);

        // Масштабирование позиций звезд после изменения размеров экрана и canvas
        if (oldWidth > 0 && oldHeight > 0) {
            const widthRatio = canvas.width / oldWidth;
            const heightRatio = canvas.height / oldHeight;

            stars.forEach((star) => {
                star.x *= widthRatio;
                star.y *= heightRatio;
            });
        } else {
            // На случай первой инициализации, просто сбросим звезды
            stars.forEach((star) => {
                star.reset();
            });
        }
    };


    const animate = (
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        stars: Star[]
    ): number => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach((star) => {
            star.update();
            star.draw(ctx);
        });

        animationFrameId = requestAnimationFrame(() => animate(canvas, ctx, stars));

        return animationFrameId;
    };

    // Отмена фрейма анимации
    const stopAnimation = (): void => {
        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    };

    // Начало анимации, вернет ID первого фрейма
    const startAnimation = (
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        stars: Star[]
    ): number => {
        stopAnimation();
        return animate(canvas, ctx, stars);
    };

    

    return {
        initStars,
        resizeCanvas,
        updateCanvasSize,
        startAnimation,
        stopAnimation,
    }
};
