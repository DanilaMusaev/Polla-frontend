import type { Poll, Question } from '~/shared/types/Poll.type';

/**
 * Composable для работы с объектом опроса при его создании
 */
export const usePollState = () => {
    const POLL_DRAFT_KEY = 'pollDraft';
    // Общее состояние для создаваемого опроса, благодаря useState, в рамках одного запроса это будет общий объект
    const poll = useState<Poll>(`poll-state`, () => getDefaultPoll());

    /**
     * Функция для подгрузки состояния из localStorage
     */
    const loadFromStorage = () => {
        if (!import.meta.client) return;

        try {
            const state = localStorage.getItem(POLL_DRAFT_KEY);
            if (state) {
                const parsed = JSON.parse(state);
                if (parsed && typeof parsed === 'object') {
                    // Обновление состояния
                    poll.value = {
                        title: parsed.title || 'New Poll',
                        description: parsed.description || '',
                        questions: Array.isArray(parsed.questions)
                            ? parsed.questions
                            : [],
                    };
                }
            }
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            localStorage.removeItem(POLL_DRAFT_KEY);
        }
    };

    /**
     * Вспомогательная функция для дефолтного состояния
     */
    function getDefaultPoll(): Poll {
        return {
            title: 'New Poll',
            description: '',
            questions: [],
        };
    }

    /**
     * Функция ля обновления состояния опроса
     * @param updates - изменения в состоянии опроса.
     */
    const updatePoll = (updates: Partial<Poll>) => {
        Object.assign(poll.value, updates);
    };

    /**
     * Функция для добавления нового вопроса в опрос
     * @param question - новый вопрос
     */
    const addQuestion = (question: Omit<Question, 'order'>) => {
        const newQuestion: Question = {
            ...question,
            order: getLastOrder(),
        };

        poll.value.questions.push(newQuestion);
        return newQuestion;
    };

    /**
     * Функция для изменения уже существующего вопроса
     * @param order - номер обновляемого вопроса
     * @param updates - изменения в вопросе
     */
    const updateQuestion = (order: number, updates: Partial<Question>) => {
        const question = poll.value.questions.find((q) => q.order === order);
        if (question) {
            Object.assign(question, updates);
        }
    };

    /**
     * Функция для изменения порядкового номера вопроса в опросе
     * @param oldOrder - прошлый порядковый номер вопроса
     * @param newOrder - новый порядковый номер вопроса
     */
    const moveQuestion = (oldOrder: number, newOrder: number) => {
        if (oldOrder === newOrder) return;

        const movingQuestion = poll.value.questions.find(
            (q) => q.order === oldOrder
        );
        if (!movingQuestion) return;

        poll.value.questions.forEach((q) => {
            if (oldOrder > newOrder) {
                if (q.order >= newOrder && q.order < oldOrder) {
                    q.order++;
                }
            } else {
                if (q.order <= newOrder && q.order > oldOrder) {
                    q.order--;
                }
            }
        });

        movingQuestion.order = newOrder;
    };

    /**
     * Функция удаления вопроса из состояния опроса
     *
     * @param order - порядковый номер удаляемого вопроса
     */
    const removeQuestion = (order: number) => {
        const index = poll.value.questions.findIndex((q) => q.order === order);
        if (index !== -1) {
            poll.value.questions.splice(index, 1);

            reorderQuestions();
        }
    };

    /**
     * Функция сохранения текущего состояния в localStorage
     */
    const saveDraft = () => {
        if (!import.meta.client || typeof localStorage === 'undefined') return;

        localStorage.setItem(POLL_DRAFT_KEY, JSON.stringify(poll.value));
        alert('Черновик сохранен!'); // Пока что ALERT, потом надо будет переделать по notificator
    };

    /**
     * Функция отправки созданного опроса на сервер
     */
    const sendPollOnServer = () => {
        if (!import.meta.client || typeof localStorage === 'undefined') return;

        resetPoll();
        alert(
            'Функция отправки созданного опроса на сервер находится в разработке!'
        ); // Уведомление (Пока что через ALERT)
    };

    const reorderQuestions = () => {
        poll.value.questions.sort((a, b) => a.order - b.order);

        poll.value.questions.forEach((question, index) => {
            question.order = index + 1;
        });
    };

    const resetPoll = () => {
        poll.value = getDefaultPoll();

        if (import.meta.client) {
            try {
                localStorage.removeItem(POLL_DRAFT_KEY);
            } catch (error) {
                console.error('Failed to clear draft on reset:', error); // ALERT нужен нотификатор
            }
        }
    };

    const getLastOrder = (): number => {
        if (poll.value.questions.length === 0) return 1;

        const maxOrder = Math.max(...poll.value.questions.map((q) => q.order));
        return maxOrder + 1;
    };

    // Автоподгрузка после гидрации при монтировании
    if (import.meta.client) {
        setTimeout(loadFromStorage, 0);
    }

    return {
        poll,
        updatePoll,
        addQuestion,
        updateQuestion,
        moveQuestion,
        removeQuestion,
        resetPoll,
        saveDraft,
        sendPollOnServer,
    };
};
