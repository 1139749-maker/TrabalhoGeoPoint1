function FiltroPontos({ valor, onChange, quantidade }) {
  return (
    <div className="filter-row">
      <label className="search-box">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          type="search"
          value={valor}
          onChange={(evento) => onChange(evento.target.value)}
          placeholder="Buscar por nome ou descrição..."
          aria-label="Filtrar pontos por nome ou descrição"
        />
      </label>
      <span className="result-count">{quantidade} {quantidade === 1 ? 'ponto' : 'pontos'}</span>
    </div>
  );
}
export default FiltroPontos;
