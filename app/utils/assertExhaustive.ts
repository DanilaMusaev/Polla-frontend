export default function(value: never): never {
    throw new Error(`Unhandled value: ${value}`);
}