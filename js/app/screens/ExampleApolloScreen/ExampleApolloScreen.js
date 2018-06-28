/**
 * @providesModule screens.ExampleApolloScreen
 * @flow
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Button from 'components.Button';

type Props = {
  data: any,
};
type State = {};

class ExampleApolloScreen extends React.PureComponent<Props, State> {
    render() {
        const { data } = this.props;
        if (data.loading) {
            return (
                <View>
                    <Text>
                        { 'LOADING DATA' }
                    </Text>
                </View>
            );
        }

        return (
            <View>
                <Text>
                    { 'Users fetched via GraphQL\n\n' }
                </Text>
                { data.users.map((user) => {
                    return (
                        <Text key={ user.id }> { user.name } </Text>
                    );
                }) }

                <Button
                    shouldHavePressDelay={ true }
                    onPress={ () => { this.refetchGraphQLData(); } }
                    text={ 'Refetch' }
                />
            </View>
        );
    }

    refetchGraphQLData() {
        if (this.props.data.refetch) {
            this.props.data.refetch();
        }
    }
}

const USERS_QUERY = gql`query {
  users {
    id
    name
  }
}`;

export default graphql(USERS_QUERY)(ExampleApolloScreen);

