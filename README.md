# Movie/TV Hub - Entertainment Discovery Platform

A comprehensive React + TypeScript web application for discovering movies and TV shows, managing personal watchlists, and exploring trending content.

![Movie/TV Hub](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)
![Styled Components](https://img.shields.io/badge/Styled--Components-6.1.6-pink)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Features

### Core Features
- **🔍 Smart Search**: Advanced search functionality with real-time results and filtering
- **📝 Personal Watchlist**: Create and manage your personal watchlist with local storage
- **🔥 Trending Content**: Discover what's trending in movies and TV shows
- **🎬 Detailed Views**: Comprehensive movie and TV show detail pages
- **⭐ Multiple Ratings**: Integration with TMDB, IMDB, and Rotten Tomatoes ratings
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Technical Features
- **🎨 Modern UI**: Clean, accessible design with dark/light theme support
- **⚡ Performance**: API response caching and rate limiting
- **🔒 Error Handling**: Comprehensive error handling and loading states
- **🎯 TypeScript**: Full type safety throughout the application
- **🧪 Testing Ready**: Structured for easy testing implementation

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Styled Components
- **State Management**: React Context + useReducer
- **Routing**: React Router DOM
- **Data Fetching**: Axios with React Query
- **Styling**: Styled Components with custom theme system
- **APIs**: TMDB API, OMDB API
- **Development**: ESLint, Prettier, Husky (planned)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- Git

You'll also need API keys from:
- [TMDB (The Movie Database)](https://www.themoviedb.org/settings/api)
- [OMDB (Open Movie Database)](https://www.omdbapi.com/apikey.aspx)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/movie-tv-hub.git
cd movie-tv-hub
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# API Keys
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
REACT_APP_OMDB_API_KEY=your_omdb_api_key_here

# API Base URLs (default values)
REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
REACT_APP_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
REACT_APP_OMDB_BASE_URL=https://www.omdbapi.com

# Application Settings
REACT_APP_DEFAULT_LANGUAGE=en-US
REACT_APP_DEFAULT_REGION=US
REACT_APP_ITEMS_PER_PAGE=20

# Development Settings
REACT_APP_DEBUG_MODE=true
REACT_APP_MOCK_API_RESPONSES=false
```

### 4. Start the Development Server

```bash
npm start
# or
yarn start
```

The application will open at `http://localhost:3000`.

## 📁 Project Structure

```
movie-tv-hub/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Search.tsx
│   │   ├── MovieDetail.tsx
│   │   ├── TVDetail.tsx
│   │   ├── Watchlist.tsx
│   │   ├── Trending.tsx
│   │   └── NotFound.tsx
│   ├── services/
│   │   ├── tmdb.ts
│   │   └── omdb.ts
│   ├── context/
│   │   └── WatchlistContext.tsx
│   ├── hooks/
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   ├── styles/
│   │   ├── theme.ts
│   │   └── GlobalStyles.ts
│   ├── config/
│   │   └── env.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── .env.example
├── .env.local
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Available Scripts

### Development
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests (when implemented)
npm run eject      # Eject from Create React App
```

### Code Quality
```bash
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
npm run format     # Format code with Prettier
npm run type-check # TypeScript type checking
```

## 🔧 API Integration

### TMDB API
The Movie Database (TMDB) provides comprehensive movie and TV show data:
- Search functionality
- Trending content
- Detailed movie/TV information
- Cast and crew data
- Images and videos

### OMDB API
Open Movie Database (OMDB) provides additional ratings and details:
- IMDB ratings
- Rotten Tomatoes scores
- Metacritic ratings
- Detailed plot information

## 📱 Features in Detail

### Search & Discovery
- Real-time search with debouncing
- Multi-type search (movies, TV shows, people)
- Advanced filtering options
- Pagination support

### Watchlist Management
- Add/remove items from watchlist
- Mark items as watched
- Personal ratings and notes
- Local storage persistence
- Statistics and filtering

### Content Display
- Responsive grid layouts
- Image optimization
- Rating display from multiple sources
- Genre and metadata display

### User Experience
- Loading states and skeletons
- Error handling with user-friendly messages
- Responsive design for all devices
- Accessibility features

## 🎨 Theming & Styling

The application uses a custom theme system with:
- Consistent color palette
- Typography scale
- Spacing system
- Responsive breakpoints
- Dark/light theme support (planned)

## 🔒 Error Handling

Comprehensive error handling includes:
- API error responses
- Network failures
- Rate limiting
- Invalid routes (404 pages)
- User-friendly error messages

## 📊 Performance Optimizations

- API response caching
- Image lazy loading (planned)
- Component code splitting (planned)
- Bundle optimization
- Rate limiting compliance

## 🧪 Testing (Planned)

Testing strategy will include:
- Unit tests for components
- Integration tests for API services
- End-to-end tests for user flows
- Accessibility testing

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Vercel**: Automatic deployments from Git
- **Netlify**: Easy static site hosting
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3 + CloudFront**: Scalable cloud hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow
1. Pick an issue or create a new feature
2. Create a feature branch
3. Implement the feature with tests
4. Ensure code quality (lint, format, type-check)
5. Submit a pull request with clear description

## 📝 API Documentation

### TMDB API Endpoints Used
- `/search/multi` - Multi-search
- `/movie/{id}` - Movie details
- `/tv/{id}` - TV show details
- `/trending/{media_type}/{time_window}` - Trending content
- `/discover/movie` - Discover movies
- `/discover/tv` - Discover TV shows

### OMDB API Endpoints Used
- `/?t={title}` - Search by title
- `/?i={imdb_id}` - Search by IMDB ID

## 🔐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `REACT_APP_TMDB_API_KEY` | TMDB API key | Yes | - |
| `REACT_APP_OMDB_API_KEY` | OMDB API key | Yes | - |
| `REACT_APP_DEBUG_MODE` | Enable debug logging | No | `false` |
| `REACT_APP_ITEMS_PER_PAGE` | Items per page | No | `20` |

## 🐛 Known Issues

- [ ] Initial load may be slow due to API rate limits
- [ ] Some older movies may not have complete data
- [ ] Image loading can be slow on slower connections

## 🗺️ Roadmap

### Phase 1: Core Features ✅
- [x] Project setup and infrastructure
- [x] Basic routing and navigation
- [x] API service integration
- [x] Styled components and theming

### Phase 2: Search & Discovery (In Progress)
- [ ] Search functionality implementation
- [ ] Trending content display
- [ ] Advanced filtering options
- [ ] Pagination implementation

### Phase 3: Watchlist Management
- [ ] Watchlist CRUD operations
- [ ] Local storage integration
- [ ] Watchlist statistics and analytics
- [ ] Export/import functionality

### Phase 4: Enhanced Features
- [ ] User authentication
- [ ] Social features
- [ ] Recommendations engine
- [ ] Dark theme implementation

### Phase 5: Performance & Polish
- [ ] Performance optimizations
- [ ] PWA features
- [ ] Offline functionality
- [ ] Advanced testing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing comprehensive movie and TV data
- [OMDB](https://www.omdbapi.com/) for additional rating information
- [React](https://reactjs.org/) team for the excellent framework
- [Styled Components](https://styled-components.com/) for the styling solution

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](https://github.com/yourusername/movie-tv-hub/issues) page
2. Create a new issue with detailed description
3. Contact the maintainers

---

**Movie/TV Hub** - Discover your next favorite entertainment! 🎬✨