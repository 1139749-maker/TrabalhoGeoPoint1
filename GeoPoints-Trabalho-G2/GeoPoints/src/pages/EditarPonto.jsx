import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormPonto from '../components/FormPonto';
import Mensagem from '../components/Mensagem';
import { atualizarPonto, buscarPonto } from '../services/api';

function EditarPonto() {
  const { id } = useParams();
  const navegar = useNavigate();
  const [ponto, setPonto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregar = async () => {
      try { setPonto(await buscarPonto(id)); }
      catch (erroApi) { setErro(erroApi.message); }
      finally { setCarregando(false); }
    };
    carregar();
  }, [id]);

  const salvar = async (dados) => {
    await atualizarPonto(id, dados);
    navegar(`/pontos/${id}`, { replace: true });
  };

  return (
    <section className="narrow-page">
      <div className="breadcrumbs"><Link to="/pontos">Pontos</Link><span>/</span><Link to={`/pontos/${id}`}>Detalhes</Link><span>/</span><span>Editar</span></div>
      <div className="page-heading compact"><div><span className="eyebrow">ATUALIZAÇÃO</span><h1>Editar ponto</h1><p>Altere as informações do local selecionado.</p></div></div>
      {carregando ? <Mensagem>Carregando dados do ponto...</Mensagem> : erro ? <Mensagem tipo="erro">{erro}</Mensagem> : ponto && <FormPonto pontoInicial={ponto} onSalvar={salvar} textoBotao="Salvar alterações" />}
    </section>
  );
}
export default EditarPonto;
