// import React from 'react'
import homeLogo from '../assets/home.jpeg';
import './Home.css';
import ListaProdutos from '../components/produtos/cardProdutos/listaProdutos/ListaProdutos';
import ModalProduto from '../components/produtos/cardProdutos/modalProduto/ModalProduto';

function Home() {
    return (
        <>
            <div className='bg-indigo-900 flex justify-center'>
                <div className='container grid grid-cols-2 text-white'>
                    <div className='flex flex-col gap-4 items-center  justify-center py-4'>
                        <h2 className='text-5x1 font-bold'>Sejam Bem Vindos!!</h2>
                        <p className='text-x1'>Procure pelo medicamento que deseja</p>
                        <p className='text-x1'>Com um valor que cabe no seu bolso</p>
                        <div className='flex justify-around gap-4'>
                            <ModalProduto />
                            <button className='rounded bg-white text-blue-800 py-2 px-4'>Ver Produtos</button>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <img src={homeLogo} alt="" className='w-2/3' />
                    </div>
                </div>
            </div>
            <ListaProdutos />
        </>
    );
}

export default Home;