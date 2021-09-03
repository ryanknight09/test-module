/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';

//@ts-ignore
const Header = React.lazy(() => import('remote/Header'));

console.log(Header);

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>Container Application</p>
        <React.Suspense fallback={<div>Loading Header...</div>}>
          <Header />
        </React.Suspense>
      </header>
    </div>
  );
};

export default App;
