import { server }  from './server/Server';



server.listen(process.env.PORT || 3001, () => {
  console.log(`App rodando na porta ${process.env.PORT || 3001}`);
});
