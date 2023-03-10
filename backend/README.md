---
tags: [bold, Import-3a8b, Italic]
title: NG_CASH_KNEX_API_REST_NODE_TYPESCRIPT
created: '2023-01-07T23:50:15.871Z'
modified: '2023-01-17T02:00:47.934Z'
---

# NG_CASH_KNEX_API_REST_NODE_TYPESCRIPT

# Repositório de uma API_REST_NODE_TYPESCRIPT

Para realizar o projeto, estou utilizando Typescript, NodeJs, Postgresql e Knex (ORM) para a realização do Backend.
No Frontend será utilizado Reactjs e Material-ui para estilização e atender a responsividade. Uma vez que o Material-ui possui seu design e desenvolvimento pela Google, o que indica ser uma boa opção para UI/UX e Android platform.

# Objetivo
1 - Ao criar um novo usuário, automaticamente  deve-se criar uma conta com balance de R$100,00 deste usuário;<br /> 
2 - Cada usuário deve possuir um nome único;<br />
3 - Password seja composta de 8 caracteres, um número e uma letra maiúscula - deve ser hasheada ao salvar no banco;<br />
4 - Todo usuário deve ser possível logar na aplicação utilizando username e password, e quando validado gere um token JWT de 24 horas;<br />
5 - Todo usuário logado deve ser possível visualizar apenas a sua conta; e não ser possível visualizar outras contas;<br />
6 - O usuário poderá fazer transferência para outros usuários/contas, desde que possua saldo para isso, e não podera fazer para si mesmo;<br />
7 - As transações bem sucedidas deverão ser armazenadas na tabela "transactions". Em caso de falha a tabela não deve ser afetada;<br />
8 - Ao usuário será permitido visualizar todas as transações que participou "Cash-in" ou "Cash-out";<br />
9 - O usuário poderá filtrar as transações que participou - "Cash-in" ou "Cash-out" e data da realização.<br />


  <strong>🚵 Requisitos a serem finalizados:</strong>
  Frontend: React e Typescript, utilizando Material-ui para estilização. Em andamento.

  
  <summary><strong>🗓 Data de Entrega - em desenvolvimento </strong></summary><br />
  
  * Este projeto é individual;
 
# Orientações

 <p> <strong>- Os comandos que você utilizará com mais frequência são:</strong>
   <p> Após clonar o projeto, faça um npm install para instalar as dependências<br />
    1. npm start no terminal para rodar o servidor do backend;<br />
    2. npm run knex:migrate para criar as tabelas no banco Postgresql;<br />
    3. npm run knex:rollback para fazer o drop das tabelas no banco;<br />
    4. npm run knex:seed para rodar o seed das cidades do estado;<br />
  
<details>
  <summary><strong>🤝 Depois de terminar o desenvolvimento Frontend e Backend o projeto estará online</strong></summary><br />

  O link do projeto publicado na Digital Ocean estará disponível aqui abaixo após finalizado.<br />

</details>
