import { useEffect, useState } from 'react';
import Mensagem from './Mensagem';

const valoresIniciais = { name: '', description: '', latitude: '', longitude: '' };

function FormPonto({ pontoInicial, onSalvar, textoBotao = 'Cadastrar ponto' }) {
  const [dados, setDados] = useState(valoresIniciais);
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (pontoInicial) {
      setDados({
        name: pontoInicial.name ?? '',
        description: pontoInicial.description ?? '',
        latitude: String(pontoInicial.latitude ?? ''),
        longitude: String(pontoInicial.longitude ?? ''),
      });
    }
  }, [pontoInicial]);

  const alterar = (evento) => setDados({ ...dados, [evento.target.name]: evento.target.value });

  const enviar = async (evento) => {
    evento.preventDefault();
    setErro('');
    const nome = dados.name.trim();
    const latitude = Number(dados.latitude);
    const longitude = Number(dados.longitude);

    if (!nome) return setErro('Informe o nome do ponto.');
    if (nome.length > 100) return setErro('O nome deve ter no máximo 100 caracteres.');
    if (dados.description.length > 255) return setErro('A descrição deve ter no máximo 255 caracteres.');
    if (dados.latitude.trim() === '' || !Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
      return setErro('Informe uma latitude válida entre -90 e 90.');
    }
    if (dados.longitude.trim() === '' || !Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
      return setErro('Informe uma longitude válida entre -180 e 180.');
    }

    setSalvando(true);
    try {
      await onSalvar({
        name: nome,
        description: dados.description.trim(),
        latitude: Number(latitude),
        longitude: Number(longitude),
      });
    } catch (erroSalvar) {
      setErro(erroSalvar.message || 'Não foi possível salvar o ponto.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <form className="form-card" onSubmit={enviar}>
      {erro && <Mensagem tipo="erro">{erro}</Mensagem>}
      <div className="form-grid">
        <div className="field field-full">
          <label htmlFor="name">Nome do ponto <span>*</span></label>
          <input id="name" name="name" value={dados.name} onChange={alterar} maxLength="100" required placeholder="Ex.: Praça Central" />
          <small>{dados.name.length}/100 caracteres</small>
        </div>
        <div className="field field-full">
          <label htmlFor="description">Descrição</label>
          <textarea id="description" name="description" value={dados.description} onChange={alterar} maxLength="255" rows="3" placeholder="Descreva brevemente este local" />
          <small>{dados.description.length}/255 caracteres</small>
        </div>
        <div className="field">
          <label htmlFor="latitude">Latitude <span>*</span></label>
          <input id="latitude" name="latitude" type="number" step="any" min="-90" max="90" value={dados.latitude} onChange={alterar} required placeholder="-28.2825" />
          <small>Entre -90 e 90</small>
        </div>
        <div className="field">
          <label htmlFor="longitude">Longitude <span>*</span></label>
          <input id="longitude" name="longitude" type="number" step="any" min="-180" max="180" value={dados.longitude} onChange={alterar} required placeholder="-52.7869" />
          <small>Entre -180 e 180</small>
        </div>
      </div>
      <div className="form-footer">
        <span className="required-note">* Campos obrigatórios</span>
        <button className="button button-primary" type="submit" disabled={salvando}>{salvando ? 'Salvando...' : textoBotao}</button>
      </div>
    </form>
  );
}
export default FormPonto;
