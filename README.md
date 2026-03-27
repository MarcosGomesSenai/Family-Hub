FAMILYHUB - PLATAFORMA DE GESTÃO FAMILIAR

O FamilyHub é um sistema completo desenvolvido para organizar a rotina da sua família em um único lugar. Ele centraliza o controle de tarefas, listas de compras e receitas, utilizando um sistema de gamificação para incentivar a participação de todos os membros de forma colaborativa e divertida.

==================================================

FLUXO DE FUNCIONAMENTO
==================================================

O fluxo do FamilyHub segue uma arquitetura baseada no consumo de uma API protegida, onde o painel principal reage aos dados fornecidos pelo servidor. O ciclo de uso funciona da seguinte maneira:

Etapa 1 - Autenticação e Acesso
O usuário acessa a página inicial e realiza o login ou cadastro. O servidor valida as credenciais, aplica as regras de segurança contra ataques e, se tudo estiver correto, devolve um token de acesso exclusivo. A partir desse momento, o usuário está dentro do sistema.

Etapa 2 - Carregamento do Painel
Com o token em mãos, o navegador solicita ao servidor os dados atualizados da família. O servidor busca no banco de dados todas as tarefas, listas, receitas, membros e o saldo de pontos, retornando tudo em formato consolidado para a tela principal.

Etapa 3 - Interação e Colaboração
O usuário navega pelos módulos. Ele pode marcar uma tarefa como concluída, adicionar um item na lista de compras ou criar um evento no calendário. Cada uma dessas ações acontece imediatamente na tela, enquanto, em segundo plano, o sistema envia a atualização para o servidor.

Etapa 4 - Motor de Gamificação
Quando uma tarefa é concluída, o servidor aciona o motor de gamificação. O sistema calcula os pontos daquela atividade, adiciona ao saldo do membro que a executou, verifica se alguma conquista nova foi desbloqueada e atualiza o ranking da família.

Etapa 5 - Sincronização e Notificações
Todas as mudanças geram um registro no histórico. Se uma nova conquista for alcançada ou uma tarefa for delegada, o servidor cria uma notificação. O painel do usuário consulta periodicamente essas novidades e exibe os alertas na tela em tempo real.

==================================================
2. FUNCIONALIDADES PRINCIPAIS
Atividades (Tarefas)
O sistema permite criar tarefas diárias, definir quem deve executar cada uma delas, classificar o nível de prioridade e acompanhar o andamento até a conclusão.

Calendário Familiar
Um painel visual onde é possível registrar eventos importantes, compromissos da família e filtrar a visualização por datas específicas ou por participante.

Listas de Compras
Uma ferramenta colaborativa para criar listas de mercado em tempo real. Qualquer pessoa da família pode adicionar os itens que estão faltando, evitando esquecimentos.

Receitas
Um espaço dedicado para guardar o cardápio da família, registrando os ingredientes necessários e detalhando o passo a passo do modo de preparo.

Gestão de Membros
Uma área administrativa onde é possível visualizar e gerenciar quem faz parte do núcleo familiar dentro do aplicativo.

Gamificação e Prêmios
Para tornar a organização dinâmica, o sistema conta com pontuações automáticas, multiplicadores de sequência (streaks), ranking entre os membros, registro de conquistas alcançadas e um catálogo de prêmios que podem ser resgatados utilizando os pontos acumulados.

Estatísticas e Histórico
Os usuários têm acesso a gráficos de produtividade para visualizar o desempenho de cada membro, além de um registro detalhado de todas as alterações feitas no sistema (logs).

Notificações
O sistema envia alertas em tempo real sobre novas tarefas atribuídas, conquistas desbloqueadas e eventos próximos.

==================================================
3. TECNOLOGIAS UTILIZADAS
Interface (Frontend)
A interface de usuário foi construída utilizando a base da web com HTML5 e CSS3 puros, auxiliada pelo Tailwind CSS para a estilização e ícones da biblioteca Lucide. Toda a lógica de funcionamento da tela utiliza JavaScript nativo, garantindo leveza sem depender de frameworks.

Servidor (Backend)
A parte do servidor é processada por PHP na versão 8.1 ou superior, com consultas preparadas (PDO) para evitar injeções de código.

Segurança
A segurança envolve autenticação por tokens isolados, senhas protegidas com criptografia de alto nível (Bcrypt), bloqueio automático de tentativas repetidas de login, regras rígidas de comunicação web (CORS) e o isolamento de credenciais em arquivos de ambiente (.env).

==================================================
4. ESTRUTURA DO BANCO DE DADOS
O armazenamento de dados em MySQL 8.0+ é dividido de forma lógica para garantir velocidade e organização:

Contas de Usuário: Tabela responsável por armazenar dados de acesso, senhas criptografadas e identificação individual.

Estado da Família: Tabela central que guarda a estrutura geral do núcleo familiar.

Controle de Autenticação: Registra os tokens de sessão ativos e monitora as tentativas de login para aplicar bloqueios de segurança quando necessário.

Motor de Gamificação: Tabelas dedicadas para registrar o histórico de pontos ganhos e listar as conquistas já desbloqueadas por cada membro.

Histórico e Alertas: Área que armazena todas as notificações geradas pelo sistema e o log detalhado de ações (quem fez o quê e em qual horário).

==================================================
5. GUIA DE INSTALAÇÃO LOCAL
Requisitos:
Para executar o projeto no seu próprio computador, é necessário ter um ambiente configurado com PHP 8.1+, MySQL 8.0+ e o servidor Apache.

Passo 1 - Arquivos e Configuração
Baixe os arquivos do projeto para o seu computador. Dentro da pasta principal, crie o arquivo de ambiente (.env) para inserir as senhas de acesso do seu banco de dados e definir a chave de segurança de criptografia.

Passo 2 - Banco de Dados
Acesse o seu gerenciador MySQL, crie a base de dados do projeto e importe o arquivo de estrutura (schema.sql). É indispensável ativar a função de agendador de eventos do banco de dados para que as rotinas de limpeza funcionem.

Passo 3 - Servidor Apache
Configure a pasta do projeto como o diretório principal no Apache e certifique-se de que os módulos de reescrita de rotas (mod_rewrite) estão ativos. Acesse o endereço local no navegador e realize o cadastro da primeira conta.

==================================================
6. PREPARAÇÃO PARA AMBIENTE DE PRODUÇÃO
Caso o objetivo seja hospedar o sistema online para acesso externo, é crucial alterar as configurações indicando que o ambiente agora é de produção.

Nesse cenário, é obrigatório garantir que o certificado de segurança (SSL/HTTPS) esteja ativo, forçando conexões seguras. Também é estritamente necessário revisar as permissões dos arquivos de configuração no servidor para garantir que pessoas não autorizadas não consigam visualizar as senhas do seu banco de dados.

==================================================
7. COMUNICAÇÃO DA API E CONTRIBUIÇÃO
Comunicação:
A comunicação com o servidor ocorre por meio de rotas de API protegidas. Existe um grupo de ações exclusivas para criar contas e entrar no sistema. O restante das ações (salvar tarefas, registrar pontos, ler notificações) exige obrigatoriamente o envio de uma chave de autorização válida e ativa.

Contribuição e Licença:
Desenvolvedores interessados em melhorar o projeto podem copiar o código para seus próprios ambientes, implementar novas funcionalidades e enviar uma solicitação de inclusão para o projeto original. O código é aberto e distribuído sob a licença MIT.
