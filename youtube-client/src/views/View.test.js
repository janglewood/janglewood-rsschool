import View from './View';

describe('View.formatDate', () => {
    it('Should be a correct date format', () => {
        const view = new View();
        const date = '2019-05-19T16:00:00.000Z';
        expect(view.formatDate(date)).toBe('19.05.2019');
    });
});
