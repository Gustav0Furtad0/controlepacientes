
const { login } = require('./Controller/userController');

const mockRequest = {
  body: {
    usuario: 'gustavo.furtado',
    senha: '123456',
  },
};

const mockResponse: { 
  statusCode?: number;
  status: (code: number) => any;
  json: (data: any) => void;
} = {
  status: function (code) {
    this.statusCode = code;
    return this;
  },
  json: function (data) {
    console.log(data);
  },
};

// Simula o uso do login
login(mockRequest, mockResponse);