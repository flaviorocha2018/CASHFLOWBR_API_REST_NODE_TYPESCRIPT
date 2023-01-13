# NG_CASH_KNEX_API_REST_NODE_TYPESCRIPT

# Repositório de uma API_REST_NODE_TYPESCRIPT

Para realizar o projeto, estou utilizando Typescript, NodeJs, Postgresql e Knex (ORM) para a realização do Backend.
No Frontend será utilizado Reactjs e Material-ui para estilização e atender a responsividade. Uma vez que o Material-ui possui seu design e
desenvolvimento pela Google, o que indica ser uma boa opçao para UI/UX e Android platform.

# Objetivo
Ao criar um novo usuário, automaticamente  deve-se criar uma conta com balance de R$100,00 deste usuário; 
Cada usuário deve possuir um nome único;
Password seja composta de 8 caracteres, um número e uma letra maiúscula - deve ser hasheada ao salvar no banco;
Todo usuário deve ser possível logar na aplicação utilizando username e password, e quando validado gere um token JWT de 24 horas;
Todo usuário logado deve ser possível visualizar apenas a sua conta; e não ser possível visualizar outras contas;
O usuário poderá fazer transferência para outros usuários/contas, desde que possua saldo para isso, e não podera fazer para si mesmo;
As transações bem sucedidas deverão ser armazenadas na tabela "transactions". Em caso de falha a tabela não deve ser afetada;
Ao usuário será permitido visualizar todas as transações que participou "Cash-in" ou "Cash-out";
O usuário poderá filtrar as transações que participou - "Cash-in" ou "Cash-out" e data da realização.


  <strong>🚵 Requisitos a serem finalizados:</strong>
  Frontend: React e Typescript, utilizando Material-ui para estilização. Em andamento.

  
  <summary><strong>🗓 Data de Entrega - em desenvolvimento </strong></summary><br />
  
  * Este projeto é individual;
 
# Orientações

  - Os comandos que você utilizará com mais frequência são:
    Após clonar o projeto, faça um npm install para instalar as dependências
    1. npm start no terminal para rodar o servidor do backend;
    2. npm run knex:migrate para criar as tabelas no banco Postgresql;
    3. npm run knex:rollback para fazer o drop das tabelas no banco;
    4. npm run knex:seed para rodar o seed das cidades do estado;
  
<details>
  <summary><strong>🤝 Depois de terminar o desenvolvimento Frontend e Backend o projeto estará online</strong></summary><br />

  O link do projeto publicado na Digital Ocean estará disponível aqui abaixo após finalizado.

</details>

