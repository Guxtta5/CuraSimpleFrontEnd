import React from 'react'

function NavBar() {
    return (
        <div className='w-full bg-indigo-900 text-white flex justify-center py-4'>
            <div className='container flex justify-between text-lg'>
                <div className='text-2x1 font-bold uppercase'>Cura Simples</div>
                <div className='flex gap-4'>
                    <div className='hover:underline'>Produtos</div>
                    <div className='hover:underline'>Carrinho</div>
                    <div className='hover:underline'>Entrar/Cadastrar</div>
                    <div className='hover:underline'>Sair</div>
                </div>
            </div>
        </div>
    )
}

export default NavBar