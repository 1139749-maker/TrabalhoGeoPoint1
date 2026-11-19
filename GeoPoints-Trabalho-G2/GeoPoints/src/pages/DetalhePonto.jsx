import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { buscarPonto, excluirPonto } from '../services/api';
import Mensagem from '../components/Mensagem';

function DetalhePonto() {
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

  const excluir = async () => {
    if (!window.confirm(`Deseja realmente excluir "${ponto.name}"? Esta ação não pode ser desfeita.`)) return;
    try {
      await excluirPonto(id);
      navegar('/pontos', { replace: true });
    } catch (erroApi) { setErro(`Não foi possível excluir o ponto: ${erroApi.message}`); }
  };

  return (
    <section className="narrow-page">
      <div className="breadcrumbs"><Link to="/pontos">Pontos</Link><span>/</span><span>Detalhes</span></div>
      {carregando ? <Mensagem>Carregando dados do ponto...</Mensagem> : erro && !ponto ? <Mensagem tipo="erro">{erro}</Mensagem> : ponto && (
        <>
          <div className="page-heading compact"><div><span className="eyebrow">DETALHES DO REGISTRO</span><h1>{ponto.name}</h1><p>Informações completas do ponto geográfico.</p></div></div>
          {erro && <Mensagem tipo="erro">{erro}</Mensagem>}
          <article className="detail-card">
            <div className="detail-top"><span className="detail-pin">⌖</span><div><span className="detail-label">PONTO GEOGRÁFICO</span><h2>{ponto.name}</h2></div></div>
            <div className="detail-grid">
              <div className="detail-item full"><span>Descrição</span><p>{ponto.description || 'Nenhuma descrição informada.'}</p></div>
              <div className="detail-item"><span>Latitude</span><strong>{ponto.latitude}</strong></div>
              <div className="detail-item"><span>Longitude</span><strong>{ponto.longitude}</strong></div>
              <div className="detail-item full"><span>Identificador (UUID)</span><code>{ponto.id}</code></div>
            </div>
          </article>
          <div className="detail-actions"><Link className="button button-secondary" to="/pontos">Voltar para lista</Link><Link className="button button-primary" to={`/pontos/${id}/editar`}>Editar ponto</Link><button className="button button-danger" onClick={excluir}>Excluir ponto</button></div>
        </>
      )}
    </section>
  );
}
export default DetalhePonto;
