const getAllDeals = async (req, res) => { // eslint-disable-line

};

const getAllUsers = async (req, res) => { // eslint-disable-line

};

const getUser = async (req, res) => { // eslint-disable-line

};

const updateProfile = async (req, res) => { // eslint-disable-line

};

module.exports = (app) => {
  app.get('/users', getAllUsers); // TODO auth
  app.get('/users/:id', getUser); // TODO auth
  app.patch('/users/:id', updateProfile); // TODO auth // TODO verify that user is the same
};
