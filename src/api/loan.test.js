import * as LoanApi from './loan';

// todo: create mock instead

describe('LoanApi', () => {
    it('should get all loans', async () => {
        expect(Array.isArray(await LoanApi.getLoansByUserId(1))).toBe(true);
    });
});
