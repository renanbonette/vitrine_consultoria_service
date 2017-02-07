import CategoriesController from '../../../controllers/categories';

describe('Controllers: Categories', () => {
  describe('Route GET all categories: getAll()', () => {
    it('should return a list of categories', () => {
      const Categories = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'test categories',
        type: 'CATEGORY',
        link_href: 'http://gmail.com',
        link_rel: 'test',
        created_at: '2016-09-10T23:55:36.692Z',
        updated_at: '2016-09-10T23:55:36.692Z',
      }];

      td.when(Categories.findAll({})).thenResolve(expectedResponse);

      const categoriesController = new CategoriesController(Categories);
      return categoriesController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Route GET a category: getById()', () => {
    it('should return a category', () => {
      const Categories = {
        findOne: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'test categories',
        type: 'CATEGORY',
        link_href: 'http://gmail.com',
        link_rel: 'test',
        created_at: '2016-09-10T23:55:36.692Z',
        updated_at: '2016-09-10T23:55:36.692Z',
      }];

      td.when(Categories.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const categoriesController = new CategoriesController(Categories);
      return categoriesController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });
  describe('Create a category: create()', () => {
    it('should create a category', () => {
      const Categories = {
        create: td.function(),
      };

      const requestBody = {
        id: 1,
        name: 'test categories',
        link_href: 'http://gmail.com',
        link_rel: 'test',
        link: 'http://gmail.com',
      };
      const expectedResponse = [{
        id: 1,
        name: 'test categories',
        type: 'CATEGORY',
        link_href: 'http://gmail.com',
        link_rel: 'test',
        created_at: '2016-09-10T23:55:36.692Z',
        updated_at: '2016-09-10T23:55:36.692Z',
      }];

      td.when(Categories.create(requestBody)).thenResolve(expectedResponse);

      const categoriesController = new CategoriesController(Categories);
      return categoriesController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a category: update()', () => {
    it('should update a category', () => {
      const Categories = {
        update: td.function(),
      };

      const requestBody = {
        id: 1,
        name: 'test categories updated',
        type: 'CATEGORY',
        link_href: 'http://gmail.com',
        link_rel: 'test',
      };
      const expectedResponse = [{
        id: 1,
        name: 'test categories updated',
        type: 'CATEGORY',
        link_href: 'http://gmail.com',
        link_rel: 'test',
      }];

      td.when(Categories.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const categoriesController = new CategoriesController(Categories);
      return categoriesController.update(requestBody, { id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Delete a category: delete()', () => {
    it('should delete a category', () => {
      const Categories = {
        destroy: td.function(),
      };

      td.when(Categories.destroy({ where: { id: 1 } })).thenResolve({});

      const categoriesController = new CategoriesController(Categories);
      return categoriesController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(204));
    });
  });
});
