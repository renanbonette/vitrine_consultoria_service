import jwt from 'jwt-simple';

describe('Routes Categories', () => {
  const Categories = app.datasource.models.categories;
  const Users = app.datasource.models.users;
  const jwtSecret = app.config.jwtSecret;

  const defaultCategory = {
    id: 1,
    name: 'Perfumaria',
    type: 'CATEGORY',
    link_href: 'http://static.natura.com.br/static/app-consultoria/c02-aguas.jpg',
    link_rel: 'categoryImage',
  };

  let token;

  beforeEach((done) => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create({
        name: 'John',
        email: 'john@mail.com',
        password: '123',
      }))
      .then((user) => {
        Categories
          .destroy({ where: {} })
          .then(() => Categories.create(defaultCategory))
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
          })
          .then(() => {
            done();
          });
      });
  });

  describe('Route GET /categories', () => {
    it('should return a list of categories', (done) => {
      const categoryList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        type: Joi.string(),
        link_href: Joi.string(),
        link_rel: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      }));

      request
        .get('/categories')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          joiAssert(res.body, categoryList);
          done(err);
        });
    });
  });

  describe('Route GET /categories/{id}', () => {
    it('should return a category', (done) => {
      const category = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        type: Joi.string(),
        link_href: Joi.string(),
        link_rel: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      });

      request
        .get('/categories/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          joiAssert(res.body, category);
          done(err);
        });
    });
  });

  describe('Route POST /categories', () => {
    it('should create a category', (done) => {
      const newCategory = {
        id: 2,
        name: 'Perfumaria',
        type: 'CATEGORY',
        link_href: 'http://static.natura.com.br/static/app-consutoria/c01-ekos-frescor.jpg',
        link_rel: 'categoryImage',
      };

      const category = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        type: Joi.string(),
        link_href: Joi.string(),
        link_rel: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      });

      request
        .post('/categories')
        .set('Authorization', `JWT ${token}`)
        .send(newCategory)
        .end((err, res) => {
          joiAssert(res.body, category);
          done(err);
        });
    });
  });

  describe('Route PUT /categories/{id}', () => {
    it('should update a category', (done) => {
      const updatedCategory = {
        id: 1,
        name: 'Maquiagem',
        type: 'CATEGORY',
        link_href: 'http://www.natura.com.br/sites/default/files/styles/large/public/movimento_maquiagem_app_consultoria.png',
        link_rel: 'categoryImage',
      };

      const updatedCount = Joi.array().items(1);

      request
        .put('/categories/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedCategory)
        .end((err, res) => {
          joiAssert(res.body, updatedCount);
          done(err);
        });
    });
  });

  describe('Route DELETE /categories/{id}', () => {
    it('should delete a category', (done) => {
      request
        .delete('/categories/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
