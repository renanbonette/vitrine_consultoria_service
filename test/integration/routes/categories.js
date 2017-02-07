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
      request
        .get('/categories')
          .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body[0].name).to.be.eql(defaultCategory.name);
          expect(res.body[0].id).to.be.eql(defaultCategory.id);
          expect(res.body[0].type).to.be.eql(defaultCategory.type);
          expect(res.body[0].link_href).to.be.eql(defaultCategory.link_href);
          expect(res.body[0].link_rel).to.be.eql(defaultCategory.link_rel);
          done(err);
        });
    });
  });

  describe('Route GET /categories/{id}', () => {
    it('should return a category', (done) => {
      request
        .get('/categories/1')
          .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.name).to.be.eql(defaultCategory.name);
          expect(res.body.id).to.be.eql(defaultCategory.id);
          expect(res.body.type).to.be.eql(defaultCategory.type);
          expect(res.body.link_href).to.be.eql(defaultCategory.link_href);
          expect(res.body.link_rel).to.be.eql(defaultCategory.link_rel);
          done(err);
        });
    });
  });

  describe('Route POST /categories', () => {
    it('should create a category', (done) => {
      const newClassification = {
        id: 2,
        name: 'Perfumaria',
        type: 'CATEGORY',
        link_href: 'http://static.natura.com.br/static/app-consutoria/c01-ekos-frescor.jpg',
        link_rel: 'categoryImage',
      };

      request
        .post('/categories')
        .set('Authorization', `JWT ${token}`)
        .send(newClassification)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newClassification.id);
          expect(res.body.name).to.be.eql(newClassification.name);
          expect(res.body.type).to.be.eql(newClassification.type);
          expect(res.body.link_href).to.be.eql(newClassification.link_href);
          expect(res.body.link_rel).to.be.eql(newClassification.link_rel);
          done(err);
        });
    });
  });

  describe('Route PUT /categories/{id}', () => {
    it('should update a category', (done) => {
      const updatedClassification = {
        id: 1,
        name: 'Maquiagem',
        type: 'CATEGORY',
        link_href: 'http://www.natura.com.br/sites/default/files/styles/large/public/movimento_maquiagem_app_consultoria.png',
        link_rel: 'categoryImage',
      };

      request
        .put('/categories/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedClassification)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
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
