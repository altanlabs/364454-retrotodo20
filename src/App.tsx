import { DatabaseProvider } from '@altanlabs/database';
import { AuthProvider } from '@altanlabs/auth';
import { ThemeProvider } from './theme/theme-provider';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout';
import IndexPage from './pages/index';
import NotFound from './pages/NotFound';

const config = {
  API_BASE_URL: 'https://api.altan.ai/galaxia/hook/XGt2Nl',
  SAMPLE_TABLES: {
    users: 'ec49d2b2-2c3f-48fc-851a-8329edc4708d',
    todos: '3f7d7d04-6919-419f-a433-84f5041878e2'
  }
};

function App() {
  return (
    <DatabaseProvider config={config}>
      <AuthProvider>
        <ThemeProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </DatabaseProvider>
  );
}

export default App;