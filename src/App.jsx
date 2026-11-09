import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Projects from './Pages/Projects';
import ProjectDetails from './Pages/ProjectDetails';
import About from './Pages/About';
import Contact from './Pages/Contact';

function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-[#102B46]">
          404
        </h1>

        <p className="text-slate-500 mt-3">
          Sorry, this page could not be found.
        </p>

        <a href="/" className="primary-button mt-7">
          Return Home
        </a>
      </div>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
