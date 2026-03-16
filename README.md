# 📱 Catálogo de Produtos - React Native App

Um aplicativo mobile de catálogo de produtos desenvolvido com React Native e Expo, oferecendo uma experiência de navegação intuitiva por categorias de produtos masculinos e femininos, com autenticação e um toque especial para torcedores do Corinthians.

## ✨ Funcionalidades

### 🔐 Autenticação

- Tela de login com design moderno e animações
- Validação de usuário e senha
- Logout seguro

### 🛍️ Catálogo de Produtos

- **8 categorias organizadas**:
  - **Masculino**: Camisas, Sapatos, Relógios
  - **Feminino**: Bolsas, Vestidos, Joias, Sapatos, Relógios
- Navegação por abas intuitivas
- Lista de produtos com imagens, preços e descontos
- Detalhes completos de cada produto

### ⚽ Destaque Especial

- **Camiseta Corinthians** aparece nas categorias de camisas (masculino e feminino)
- Imagens personalizadas para cada gênero
- Alerta interativo ao tocar no produto
- Descrição especial com toque leve e divertido

### 🎨 Design e UX

- Interface moderna com gradientes e animações
- Tema escuro com elementos translúcidos
- Animação do logo na tela de login
- Feedback visual em interações
- Suporte a dispositivos iOS e Android

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento e build
- **React Navigation** - Navegação entre telas
- **Axios** - Cliente HTTP para API
- **Expo Linear Gradient** - Gradientes visuais
- **Ionicons** - Ícones vetoriais
- **DummyJSON API** - Fonte de dados dos produtos

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Dispositivo físico ou emulador/simulador

### Passos para instalação

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd catalogo-app
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**

   ```bash
   npx expo start
   ```

4. **Execute no dispositivo**
   - **iOS**: Pressione `i` no terminal ou escaneie o QR code com a câmera do iOS
   - **Android**: Pressione `a` no terminal ou use o app Expo Go
   - **Web**: Pressione `w` para executar no navegador

## 📁 Estrutura do Projeto

```
catalogo-app/
├── app.json                    # Configurações do Expo
├── package.json               # Dependências e scripts
├── tsconfig.json              # Configuração TypeScript
├── assets/
│   ├── images/                # Imagens do app
│   │   ├── react-logo.png     # Logo animado
│   │   ├── corinthians-shirt.jpg    # Camisa Corinthians masculina
│   │   ├── corinthians.jpg    # Camisa Corinthians feminina
│   │   └── ...                # Outros assets
├── src/
│   ├── contexts/
│   │   └── AuthContext.js     # Contexto de autenticação
│   ├── navigation/
│   │   └── RootNavigator.js   # Navegação principal
│   ├── screens/
│   │   ├── LoginScreen.js     # Tela de login
│   │   ├── ProductsScreen.js  # Lista de produtos
│   │   └── ProductDetailScreen.js # Detalhes do produto
│   └── services/
│       └── api.js             # Configuração da API
├── components/                # Componentes reutilizáveis
├── constants/                 # Constantes do app
├── hooks/                     # Hooks customizados
└── scripts/                   # Scripts utilitários
```

## 🚀 Como Usar

1. **Login**: Digite qualquer usuário e senha para acessar
2. **Navegação**: Use as abas na parte inferior para alternar entre categorias
3. **Produtos**: Toque em qualquer produto para ver detalhes
4. **Corinthians**: Nas abas "Men Shirt" e "Women Dresses", toque na camiseta especial
5. **Logout**: Use o ícone no canto superior direito de qualquer tela

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run lint` - Executa o linter para verificar código
- `npx expo build` - Gera build de produção

## 📊 API Utilizada

O app consome dados da [DummyJSON API](https://dummyjson.com/), especificamente:

- `/products/category/{categoria}` - Lista produtos por categoria

## 🎨 Personalização

### Adicionando novas categorias

1. Edite `src/navigation/RootNavigator.js`
2. Adicione novo objeto no array `tabScreens`
3. Certifique-se que a categoria existe na API

### Modificando imagens

- Coloque novas imagens em `assets/images/`
- Use `require("../../assets/images/nome-imagem.jpg")` no código

### Alterando cores/temas

- Modifique os estilos em cada componente
- Para temas globais, considere usar Context API

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autor

Desenvolvido com ❤️ para demonstrar habilidades em React Native e desenvolvimento mobile.

---

**Nota**: Este é um projeto de demonstração. Para produção, considere implementar autenticação real, cache de imagens, testes automatizados e tratamento de erros mais robusto.
