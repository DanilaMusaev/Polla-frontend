/**
 * Composable to manage the theme status
 */
export const useTheme = () => {
    const updateHtmlAttribute = (theme: 'light' | 'dark') => {
        if (!import.meta.client) return;

        const html = document.documentElement;
        html.setAttribute('data-theme', theme);
    };

    const themeStorage = useLocalStorage<'light' | 'dark'>(
        'theme',
        undefined,
        {
            onValueChange: (newTheme) => {
                if (newTheme) {
                    updateHtmlAttribute(newTheme);
                }
            },
        }
    );

    onMounted(() => {
        if (!import.meta.client) return;

        if (themeStorage.value.value) {
            return;
        }

        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;
        const initialTheme: 'light' | 'dark' = prefersDark ? 'dark' : 'light';

        themeStorage.setValue(initialTheme);
    });

    return {
        theme: themeStorage.value,
        toggle: () => {
            const nextTheme: 'light' | 'dark' =
                themeStorage.value.value === 'dark' ? 'light' : 'dark';
            themeStorage.setValue(nextTheme);
        },
        set: (newTheme: 'light' | 'dark') => {
            themeStorage.setValue(newTheme);
        },
    };
};
