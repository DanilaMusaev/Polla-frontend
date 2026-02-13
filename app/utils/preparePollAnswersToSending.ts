export default function (
    pollId: string,
    answers: UnpreparedAnswers,
    respondent?: string
): PollResponse | null {
    if (Object.keys(answers).length <= 0) {
        alert('The answers cannot be empty.'); // Пока так ALERT, потом надо добавить Notificator
        return null;
    }

    const preparedAnswers: PreparedAnswers[] = [];
    for (const key in answers) {
        let answer = answers[key];

        switch (typeof answer) {
            case "string":
                answer = answer.trim();
                break;
            case "object":
                if (Array.isArray(answer)) {
                    answer = answer.filter((value) =>
                        typeof value === 'string' ? value.trim() : true
                    );
                }
                break;
            default:
                break;
        }

        preparedAnswers.push({
            questionId: key,
            content: answers[key],
        });
    }

    return {
        pollId,
        answers: preparedAnswers,
        respondent: respondent?.trim() ? respondent?.trim() : undefined,
    };
}
