let produtos = [
    { nome: 'Camisa', preco: 50, quantidade: 15 },
    { nome: 'Calça', preco: 100, quantidade: 25 },
    { nome: 'Tênis', preco: 200, quantidade: 80 },
    { nome: 'Boné', preco: 25, quantidade: 150 },
    { nome: 'Jaqueta', preco: 300, quantidade: 30 }
];

let carrinho = [];

function exibirProdutos() {
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';

    produtos.forEach(produto => {
        listaProdutos.innerHTML += `<li>${produto.nome} - R$${produto.preco} (Estoque: ${produto.quantidade})</li>`;
    });
}

function buscarProduto(nomeProduto) {
    return produtos.find(produto => produto.nome.toLowerCase() === nomeProduto.toLowerCase());
}

function adicionarAoCarrinho() {
    const nomeProduto = document.getElementById('nome-produto').value;
    let produto = buscarProduto(nomeProduto);

    if (produto && produto.quantidade > 0) {
        carrinho.push({ nome: produto.nome, preco: produto.preco });
        produto.quantidade--;
    }
    exibirCarrinho();
    exibirProdutos();
}

function removerDoCarrinho() {
    const nomeProduto = document.getElementById('nome-produto').value;
    let index = carrinho.findIndex(item => item.nome.toLowerCase() === nomeProduto.toLowerCase());

    if (index !== -1) {
        let produtoRemovido = carrinho.splice(index, 1)[0];
        let produtoOriginal = buscarProduto(produtoRemovido.nome);
        produtoOriginal.quantidade++;
    }
    exibirCarrinho();
    exibirProdutos();
}

function exibirTotal() {
    let total = carrinho.reduce((acc, produto) => acc + produto.preco, 0);
    document.getElementById('total-carrinho').textContent = `Total: R$${total.toFixed(2)}`;
}

function ordenarCarrinho() {
    carrinho.sort((a, b) => a.preco - b.preco);
    exibirCarrinho();
}

function exibirCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    listaCarrinho.innerHTML = '';

    carrinho.forEach(produto => {
        listaCarrinho.innerHTML += `<li>${produto.nome} - R$${produto.preco}</li>`;
    });
    exibirTotal();
}

function limparCarrinho() {
    location.reload();
}

document.addEventListener('DOMContentLoaded', exibirProdutos);