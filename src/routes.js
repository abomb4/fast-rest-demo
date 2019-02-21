import * as userController from './controller/user';
import User from './model/user';

export function createCrudRoutes(baseUrl, defination) {
  return [
    {
      method: 'GET',
      url: baseUrl,
      handler: async (req, reply) => {
        try {
          const users = await User.find()
          return users
        } catch (err) {
          throw boom.boomify(err)
        }
      }
    },
    {
      method: 'GET',
      url: `${baseUrl}/:id`,
      handler: async (req, reply) => {
        try {
          const id = req.params.id
          const user = await User.findById(id)
          return user
        } catch (err) {
          throw boom.boomify(err)
        }
      }
    },
    {
      method: 'POST',
      url: baseUrl,
      handler: async (req, reply) => {
        try {
          const instance = new defination(req.body)
          return instance.save()
        } catch (err) {
          throw boom.boomify(err)
        }
      }
    },
    {
      method: 'PUT',
      url: `${baseUrl}/:id`,
      handler: async (req, reply) => {
        try {
          const id = req.params.id
          const instance = req.body
          const { ...updateData } = instance
          const update = await defination.findByIdAndUpdate(id, updateData, { new: true })
          return update
        } catch (err) {
          throw boom.boomify(err)
        }
      }
    },
    {
      method: 'DELETE',
      url: `${baseUrl}/:id`,
      handler: async (req, reply) => {
        try {
          const id = req.params.id
          const instance = await defination.findByIdAndRemove(id)
          return instance
        } catch (err) {
          throw boom.boomify(err)
        }
      }
    }
  ];
}

const routes = createCrudRoutes('/api/users', User);

export default routes;
