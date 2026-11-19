import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { excluirPonto, listarPontos } from '../services/api';
import FiltroPontos from '../components/FiltroPontos';
import TabelaPontos from '../components/TabelaPontos';
import Mensagem from '../components/Mensagem';

function ListaPontos() {
  const [pontos, setPontos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregarPontos = async () => {
    setCarregando(true);
    setErro('');
    try {
      const dados = await listarPontos();
      setPontos(Array.isArray(dados) ? dados : []);
    } catch (erroApi) {
      setErro(`${erroApi.message}. Verifique sua conexão com a GeoPoint API e tente novamente.`);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { carregarPontos(); }, []);

  const pontosFiltrados = useMemo(() => {
    const termo = filtro.trim().toLocaleLowerCase('pt-BR');
    if (!termo) return pontos;
    return pontos.filter((ponto) =>
      `${ponto.name || ''} ${ponto.description || ''}`.toLocaleLowerCase('pt-BR').includes(termo)
    );
  }, [pontos, filtro]);

  const confirmarExclusao = async (ponto) => {
    if (!window.confirm(`Deseja realmente excluir "${ponto.name}"?`)) return;
    try {
      await excluirPonto(ponto.id);
      setPontos((atuais) => atuais.filter((item) => item.id !== ponto.id));
    } catch (erroApi) {
      setErro(`Não foi possível excluir: ${erroApi.message}`);
    }
  };

  return (
    <section>
      <div className="page-heading">
        <div><span className="eyebrow">GERENCIAMENTO</span><h1>Pontos geográficos</h1><p>Consulte, pesquise e gerencie os pontos cadastrados.</p></div>
        <Link className="button button-primary" to="/pontos/novo"><span aria-hidden="true">＋</span> Novo ponto</Link>
      </div>
      <section className="panel">
        <div className="panel-heading"><div><h2>Todos os pontos</h2><p>Lista atualizada diretamente pela GeoPoint API.</p></div></div>
        <FiltroPontos valor={filtro} onChange={setFiltro} quantidade={pontosFiltrados.length} />
        {erro && <Mensagem tipo="erro">{erro} <button className="inline-button" onClick={carregarPontos}>Tentar novamente</button></Mensagem>}
        {carregando ? <Mensagem>Carregando pontos...</Mensagem> :
          <TabelaPontos pontos={pontosFiltrados} onExcluir={confirmarExclusao} />}
      </section>
    </section>
  );
}
export default ListaPontos;
