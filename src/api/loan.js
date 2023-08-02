/**
 * @desc Create a user.
 * @param {Object} loan
 * @param {Number} loan.amount
 * @param {Number} loan.apr
 * @param {Number} loan.term
 * @param {String} [loan.status='active']
 * @param {Number} loan.owner_id
 * @returns {Object}
 * @throws {Error}
 */
async function createLoan(loan) {
    loan.status = loan.status || 'active';

    const url = 'https://gl-interview.azurewebsites.net/loans';

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(loan),
        headers: {
            'Content-type': 'application/json',
        },
    });

    const data = await response.json();

    if (response.status === 200) {
        return data;
    }

    const msg = data.detail.reduce(
        (acc, curr) => `${acc} ${curr.loc[1]} ${curr.msg}.`,
        ''
    );

    throw Error(msg);
}

/**
 * @desc Gets loans by userId.
 * @param {Number} userId
 * @returns {Array<Object>} loans
 * @throws {Error}
 */
async function getLoansByUserId(userId) {
    const url = `https://gl-interview.azurewebsites.net/users/${userId}/loans`;

    const response = await fetch(url);
    const loans = await response.json();

    return loans;
}

/**
 * @desc Share a loan.
 * @param {Object} loan
 * @param {Number} userId
 * @returns {Boolean}
 * @throws {Error}
 */
async function shareLoan(loan, userId) {
    const url = `https://gl-interview.azurewebsites.net/loans/${loan.id}/share?owner_id=${loan.owner_id}&user_id=${userId}`;

    const response = await fetch(url, {
        method: 'POST',
    });

    if (response.status === 200) {
        return true;
    }

    return false;
}

/**
 * @desc Gets loan schedule.
 * @param {Number} loanId
 * @param {Number} userId
 * @returns {Array<Object>}
 * @throws {Error}
 */
async function getLoanSchedule(loanId, userId) {
    const url = `https://gl-interview.azurewebsites.net/loans/${loanId}?user_id=${userId}`;

    const response = await fetch(url);

    return await response.json();
}

/**
 * @desc Share loans.
 * @param {Array<Object>} loans
 * @param {Number} userId
 * @returns {Boolean}
 * @throws {Error}
 */
async function shareLoans(loans, userId) {
    const promises = loans.map((loan) => shareLoan(loan, userId));

    const results = await Promise.all(promises);

    return results.reduce((acc, curr) => acc && curr, true);
}

export { createLoan, getLoansByUserId, shareLoan, shareLoans, getLoanSchedule };
