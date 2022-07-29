import './App.css';
import ToDo from './components/ToDo/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter, 
  Route,
  Routes
} from 'react-router-dom';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import NotFound from './components/pages/NotFound/NotFound';
import Menu from './components/layouts/Menu/Menu';
import SingleTask from './components/SingleTask/SingleTask';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route 
            path='/'
            element={<ToDo />} 
          />
          <Route 
            path='/home'
            element={<ToDo />} 
          />
          <Route 
            path='/todo'
            element={<ToDo />} 
          />
          <Route 
            path='/about'
            element={<About />} 
          />
          <Route 
            path='/contact'
            element={<Contact />} 
          />
          <Route 
            path='/task'
            element={<SingleTask />} 
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
