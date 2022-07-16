import './App.scss';
// Components
import HEADER from './components/headers/header';
import MAIN from './components/main/main';
import FOOTER from './components/footers/footer';

function App() {
  return (
    <div className="App">
      <HEADER />
      <MAIN />
      <FOOTER />
    </div>
  );
}

export default App;
