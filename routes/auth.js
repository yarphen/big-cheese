const login = async (req, res) => { // eslint-disable-line

};

const signup = async (req, res) => { // eslint-disable-line

};

const verify = async (req, res) => { // eslint-disable-line

};

module.exports = (app) => {
  app.post('/auth/login', login);
  app.post('/auth/signup', signup);
  app.post('/auth/verify', verify); // TODO auth
};
