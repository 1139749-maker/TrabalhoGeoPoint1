import { Link, useNavigate } from 'react-router-dom';
import FormPonto from '../components/FormPonto';
import { criarPonto } from '../services/api';

function CadastroPonto() {
  const navegar = useNavigate();
  const salvar = async (dados) => {
    await criarPonto(dados);
    navegar('/pontos', { replace: true });
  };
  return (
    <section className="narrow-page">
      <div className="breadcrumbs"><Link to="/pontos">Pontos</Link><span>/</span><span>Novo ponto</span></div>
      <div className="page-heading compact"><div><span className="eyebrow">NOVO REGISTRO</span><h1>Cadastrar ponto</h1><p>Preencha os dados para adicionar um local geográfico.</p></div></div>
      <FormPonto onSalvar={salvar} textoBotao="Cadastrar ponto" />
    </section>
  );
}
export default CadastroPonto;
