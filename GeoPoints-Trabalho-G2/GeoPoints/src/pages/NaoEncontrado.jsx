import { Link } from 'react-router-dom';
function NaoEncontrado() {
  return <section className="not-found"><span>404</span><h1>Página não encontrada</h1><p>O endereço acessado não corresponde a uma página do GeoPoints.</p><Link className="button button-primary" to="/pontos">Voltar para os pontos</Link></section>;
}
export default NaoEncontrado;
