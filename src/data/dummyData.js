// src/data/productList.js
import boot1 from '../assets/bp.jpg';
import sneaker1 from '../assets/boots2p.jpg';
import sneaker2 from '../assets/sneakers2.jpg';

const productList = [
  {
    id: 1,
    name: 'Men’s Brown Boots',
    image: [sneaker2, sneaker1],
    detailedDesc: 'High quality boots for rugged terrain.',
    shortDesc: 'Durable boots for outdoor wear.',
    category: 'Boots',
    categorypage: 'Boots',
    price: 779.99,
    stocks: 9,
    gender: 'Men',
    color: 'Brown',
    offer: '',
    sizes: ['40', '41'],
  },
  {
    id: 2,
    name: 'Men’s Brown shoes',
    image: [boot1, sneaker2, sneaker1],
    detailedDesc: 'High quality boots for rugged terrain.',
    shortDesc: 'Durable boots for outdoor wear.',
    category: 'Boots',
    categorypage: 'Boots',
    price: 179.99,
    stocks: 9,
    gender: 'Men',
    color: 'Brown',
    offer: '',
    sizes: ['40', '41'],
  },
];

export default productList;
