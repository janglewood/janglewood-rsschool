import Model from './Model';

describe('model.getRandomQuerie', () => {
    it('Should be a string', () => {
        const data = ['despacito'];
        const model = new Model();
        const result = model.getRandomQuerie(data);
        expect(result).toBe('despacito');
    });
});
