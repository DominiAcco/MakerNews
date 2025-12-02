#  Maker News – Plataforma Web de Notícias Maker

O **Maker News** é um projeto web desenvolvido pela primeira turma de **Sistemas de Informação da UEMS – Unidade de Nova Andradina**.  
  
Ele funciona como um portal de notícias focado no universo **maker**, trazendo conteúdos sobre tecnologia, inovação, criatividade, eletrônica e projetos práticos.
  
O sistema permite criação, edição, arquivamento e gerenciamento de publicações, oferecendo uma interface moderna, responsiva e totalmente integrada a um backend conectado ao MongoDB.
Além disso, usuários podem visualizar todas as publicações já criadas, acessando notícias, projetos e conteúdos do universo maker de forma organizada e intuitiva.
 
Em breve, o Maker News também contará com integração para direcionar os usuários a um novo site complementar, onde será possível adquirir itens 3D produzidos em impressoras 3D — um recurso que está em desenvolvimento e ainda não está disponível.


---

##  Tecnologias Utilizadas

### **Frontend**
- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **ShadCN/UI**
- **Lucide Icons**
- **Token JWT**
- **Cloudinary**

### **Backend**
- **Node.js**
- **Next.js API Routes**
- **MongoDB + Mongoose**

### **Outros**
- Deploy: **Vercel**
- Gerenciador de pacotes: **npm**
- Versionamento: **Git + GitHub**

---

##  Pré-requisitos

Para rodar o projeto localmente, você precisa ter instalado:

- **Node.js 18+** (recomendado para total compatibilidade com Next 14+)
- **npm** (ou **yarn**/**pnpm** se preferir)
- **Git**
- Ter um **MongoDB** disponível (local ou via MongoDB Atlas)

>  **OBS:** O projeto utiliza variáveis de ambiente (`.env.local`) para conectar ao banco de dados. Ajuste o arquivo conforme seu ambiente.

---

##  Como rodar o projeto localmente

1. **Clone o repositório:**
```bash
git clone https://github.com/DominiAcco/MakerNews.git
```

2. **Entre na pasta do projeto:**
```bash
cd MakerNews
```

3. **Instale as dependências:**
```bash
npm install
```

4. **Crie o arquivo `.env.local` com suas credenciais MongoDB:**
```env
MONGODB_URI=sua-string-de-conexao
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=seu-nome-do-cloudinary
NEXT_PUBLIC_CLOUDINARY_API_KEY=sua-chave-de-api
CLOUDINARY_SECRET_KEY=sua-chave-secreta-de-api
JWT_SECRET=senha-secreta-gerada-por-openssl (usar comando openssl rand -base64 64 no terminal)
NEXT_PUBLIC_APP_URL=http://localhost:3000 (Na vercel utilizar link do seu dominio)
```

5. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

6. O projeto estará disponível em:

```
http://localhost:3000
```

---

##  Versão hospedada (Vercel)

Você também pode acessar o projeto diretamente online:

 **https://maker-news.vercel.app/**

---

##  Documentação e Wiki

Para detalhes aprofundados sobre:

- Relatórios completos das *sprints*  
- Documento **Contribute.md** com orientações de contribuição

Acesse diretamente pela aba **Wiki** do GitHub do projeto.

##  Contribuições

Toda orientação necessária para contribuir está disponível na Wiki do projeto.

---


