import Navbar from './components/layout/Navbar';
import Content from './components/layout/Content';
import Footer from './components/layout/Footer';
function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Content />
      <Footer />
    </div>
  )
}

export default App
