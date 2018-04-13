import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const addUser = gql`
    mutation addUser($email: String) {
        addUser(email: $email) {
            error
            email
        }
    }
`;

class AddUser extends React.Component {
    state = {}
    render() {
        const addUserHandler = (e) => {
            e.preventDefault();
            const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(this.userEmail.value.match(emailRegExp)) {
                this.props.addUser({variables: {
                    email: this.userEmail.value
                }}).then((returned) => {
                    if(returned.data.addUser.error) {
                        this.setState({
                            emailInUse: true,
                            emailError: false
                        });
                    } else {
                        this.userEmail.value = '';
                        this.setState({
                            emailError: false,
                            emailInUse: false
                        })}
                    }
                );
            } else {
                this.setState({
                    emailError: true,
                    emailInUse: false
                });
            }
        }

        return(
            <form onSubmit={addUserHandler} className="add-user">
                <input type="text" ref={(ref) => {this.userEmail = ref}} className="add-user__input"/>
                <button type="submit" className="add-user__button">
                    <i className="add-user__icon"></i>
                </button>
                {this.state.emailError && <span className="add-user__error">Incorrect email</span>}
                {this.state.emailInUse && <span className="add-user__error">Email in use</span>}
            </form>
        )
    }
    
}

export default graphql(addUser, {name: 'addUser', options: {
    refetchQueries: ['GetUsers']
}})(AddUser);