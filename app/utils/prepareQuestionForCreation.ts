export default function (
    partialQuestion: Partial<Question>
): Omit<Question, 'order'> {
    if (!partialQuestion.text?.trim()) {
        throw new Error('Text question is required');
    }

    if (!partialQuestion.type) {
        throw new Error('Question type is required');
    }

    return {
        text: partialQuestion.text?.trim(),
        type: partialQuestion.type,
        options: partialQuestion.options,
    };
}
