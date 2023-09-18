import React,{ useState, useEffect } from 'react';
import { Amplify, Auth } from 'aws-amplify'; // Note the named import
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { getUserFragments } from './api';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: process.env.REACT_APP_AWS_COGNITO_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,
    oauth: {
      domain: process.env.REACT_APP_AWS_COGNITO_HOSTED_UI_DOMAIN,
      redirectSignIn: process.env.REACT_APP_OAUTH_SIGN_IN_REDIRECT_URL,
      redirectSignOut: process.env.REACT_APP_OAUTH_SIGN_OUT_REDIRECT_URL,
      responseType: 'code',
    },
  },
});

function App() {

  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndFragments = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const { attributes } = user;
        setUserName(attributes.name);
        setUser(user);

        // Fetch user fragments after setting the user.
        getUserFragments(user);
      } catch (error) {
        console.error('Error fetching user', error);
      }
    };

    fetchUserAndFragments();
  }, []);


  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="App">
      <h1>Hello, {userName || "here will be your name" }!</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default withAuthenticator(App,{
  signUpAttributes: ['email', 'name'],
});