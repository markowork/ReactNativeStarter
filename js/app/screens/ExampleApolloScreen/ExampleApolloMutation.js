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
                newName: 'Marina',
                userId: '5b337ff5deb9811168e8873d',
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

