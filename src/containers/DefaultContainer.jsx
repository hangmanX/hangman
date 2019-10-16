import React from 'react';

class DefaultContainer extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    // some oauth??

    // load rooms from database?
  }

  render() {
    return (
      <fragment>
        <a
          href="https://github.com/login/oauth/authorize?client_id=6299af3a88a73b2fd148"
        >
          Login with Github
        </a>

        <h1>Hangman X</h1>
      </fragment>
    );
  }
}

export default DefaultContainer;
