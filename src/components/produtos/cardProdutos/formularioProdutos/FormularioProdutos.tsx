import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Produto from '../../../../models/Produto';
import Categoria from '../../../../models/Categoria';
import { buscar, atualizar, cadastrar } from '../../../../services/Services';



function FormularioProdutos() {
    let navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
  
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
  
    const [Categorias, setCategorias] = useState<Categoria[]>([]);
  
    const [Categoria, setCategoria] = useState<Categoria>({
      id: 0,
      descricao: '',
    });
  
    const [produto, setProduto] = useState<Produto>({
      id: 0,
      titulo: '',
      texto: '',
      data: '',
      Categoria: null,
      usuario: null,
    });
  
    async function buscarProdutoPorId(id: string) {
      await buscar(`/produtos/${id}`, setProduto, {
        headers: {
          Authorization: token,
        },
      });
    }
  
    async function buscarCategoriaPorId(id: string) {
      await buscar(`/Categoria/${id}`, setCategoria, {
        headers: {
          Authorization: token,
        },
      });
    }
  
    async function buscarCategoria() {
      await buscar('/categoria', setCategoria, {
        headers: {
          Authorization: token,
        },
      });
    }
  
    useEffect(() => {
      if (token === '') {
        alert('Você precisa estar logado');
        navigate('/');
      }
    }, [token]);
  
    useEffect(() => {
      buscarCategoria();
      if (id !== undefined) {
        buscarProdutoPorId(id);
        console.log(Categoria);
  
      }
    }, [id]);
  
    useEffect(() => {
      setProduto({
        ...produto,
        Categoria: Categoria,
      });
    }, [Categoria]);
  
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
      setProduto({
        ...produto,
        [e.target.name]: e.target.value,
        Categoria: Categoria,
        usuario: usuario,
      });
    }
  
    function retornar() {
      navigate('/produtos');
    }
  
    async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault();
  
      console.log({ produto });
  
      if (id != undefined) {
        try {
          await atualizar(`/produtos`, produto, setProduto, {
            headers: {
              Authorization: token,
            },
          });
          alert('Produto atualizado com sucesso');
          retornar();
        } catch (error: any) {
          if (error.toString().includes('403')) {
            alert('O token expirou, favor logar novamente')
            handleLogout()
          } else {
            alert('Erro ao atualizar a Produto');
          }
        }
      } else {
        try {
          await cadastrar(`/produtos`, produto, setProduto, {
            headers: {
              Authorization: token,
            },
          });
  
          alert('Produto cadastrado com sucesso');
          retornar();
        } catch (error: any) {
          if (error.toString().includes('403')) {
            alert('O token expirou, favor logar novamente')
            handleLogout()
          } else {
            alert('Erro ao cadastrar o produto');
          }
        }
      }
    }
  
    const carregandoCategoria = Categoria.descricao === '';
  
    return (
      <div className="container flex flex-col mx-auto items-center">
        <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}</h1>
  
        <form onSubmit={gerarNovoProduto} className="flex flex-col w-1/2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="titulo">Titulo da produto</label>
            <input
              value={produto.titulo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              type="text"
              placeholder="Titulo"
              name="titulo"
              required
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="titulo">Texto do Produto</label>
            <input
              value={produto.texto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              type="text"
              placeholder="Texto"
              name="texto"
              required
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Categoria do Produto</p>
            <select name="categoria" id="categoria" className='border p-2 border-slate-800 rounded' onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}>
              <option value="" selected disabled>Selecione uma categoria</option>
              {Categorias.map((Categoria) => (
                <>
                  <option value={Categoria.id} >{Categoria.descricao}</option>
                </>
              ))}
            </select>
          </div>
          <button disabled={carregandoCategoria} type='submit' className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto block py-2'>
            {carregandoCategoria ? <span>Carregando</span> : id !== undefined ? 'Editar' : 'Cadastrar'}
          </button>
        </form>
      </div>
    );
  }

export default FormularioProdutos;