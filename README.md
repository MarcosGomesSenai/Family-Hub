FamilyHub
Plataforma para organizacao familiar com gamificacao. Gerencie tarefas, listas de compras, receitas, membros e acompanhe o desempenho de cada um com pontos e conquistas.

O que tem no projeto

Atividades com prioridade, status e responsavel
Calendario com filtros por membro e categoria
Listas de compras colaborativas
Receitas com ingredientes e modo de preparo
Ranking, pontos, streaks e conquistas por membro
Premios resgateis com pontos acumulados
Estatisticas e graficos de produtividade
Notificacoes em tempo real
Historico de alteracoes


Tecnologias
Frontend em HTML5, CSS3 e JavaScript puro, com Tailwind CSS e Lucide Icons via CDN.
Backend em PHP 8.1+ com PDO e MySQL 8.0+.
Seguranca: autenticacao por token Bearer, senhas com bcrypt, rate limiting por IP, headers de seguranca via .htaccess e CORS restrito ao dominio configurado.

Rodando localmente
Voce vai precisar de PHP 8.1+, MySQL 8.0+ e Apache com mod_rewrite e mod_headers ativos (XAMPP funciona bem).
Clone o repositorio:
bashgit clone https://github.com/seu-usuario/familyhub.git
cd familyhub
Copie o arquivo de configuracao e preencha com seus dados:
bashcp .env.example .env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=familyhub
DB_USER=root
DB_PASS=sua_senha
JWT_SECRET=chave_gerada_abaixo
APP_URL=http://localhost
APP_ENV=development
RATE_LIMIT_ATTEMPTS=5
RATE_LIMIT_WINDOW=15
RATE_LIMIT_LOCKOUT=30
TRUSTED_PROXY=false
Para gerar o JWT_SECRET:
bashphp -r "echo bin2hex(random_bytes(32));"
Importe o banco:
bashmysql -u root -p -e "CREATE DATABASE IF NOT EXISTS familyhub CHARACTER SET utf8mb4;"
mysql -u root -p familyhub < schema.sql
Ative o agendador de eventos do MySQL (limpa tokens e logs antigos automaticamente):
bashmysql -u root -p -e "SET GLOBAL event_scheduler = ON;"
Acesse em http://localhost/familyhub/ e crie sua conta pela tela de login.

Conta demo
O schema inclui um usuario de teste para uso local:

E-mail: admin@familyhub.com
Senha: 123456

Remova antes de subir para producao:
sqlDELETE FROM users WHERE email = 'admin@familyhub.com';

Subindo para producao
Algumas coisas importantes antes de publicar em servidor real:

Defina APP_ENV=production no .env
Use uma senha forte no banco e um JWT_SECRET unico
Configure HTTPS e descomente o header HSTS no .htaccess
Remova o usuario demo do banco
Defina TRUSTED_PROXY=true somente se usar Cloudflare ou proxy reverso


Estrutura de pastas
familyhub/
├── index.html          # tela de login
├── dashboard.html      # aplicacao principal
├── schema.sql          # estrutura do banco
├── .env.example        # template de configuracao
├── .htaccess           # apache + headers de seguranca
├── css/
├── js/
│   ├── app.js          # orquestrador principal
│   ├── auth.js         # sessao e cliente de API
│   ├── db.js           # estado local (localStorage)
│   ├── gamification.js # pontos, conquistas e streaks
│   └── views/          # uma tela por arquivo
└── php/
    ├── db.php          # conexao PDO e helpers
    ├── auth.php        # login, registro e logout
    └── api.php         # rotas da API REST
