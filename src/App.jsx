import { useState } from 'react'
import Footer from './components/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
      <>
        <main className="container my-4">
          <h1>hola mundo</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit aliquid magnam sunt vero laudantium ea modi dignissimos. Ea, ad non?</p>
        </main>
        <Footer/>
      </>
  )
}

export default App
