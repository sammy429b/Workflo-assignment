import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/useAuth.tsx'
import { JobBoardProvider } from './context/useTaskBoard.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
      <AuthProvider>
        <JobBoardProvider>
        <App />
        </JobBoardProvider>
      </AuthProvider>
  </>,
)
