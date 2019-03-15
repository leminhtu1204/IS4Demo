import { ApolloClient, NormalizedCache } from 'apollo-boost';
interface BaseProps {
    client: ApolloClient<NormalizedCache>;
}

export default BaseProps;