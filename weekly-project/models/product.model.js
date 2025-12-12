const products = [
    { id: 1, name: 'Gaming Laptop', price: 1200, stock: 5 },
    { id: 2, name: 'Wireless Mouse', price: 50, stock: 15 },
    { id: 3, name: 'Mechanical Keyboard', price: 150, stock: 4 }
];

module.exports = {
    getAll: () => products,
    findById: (id) => products.find(p => p.id === id)
};