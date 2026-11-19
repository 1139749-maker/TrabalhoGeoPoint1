import { Link } from 'react-router-dom';

function TabelaPontos({ pontos, onExcluir }) {
  if (!pontos.length) {
    return <div className="empty-state"><span className="empty-icon">⌖</span><h3>Nenhum ponto encontrado</h3><p>Tente alterar o filtro ou cadastre um novo ponto geográfico.</p></div>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>Nome</th><th>Descrição</th><th>Latitude</th><th>Longitude</th><th className="actions-heading">Ações</th></tr>
        </thead>
        <tbody>
          {pontos.map((ponto) => (
            <tr key={ponto.id}>
              <td><Link className="point-name" to={`/pontos/${ponto.id}`}>{ponto.name}</Link></td>
              <td className="description-cell">{ponto.description || '—'}</td>
              <td className="coordinate">{ponto.latitude}</td>
              <td className="coordinate">{ponto.longitude}</td>
              <td>
                <div className="table-actions">
                  <Link className="action-link" to={`/pontos/${ponto.id}`} aria-label={`Ver ${ponto.name}`}>Ver</Link>
                  <Link className="action-link" to={`/pontos/${ponto.id}/editar`} aria-label={`Editar ${ponto.name}`}>Editar</Link>
                  <button className="action-link danger-link" onClick={() => onExcluir(ponto)} type="button">Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TabelaPontos;
