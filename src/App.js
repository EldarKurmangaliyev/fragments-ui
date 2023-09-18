import React,{ useState, useEffect } from 'react';
import { Amplify, Auth } from 'aws-amplify'; // Note the named import
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

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
    const fetchUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const { attributes } = user;
        setUserName(attributes.name); 
      } catch (error) {
        console.error('Error fetching user', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log(user); // Inspect this user object in Dev Tools
        setUser(user);
      })
      .catch((err) => console.log(err));
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