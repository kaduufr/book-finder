import React, {useState} from 'react';
import './App.css';
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'

import Teste from './assets/loading.svg'

function App() {

  const [livros, setLivros] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleBook() {
    if (title === '') {
      alert('No results')
      return
    }

    setLoading(true)
    const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title.split(' ').join('+')}`)
    setLivros(res.data.items)
    setLoading(false)
  }

  function formatDescription(description) {
    return `${description.substring(0, 1).toUpperCase()}${description.substring(1, 100).toLowerCase()} ...`
  }

  function listLivros() {
    return livros && livros.map(livro => (
      <a className="item" key={livro.id} href={livro.volumeInfo.infoLink} target="blank" >
          <div className="item-title">
            <h3>{livro.volumeInfo.title}</h3>
          </div>
          <div className="item-image">
            <img src={livro.volumeInfo.imageLinks.thumbnail} alt=""/>
          </div>
          <p className="item-author">
            <b>Author: </b> {livro.volumeInfo.authors.join(', ')}
          </p>
          <p className="item-published">
            <b>Published: </b>{livro.volumeInfo.publishedDate}
          </p>
          <p className="item-description">
            {livro.volumeInfo.description && formatDescription(livro.volumeInfo.description) }
          </p>
        </a>
    ))
  }


  return (
    <div className="app">
      <div className="header">
        <div className="title">
          Book Finder
        </div>
        <div className="box-inputs"  >
          <input type="text" placeholder="Digite o nome do livro/author" value={title} onChange={e => setTitle(e.target.value)} />
          <button onClick={handleBook} > <FaSearch></FaSearch> </button>
        </div>
      </div>
      <div className="content">
        { loading  && <img src={Teste} alt=""/> }
        {listLivros()}
      </div>
    </div>
  );
}

export default App;
