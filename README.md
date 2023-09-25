# Avaliação

Versão do Angular: v15.2.6. Versão indicada do node: v14.20.1.

## Requisitos da aplicação

Utilizando a API: https://dummyapi.io/data/v1/, seguindo a documentação: https://dummyapi.io/docs (Endpoints de usuários: https://dummyapi.io/docs/user ).

##### Criar as seguintes paginas:
- Exibição de lista de usuários
- Exibição de usuário único
- Criação de usuários
- Atualização de dados de usuário. 

###### Outras informações:
Todas as paginas precisam estar integradas com a API. 
A API necessita de autenticação via header conforme documentação. 
O "Token" se encontra no e-mail onde essa avaliação foi enviada.
Opcional: bibliotecas de componentes como Angular Material ou Bootstrap.

### Requisito das paginas

**Exibição de lista de usuários:**
Botão de redirecionamento para pagina de criação de usuário.
Lista de usuários com Botão para deletar o usuário, botões para redirecionamento para as paginas de exibição de usuário único e atualização de dados do usuário.

**Exibição de usuário único:**
Exibição do usuário e botão voltar.

**Criação de usuários:**
Formulário de criação de usuário.

**Atualização de dados de usuário:**
Formulário de atualização de dados do usuário pelo ID disponibilizado na lista.
Toda vez que editar os inputs, salvar o formulário, se preocupar com quantidade de requisições para evitar sobre carga do servidor.

**Instalação do projeto:**
```
npm install
```

**Iniciando o projeto:**
```
npm start 
```

**Fazendo a Build:**
```
npm run build
```

**Considerações finais**
Procurei não utilizar coisas prontas (Tailwind, bootstrap, jQuery, etc), fazendo todo o css, script e configuração do projeto do zero para poderem avaliar se tenho ou não domínio.
Tentei fazer um login, porém como demandou muito tempo partir do zero, fiz apenas a tela de login.
Basta preecher o login (min: 2 char) e password (min: 8 char) e clicar no botão **Entrar** para ser direcionado para página de usuários.
Criei um componente de formulário no qual pude aproveitar no create e edit do usuário.
Criei também um componente de paginação.
Pensei em fazer um campo para busca e ordenação na lista de usuários, porém a API não suporta tal, ficando inviável para o teste.
Como não tinha um layout para seguir, fiz algo bem básico, focando no enunciado acima.