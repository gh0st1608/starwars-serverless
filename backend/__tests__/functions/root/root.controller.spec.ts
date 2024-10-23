import { rootHandler } from '../../../src/functions/root/handler'; 
import { RootController } from '../../../src/functions/root/adapters/http/root.controller';
import getRoot from '../../../mocks/root/getRoot.json'


// Mock de PeopleController
jest.mock('../../../src/functions/root/adapters/http/root.controller');

describe('rootHandler', () => {
  let mockGet: jest.Mock;

  beforeEach(() => {
    mockGet = RootController.prototype.get as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and the person data when found', async () => {

    // Mock de la respuesta de get
    mockGet.mockResolvedValue({ isOk: () => true, value: getRoot})

    const response = await rootHandler();

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify(getRoot)
    });
  });

  it('should return 404 when root not found', async () => {

    // Mock de la respuesta de getOne
    mockGet.mockResolvedValue({ isOk: () => false, value: {message : 'root not found'}});

    const response = await rootHandler();

    expect(response).toEqual({
      statusCode: 404,
      body: JSON.stringify({message : 'root not found'}),
    });
  });
});