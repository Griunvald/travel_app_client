import { ProvidersWrapper } from './contexts/ProvidersWrapper.jsx';
import Navbar from './components/layout/Navbar';
import Content from './components/layout/Content';
import Footer from './components/layout/Footer';
function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <ProvidersWrapper>
          <Navbar />
          <Content />
          <Footer />
      </ProvidersWrapper>
    </div>
  )
}

export default App
