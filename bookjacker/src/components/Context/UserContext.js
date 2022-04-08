import React, { Component } from 'react';
const UserContext = React.createContext();
export const UserConsumer = UserContext.Consumer;
class UserProvider extends Component {


    state = {
       user:{}, allBooks: {}, userBooks: {},  isloggedin: false, readingbook1: { id: '', page: '' }, readingbook2: { id: '', page: '' },
    }

    login = (user) => {
        this.setState({ user:user, isloggedin: true })
    }
    logout = () => {
        this.setState({ user:{}, allBooks:{}, userBooks: {}, isloggedin: false, readingbook1: { id: '', page: '' }, readingbook2: { id: '', page: '' } })
    }
    render() {
        const state = this.state;
        const login = this.login;
        const logout = this.logout;
      //  const{allBooks, userBooks, fname, lname, email, phone, isloggedin, readingbook1, readingbook2, login, logout}=this.context;
        return (<UserContext.Provider value={{state, login, logout}}>
            {this.props.children}
            </UserContext.Provider>
        );
    }

}

export default UserProvider;
