import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import { ProvidersWrapper } from './contexts/ProvidersWrapper.jsx';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Content from './components/layout/Content';
import Footer from './components/layout/Footer';
import TripsList from './components/pages/TripsList';
import About from './components/pages/About';

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Content />}>
         <Route index element={< TripsList />} />
         <Route path="/about" element={< About />} />
      </Route>
    )
)

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ProvidersWrapper>
          <Navbar />
          <RouterProvider router={router} />
          <Sidebar />
          <Footer />
      </ProvidersWrapper>
    </div>
  )
}

export default App
