/**
 * @flow
 */

import * as React from 'react';
import { View } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Button from 'components.Button';

type Props = {
  mutate: any,
};
type State = {};

class ExampleApolloMutation extends React.PureComponent<Props, State> {
    render() {
        return (
            <View>
                <Button
                    shouldHavePressDelay={ true }
                    onPress={ () => { this.triggerMutation(); } }
                    text={ 'Trigger mutation' }
                />
            </View>
        );
    }

    triggerMutation() {
        this.props.mutate({
            variables: {
                newName: 'Miss Monique',
                userId: '5b338fbc2f6dfe12d0bac8f2',
            },
        });
    }
}

const USER_MUTATION = gql`mutation changeUserName($newName: String!, $userId: ID!) {
  changeUserName(newName: $newName, userId: $userId) {
    id
    name
  }
}`;

export default graphql(USER_MUTATION)(ExampleApolloMutation);

