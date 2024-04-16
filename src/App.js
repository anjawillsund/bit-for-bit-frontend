import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { TokenContextProvider } from './components/contexts/TokenContext'
import CreateUser from './components/user-components/CreateUser'
import StartPage from './components/StartPage'
import PuzzleContextProvider from './components/contexts/PuzzleContext'

function App() {
  return <Router basename={'/bit-for-bit'}>
    <TokenContextProvider>
      <PuzzleContextProvider>
        <div className='App'>
          <Routes>
            <Route exact path='/' element={<StartPage />} />
            <Route path='/create-user' element={<CreateUser />} />
          </Routes>
        </div>
      </PuzzleContextProvider>
    </TokenContextProvider>
  </Router>
}

export default App
