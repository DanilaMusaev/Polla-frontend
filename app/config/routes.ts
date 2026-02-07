export const ROUTES = {
    main: '/',
    createPoll: '/create',
    checkPoll: (id: string) => `/check/${id}`,
    completePoll: (id: string) => `/poll/${id}`,
    gitRepo: 'https://github.com/DanilaMusaev/Polla-frontend',
};