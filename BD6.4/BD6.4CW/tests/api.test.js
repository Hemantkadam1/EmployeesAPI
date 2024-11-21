const request = require('supertest');
const { app } = require('../index.js');
const {
  getBooks,
  getBookById,
  getReviews,
  getReviewById,
} = require('../book.js');
const http = require('http');

jest.mock('../book.js', () => ({
  ...jest.requireActual('../book.js'),
  getBooks: jest.fn(),
  getBookById: jest.fn(),
  getReviews: jest.fn(),
  getReviewById: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});
afterAll((done) => {
  server.close(done);
});
describe('API Error Handling Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Get API /api.books should return 404 if no books are found', async () => {
    getBooks.mockReturnValue([]);
    const response = await request(server).get('/api/books');
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe('No books found');
  });
  it('Get Api /api.books/:id should return 404 if no books are found by id', async () => {
    getBookById.mockReturnValue(null);
    const response = await request(server).get('/api/books/898');
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe('Book not found');
  });
  it("GET API /api/reviews should retturn 404 if no reviews are found",async()=>{
    getReviews.mockReturnValue([])
    const response = await request(server).get("/api/reviews");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("no review found");
  })
  it("GET API /api/reviews should return 404 for non-existing review",async()=>{
    getReviewById.mockReturnValue(null)
    const response = await request(server).get("/api/reviews/909");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Review not found");
  });
});
