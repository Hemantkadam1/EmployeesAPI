let {
  app,
  getEmployees,
  getEmployeeById,
  addEmployee,
  
} = require('../index.js');

let request = require('supertest');
let http = require('http');
const { beforeEach } = require('node:test');

jest.mock('../index.js', () => ({
  ...jest.requireActual('../index.js'),
  getEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  addEmployee: jest.fn(),

}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('endpoints testing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should get the list of employees', async () => {
    let mockEmployee =[
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', department: 'Engineering' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', department: 'Marketing' },
    ];

    getEmployees.mockResolvedValue(mockEmployee);
    let result = await request(server).get('/employees');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockEmployee);
  });

  it('should Test get employee by ID', async () => {
    let mockEmployee = { id: 1, name: 'John Doe', email: 'john.doe@example.com', department: 'Engineering' };

    getEmployeeById.mockResolvedValue(mockEmployee);
    let result = await request(server).get('/employees/details/1');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockEmployee);
  });

  it('should Test get employee by non-existent ID', async () => {
    getEmployeeById.mockResolvedValue(null);
    let result = await request(server).get('/employees/details/99');
    expect(result.statusCode).toEqual(404);
  });

  it('should Test add new Employee', async () => {
    let newEmployees = {
      id:3,
 name: 'Alice Brown',
  email: 'alice.brown@example.com',
  department: 'Sales',
    };

    addEmployee.mockResolvedValue(newEmployees);
    let result = await request(server)
      .post('/employees/new')
      .send({ name: 'Alice Brown',
      email: 'alice.brown@example.com',
      department: 'Sales' });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(newEmployees);
  });

});
