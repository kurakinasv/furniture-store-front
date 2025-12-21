import { Router } from 'components/special';
import { RootStoreProvider } from 'stores/global/root';

const App: React.FC = () => {
  return (
    <RootStoreProvider>
      <Router />
    </RootStoreProvider>
  );
};

export default App;
