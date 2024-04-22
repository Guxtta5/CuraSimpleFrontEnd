// import React from 'react';
import './App.css';
import Home from './pages/Home';
import NavBar from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/cadastro';
import { AuthProvider } from './contexts/AuthContext';
import ListaCategorias from './components/categorias/listaCategorias/ListaCategorias';
import FormularioCategoria from './components/categorias/formularioCategoria/FormularioCategoria';
import DeletarCategoria from './components/categorias/deletarCategoria/DeletarCategoria';
import ListaProdutos from './components/produtos/cardProdutos/listaProdutos/ListaProdutos';
import FormularioProdutos from './components/produtos/cardProdutos/formularioProdutos/FormularioProdutos';
import DeletarProduto from './components/produtos/cardProdutos/deletarProduto/DeletarProduto';
function App() {
  return (
    <>
      <AuthProvider>

        <BrowserRouter>
          <NavBar />
          <div className='min-h-[80vh]'>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
              <Route path="/categorias" element={<ListaCategorias />} />
              <Route path="/cadastroCategorias" element={<FormularioCategoria />} />
              <Route path="/editarCategorias/:id" element={<FormularioCategoria />} />
              <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
              <Route path="/produtos" element={<ListaProdutos />} />
              <Route path="/cadastroProduto" element={<FormularioProdutos />} />
              <Route path="/editarProduto/:id" element={<FormularioProdutos />} />
              <Route path="/deletarProduto/:id" element={<DeletarProduto />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;