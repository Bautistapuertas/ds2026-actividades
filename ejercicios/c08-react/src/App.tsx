import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Catalogo } from './pages/Catalogo';
import './App.css';

function App() {
  return (
    <Container className="py-4">
      <Catalogo />
    </Container>
  );
}

export default App;
