let { app, getProducts, getProductsByproductId, addProduct } = require('../index.js');
let http = require('http');

jest.mock('../index.js', () => ({
  ...jest.requireActual('../index.js'),
  getProducts: jest.fn(),
  getProductsByproductId: jest.fn(),
  addProduct: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Function Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('getProducts should return a list of products', () => {
    const mockProducts = [
      { productId: 1, name: 'Laptop', category: 'Electronics' },
      { productId: 2, name: 'Coffee Maker', category: 'Appliances' },
    ];
    getProducts.mockReturnValue(mockProducts);
    let result = getProducts();
    expect(result).toEqual(mockProducts);
    expect(getProducts).toHaveBeenCalled();
  });
  test('getProductsByproductId should return product details', () => {
    const mockProducts = { productId: 1, name: 'Laptop', category: 'Electronics' };
    getProductsByproductId.mockReturnValue(mockProducts);
    let result = getProductsByproductId(1);
    expect(result).toEqual(mockProducts);
    expect(getProductsByproductId).toHaveBeenCalledWith(1);
  });
  test('getProductsByproductId should return undefine if products productId not found', () => {
    getProductsByproductId.mockReturnValue(undefined);

    let result = getProductsByproductId(999);
    expect(result).toBeUndefined();
    expect(getProductsByproductId).toHaveBeenCalledWith(999);
  });
  test('addProduct should add a new products', () => {
    const newProduct = {
      productId: 5,
      name: 'Tablet',
      category: 'Electronics',
    };
    addProduct.mockReturnValue(newProduct);
    let result = addProduct(newProduct);
    expect(result).toEqual(newProduct);
    expect(addProduct).toHaveBeenCalledWith(newProduct);
  });
});
