import * as LoanApi from '../../api/loan';

describe('LoanApi', () => {
    it('should get all loans', async () => {
        expect(Array.isArray(await LoanApi.getLoansByUserId(1))).toBe(true);
    });
});
