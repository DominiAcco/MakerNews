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
- **Cloudinary**

### **Backend**
- **Node.js**
- **Next.js API Routes**
- **MongoDB + Mongoose**
- - **Token JWT**

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

##  Como hospedar imagens na Cloudinary

Para adicionar imagens nas publicações é necessário configurar um ambiente na plataforma `Cloudinary`

1. **Acesse o site crie uma conta e faça `login`:**
```bash
https://cloudinary.com
```
<img width="1906" height="897" alt="image" src="https://github.com/user-attachments/assets/1e477e6d-de05-4025-b591-11099bfd45dd" />

---

2. **Vá até `settings`**
<img width="1895" height="858" alt="image" src="https://github.com/user-attachments/assets/bda84f80-fdc1-4a78-9eb4-1ea6b76510ae" />

---

4. **Vá até `upload` e depois clique em `Add Upload preset`**
<img width="1915" height="784" alt="image" src="https://github.com/user-attachments/assets/6a23049b-b193-4e83-88b2-0d65954eebd5" />

---

6. **Defina um `nome` em `Upload preset name` e coloque `Unsigned` em `Signed mode` depois clique no botão `Save`**
<img width="1919" height="906" alt="image" src="https://github.com/user-attachments/assets/cb8c61dd-fee4-47c2-b1a0-f4851864157e" />

---

8. **Depois vá até `API Keys`**
  *  Copie o código do `Cloud name`
  *  Copie o código de `API Key`
  *  Copie o código do `API Secret` (Clique no olho destacado em azul e será enviado um e-mail de confirmação para seu e-mail cadastrado para ter aceso a chave secreta)
<img width="1896" height="916" alt="image" src="https://github.com/user-attachments/assets/0adfbf06-9baf-4b32-b9a5-c08e474346cf" />

---
    
6. **Agora no código dentro do `.env.local` adicione:**
```
 NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=Cloud-name
 NEXT_PUBLIC_CLOUDINARY_API_KEY=API-Key
 CLOUDINARY_SECRET_KEY=API-Secret
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


