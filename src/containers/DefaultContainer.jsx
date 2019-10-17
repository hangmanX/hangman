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
      <>
        {/* apparently the above is good enough for a fragment */}
        <a
          href="https://github.com/login/oauth/authorize?client_id=cecbb15649468c524b83"
        >
          Login with Github
        </a>

        <h1>Hangman X</h1>
      </>
    );
  }
}

export default DefaultContainer;
