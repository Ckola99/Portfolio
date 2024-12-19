import Home from "./pages/Home"
import Layout from "./components/Layout"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "./pages/About";
import Projects from './pages/Projects'


function App() {
 return (
  <Router>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />}/>
        </Route>
      </Routes>
    </Router>
 )
}

export default App
