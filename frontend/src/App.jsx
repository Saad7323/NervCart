import { Show, SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/react';
import PageLoader from './components/PageLoader';
import Layout from './components/Layout';


function App() {
  const {isLoaded} = useAuth();
  
  if (!isLoaded) return <PageLoader />;

  return (
    <Layout>
      <header>
        <Show when="signed-out">
          <SignInButton mode="modal"/>
          <SignUpButton mode="modal" />
        </Show> 
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
      <p className="text-red-700 text-3xl font-bold underline bg-amber-700">hello world</p>
      <button className="btn btn-primary">Click me</button>
    </Layout>
  );
}

export default App;