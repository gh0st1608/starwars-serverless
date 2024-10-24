import { peopleOneHandler, peopleCreateHandler, peopleHandler } from '../../../src/functions/people/handler'; 
import { PeopleController } from '../../../src/functions/people/adapters/http/people.controller';
import getPeople from '../../../mocks/people/getPeople.json'
import createPeople from '../../../mocks/people/createPeople.json'
import getListPeople from '../../../mocks/people/getListPeople.json'
import { HTTP_STATUS_CODES, HTTP_MESSAGES, HTTP_STATUS } from '../../../src/functions/people/core/helpers/response-http'

// Mock de PeopleController
jest.mock('../../../src/functions/people/adapters/http/people.controller');

describe('peopleOneHandler', () => {
  let mockGet: jest.Mock
  let mockGetOne: jest.Mock;
  let mockCreate: jest.Mock;

  beforeEach(() => {
    mockGet = PeopleController.prototype.get as jest.Mock
    mockGetOne = PeopleController.prototype.getOne as jest.Mock;
    mockCreate = PeopleController.prototype.create as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and the people list data when found', async () => {

    // Mock de la respuesta de get

    mockGet.mockResolvedValue({ isOk: () => true, value: getListPeople})
    const response = await peopleHandler();
    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({ message : getListPeople, code : HTTP_STATUS_CODES.OK, status: HTTP_STATUS.SUCCESSFULL_GET_OPERATION })
    });
  });


  it('should return 200 and the people data when found', async () => {
    const mockEvent = {
      pathParameters: {
        id: '3ad1a33b-c511-4d99-a898-2fa00b6166b0',
      },
    };

    // Mock de la respuesta de getOne
    mockGetOne.mockResolvedValue({ isOk: () => true, value : getPeople})

    const response = await peopleOneHandler(mockEvent);

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({message : getPeople, code : HTTP_STATUS_CODES.OK, status: HTTP_STATUS.SUCCESSFULL_GET_OPERATION})
    });
  });

  it('should return 404 when people not found', async () => {
    const mockEvent = {
      pathParameters: {
        id: '3ad1a33b-c511-4d99-a898-2fa00b6166b1',
      },
    };

    // Mock de la respuesta de getOne
    mockGetOne.mockResolvedValue({ isOk: () => false, value: { message : HTTP_MESSAGES.NOT_FOUND, code: HTTP_STATUS_CODES.NOT_FOUND, status: HTTP_STATUS.ERROR }});

    const response = await peopleOneHandler(mockEvent);

    expect(response).toEqual({
      statusCode: 404,
      body: JSON.stringify({ message : HTTP_MESSAGES.NOT_FOUND, code: HTTP_STATUS_CODES.NOT_FOUND, status: HTTP_STATUS.ERROR }),
    });
  });



  it('should return 200 and the person created', async () => {
    const mockEvent = {
      body : JSON.stringify(createPeople)
    };

    // Mock de la respuesta de create
    mockCreate.mockResolvedValue({ message : HTTP_MESSAGES.PEOPLE_RESOURCE_CREATED, code: HTTP_STATUS_CODES.OK, status: HTTP_STATUS.SUCCESSFULL_POST_OPERATION })

    const response = await peopleCreateHandler(mockEvent);
    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({ message : HTTP_MESSAGES.PEOPLE_RESOURCE_CREATED, code: HTTP_STATUS_CODES.OK, status: HTTP_STATUS.SUCCESSFULL_POST_OPERATION })
    });
  });
});