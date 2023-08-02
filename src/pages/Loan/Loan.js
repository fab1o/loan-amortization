import { useParams } from 'react-router-dom';

import Create from './Create';
import View from './View';

function Loan({ user }) {
    const params = useParams();

    if (params.id) {
        return <View id={params.id} user={user} />;
    }

    return <Create user={user} />;
}

export default Loan;
