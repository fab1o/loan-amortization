import * as UserApi from '../../api/user';

describe('UserApi', () => {
    it('should get user', async () => {
        expect(await UserApi.getUser(2)).not.toBeNull();
    });
});
