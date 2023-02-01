# CASHFLOWBR_API_REST_NODE_TYPESCRIPT

# Repositório de uma API_REST_NODE_TYPESCRIPT para o Sistema de Fluxo de Caixa, para realizar o atendimento e faturamento aos clientes.

Para realizar o projeto, estou utilizando Typescript, NodeJs, Postgresql e Knex (ORM) para a realização do Backend.
No Frontend será utilizado Reactjs e Material-ui para estilização e atender a responsividade. Uma vez que o Material-ui possui seu design e desenvolvimento pela Google, o que indica ser uma boa opção para UI/UX e Android platform.

# Objetivo
1 - Criar controle de usuários, para acessar o sistema de atendimento e faturamento de clientes;<br /> 
2 - Cada usuário deve possuir um nome único;<br />
3 - Password seja composta de 8 caracteres, um número e uma letra maiúscula - deve ser hasheada ao salvar no banco;<br />
4 - Todo usuário deve ser possível logar na aplicação utilizando username e password, e quando validado gere um token JWT de 24 horas;<br />
5 - O sistema é dedicado para cadastrar clientes, contratos, e faturamento de clientes; <br/>
6 - O sistema usará códigos "open source" para complementar a seção de boletagem (criação dos boletos);<br />
7 - O sistema tem a finalidade de fazer a automação da cobrança (faturamento) e posteriormente dar baixa nas cobranças;<br />
8 - O usuário terá acesso a totalidade do sistema para a administração do atendimento;<br />

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
