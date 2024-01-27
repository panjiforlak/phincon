
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './containers/Header';
import PokemonList from './containers/PokemonList';
import PokemonDetail from './containers/PokemonDetail';
import MyPokemonList from './containers/MyPokemonList';
import CatchPokemon from './containers/CatchPokemon';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
          <Routes>
            <Route path="/"  element={<PokemonList/>}/>
            <Route path="/catch"  element={<CatchPokemon/>}/>
            <Route path="/pokemon/:pokemonId"  element={<PokemonDetail/>}/>
            <Route path="/mypokemon" element={<MyPokemonList/>}/>
            <Route>404 Not Found</Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
