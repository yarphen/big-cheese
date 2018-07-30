const getAllDeals = async (req, res) => { // eslint-disable-line

};

const postNewDeal = async (req, res) => { // eslint-disable-line

};

const postNewMsg = async (req, res) => { // eslint-disable-line

};

const getDeal = async (req, res) => { // eslint-disable-line

};

module.exports = (app) => {
  app.get('/deals', getAllDeals); // TODO auth
  app.post('/deals', postNewDeal); // TODO auth
  app.post('/deals/:id', postNewMsg); // TODO auth
  app.get('/deals/:id', getDeal); // TODO auth
};
