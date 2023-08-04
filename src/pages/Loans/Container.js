import { useParams } from 'react-router-dom';

import View from './View';
import Loans from './Loans';

function Container({ user }) {
    const params = useParams();

    if (params.id) {
        return <View id={params.id} user={user} />;
    }

    return <Loans user={user} />;
}

export default Container;
