import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import CreateUser from './components/user-components/CreateUser'
import MyPuzzles from './components/profile-components/MyPuzzles'
import StartPage from './components/StartPage'
import { TokenContextProvider } from './components/contexts/TokenContext'
import PuzzleContextProvider from './components/contexts/PuzzleContext'

function App() {
  /**
   * Checks if the user is logged in.
   *
   * @returns {boolean} True if the user is logged in, false otherwise.
   */
  const isLoggedIn = () => {
    const token = localStorage.getItem('token')
    return !!token;
  }

  return <Router basename={'/bit-for-bit'}>
    <TokenContextProvider>
      <PuzzleContextProvider>
        <div className='App'>
          <Routes>
            <Route exact path='/' element={<StartPage />} />
            <Route path='/create-user' element={<CreateUser />} />
            <Route path='/*' element={isLoggedIn() ?
              <>
                <div className="container">
                  {/* <div className='navigation-container'>
                    <Navigation className='navigation' />
                  </div> */}
                  <div className='content'>
                    <Routes>
                      <Route path='/my-puzzles' element={<MyPuzzles />} />
                    </Routes>
                  </div>
                </div>
              </>
            : <Navigate to='/' />} />
          </Routes>
        </div>
      </PuzzleContextProvider>
    </TokenContextProvider>
  </Router>
}

export default App
