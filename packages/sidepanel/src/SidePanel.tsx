import '@src/SidePanel.css';
import {
  exampleThemeStorage,
  useStorageSuspense,
  withErrorBoundary,
  withSuspense,
} from '@chrome-extension-boilerplate/shared';

const SidePanel = () => {
  const theme = useStorageSuspense(exampleThemeStorage);

  return (
    <div
      className="App"
      style={{
        backgroundColor: theme === 'light' ? '#eee' : '#222',
      }}>
      <header className="App-header" style={{ color: theme === 'light' ? '#222' : '#eee' }}>
        {/*TODO: ADD asset managing module or some other solution */}
        <img src={chrome.runtime.getURL('sidepanel/logo.svg')} className="App-logo" alt="logo" />
        <p>
          Edit <code>packages/sidepanel/src/SidePanel.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme === 'light' ? '#0281dc' : undefined, marginBottom: '10px' }}>
          Learn React
        </a>
        <h6>The color of this paragraph is defined using SASS.</h6>
        <button
          style={{
            backgroundColor: theme === 'light' ? '#eee' : '#222',
            color: theme === 'light' ? '#222' : '#eee',
          }}
          onClick={exampleThemeStorage.toggle}>
          Toggle theme
        </button>
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);