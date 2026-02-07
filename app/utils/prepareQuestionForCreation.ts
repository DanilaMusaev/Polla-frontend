import assertExhaustive from "./assertExhaustive";

export default function (
    partialQuestion: Partial<Question>
): Omit<Question, 'order'> {
    if (!partialQuestion.text?.trim()) {
        throw new Error('Text question is required');
    }

    if (!partialQuestion.type) {
        throw new Error('Question type is required');
    }
    const type = partialQuestion.type;

    let cleanOptions: Question['options'] | undefined;
    switch (type) {
        case 'TEXT':
        case 'RATING':
            cleanOptions = undefined;
            break;
        case 'SINGLE_CHOICE':
        case 'MULTIPLE_CHOICE':
        case 'IMAGE_CHOICE':
            if (
                Array.isArray(partialQuestion.options) &&
                partialQuestion.options.length >= 2
            ) {
                cleanOptions = partialQuestion.options.filter((value) =>
                    typeof value === 'string' ? value.trim() : true
                );
                if (cleanOptions.length < 2) {
                    throw new Error(
                        'The "options" must be filled with at least 2 choice variant'
                    );
                }
            } else {
                throw new Error(
                    'The "options" must be filled with at least 2 choice variant'
                );
            }
            break;
        default:
            // Проверка на обработку всех вариантов вопросов
            return assertExhaustive(type);
    }

    return {
        text: partialQuestion.text?.trim(),
        type: partialQuestion.type,
        options: cleanOptions,
    };
}
