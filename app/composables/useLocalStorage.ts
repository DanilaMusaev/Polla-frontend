/**
 * Composable for use the localStorage values
 * 
 * @param key - key from the localStorage, that you are going to use
 * @param defaultValue - the default value that will be used if there was nothing in the localStorage by key initially.
 * @param options - optional features
 */
export const useLocalStorage = <T = string>(
    key: string,
    defaultValue?: T,
    options?: {
        onValueChange?: (newValue: T | null, oldValue: T | null) => void;
        serialize?: (value: T) => string;
        deserialize?: (value: string) => T;
    }
) => {
    const value = ref<T | null>(defaultValue ?? null);

    const serialize =
        options?.serialize ||
        ((val: any) => (typeof val === 'string' ? val : JSON.stringify(val)));
    const deserialize =
        options?.deserialize ||
        ((val: string) => {
            try {
                return JSON.parse(val);
            } catch {
                return val as T;
            }
        });

    if (import.meta.client) {
        const item = localStorage.getItem(key);
        if (item) {
            value.value = deserialize(item);
        } else if (defaultValue !== undefined) {
            localStorage.setItem(key, serialize(defaultValue));
            value.value = defaultValue;
        }

        if (options?.onValueChange && value.value !== null) {
            setTimeout(() => options.onValueChange!(value.value, null), 0);
        }
    }

    const setValue = (newValue: T) => {
        if (!import.meta.client) return;

        const oldValue = value.value;
        localStorage.setItem(key, serialize(newValue));
        value.value = newValue;

        options?.onValueChange?.(newValue, oldValue);
    };

    const removeValue = () => {
        if (!import.meta.client) return;

        const oldValue = value.value;
        localStorage.removeItem(key);
        value.value = defaultValue ?? null;

        options?.onValueChange?.(null, oldValue);
    };

    return {
        value,
        setValue,
        removeValue,
        // Для удобства использования с v-model
        get model() {
            return value.value;
        },
        set model(val: T | null) {
            if (val === null || val === undefined) {
                removeValue();
            } else {
                setValue(val);
            }
        },
    };
};
