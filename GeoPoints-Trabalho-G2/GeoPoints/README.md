# GeoPoints — Trabalho G2

Frontend React + Vite para o CRUD de pontos geográficos da GeoPoint API, desenvolvido a partir da estrutura inicial do projeto e do modelo didático de CRUD da Aula 11.

## Tecnologias utilizadas

- React
- Vite
- React Router DOM
- JavaScript (ES Modules)
- CSS
- Fetch API

Não foram adicionadas bibliotecas de interface, mapas ou formulários. A aplicação utiliza os recursos estudados nas aulas e as dependências já presentes no projeto-base.

## API

URL base: `https://geopoint-6x4u.onrender.com`

Recurso: `https://geopoint-6x4u.onrender.com/api/points`

| Método | Endpoint | Ação |
|---|---|---|
| GET | `/api/points` | Listar pontos |
| GET | `/api/points/{id}` | Consultar ponto |
| POST | `/api/points` | Cadastrar ponto |
| PUT | `/api/points/{id}` | Atualizar ponto |
| DELETE | `/api/points/{id}` | Excluir ponto |

O endereço foi definido conforme `API-para-utilizar-no-trabalho.txt`. A disponibilidade externa depende do serviço hospedado. O navegador de pesquisa não conseguiu validar a rota da API; execute os testes abaixo no ambiente de entrega.

## Executar

Requer Node.js e npm instalados.

```bash
npm install
npm run dev
```

Abra o endereço local informado pelo Vite (normalmente `http://localhost:5173`).

Para validar a compilação:

```bash
npm run build
```

## Rotas

- `/pontos` — listagem, filtro e exclusão.
- `/pontos/novo` — cadastro.
- `/pontos/:id` — detalhes e exclusão.
- `/pontos/:id/editar` — edição.
- Demais caminhos — página 404.

## Funcionalidades implementadas

- Listagem consumindo `GET /api/points`.
- Filtro local por nome e descrição, sem diferenciar maiúsculas/minúsculas.
- Cadastro com `POST`.
- Consulta individual com `GET /api/points/{id}`.
- Edição com `PUT`.
- Exclusão com confirmação e `DELETE`.
- Tratamento de resposta `204 No Content`, sem chamar `response.json()`.
- Estados de carregamento, erro e lista vazia.
- Validação de nome (obrigatório, até 100 caracteres), descrição (até 255), latitude (-90 a 90) e longitude (-180 a 180).
- Conversão de latitude e longitude para `Number`.
- Formulário reaproveitado para cadastro e edição.
- Navegação com `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `useParams` e `useNavigate`.
- Layout responsivo, com cabeçalho escuro e interface limpa inspirada na referência visual fornecida.

## Divisão do trabalho em duas pessoas

A divisão abaixo permite que cada integrante desenvolva uma parte identificável e faça seus próprios commits. Substituam `Pessoa 1` e `Pessoa 2` pelos nomes reais antes de publicar o histórico.

### Pessoa 1 — Integração com API e operações CRUD

Responsabilidades:
- `src/services/api.js`
- `src/pages/CadastroPonto.jsx`
- `src/pages/EditarPonto.jsx`
- `src/pages/DetalhePonto.jsx`
- `src/components/FormPonto.jsx`

Commits sugeridos:
```bash
git add src/services/api.js src/components/FormPonto.jsx
git commit -m "feat: implementa integração com GeoPoint API e formulário"

git add src/pages/CadastroPonto.jsx src/pages/EditarPonto.jsx src/pages/DetalhePonto.jsx
git commit -m "feat: implementa cadastro, edição e detalhes dos pontos"
```

### Pessoa 2 — Listagem, componentes e interface

Responsabilidades:
- `src/components/Navbar.jsx`
- `src/components/FiltroPontos.jsx`
- `src/components/TabelaPontos.jsx`
- `src/components/Mensagem.jsx`
- `src/pages/ListaPontos.jsx`
- `src/pages/NaoEncontrado.jsx`
- `src/App.jsx`
- `src/App.css`
- `src/index.css`

Commits sugeridos:
```bash
git add src/components/Navbar.jsx src/components/FiltroPontos.jsx src/components/TabelaPontos.jsx src/components/Mensagem.jsx src/pages/ListaPontos.jsx
git commit -m "feat: implementa listagem, filtro e ações dos pontos"

git add src/pages/NaoEncontrado.jsx src/App.jsx src/App.css src/index.css
git commit -m "style: finaliza navegação e identidade visual responsiva"
```

### Integração final — ambos

Cada pessoa deve configurar o nome e e-mail reais do Git:

```bash
git config user.name "Nome do integrante"
git config user.email "email@exemplo.com"
```

Depois da integração:
```bash
npm run build
git status
git log --oneline
```

Não façam commits usando o nome de outra pessoa. Cada integrante deve registrar seus próprios commits com sua conta/configuração real.

## Checklist de testes antes da entrega

- [ ] `npm install` termina sem erros.
- [ ] `npm run build` termina sem erros.
- [ ] A listagem exibe dados retornados pela API.
- [ ] O filtro encontra por nome e descrição.
- [ ] A mensagem de lista vazia aparece quando necessário.
- [ ] O cadastro cria um registro e retorna à listagem.
- [ ] A tela de detalhes carrega o UUID selecionado.
- [ ] A edição persiste as alterações.
- [ ] A exclusão solicita confirmação e remove o registro.
- [ ] O DELETE não tenta interpretar JSON de uma resposta 204.
- [ ] As validações impedem dados fora dos limites.
- [ ] A navegação funciona nas rotas solicitadas.
- [ ] A interface foi conferida em largura desktop e celular.

## Observação sobre a API hospedada

O frontend aponta para a URL exata fornecida nos materiais. Serviços hospedados em planos gratuitos podem levar alguns instantes para despertar ou apresentar indisponibilidade temporária. Se a requisição falhar, confira a URL e o status do serviço antes de alterar o código da aplicação.
