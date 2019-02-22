import boom from 'boom';
import { respSuccess, paginateRespSuccess } from './common/dto';
import User from './model/user';

export function createCrudRoutes(baseUrl, defination) {
  return [
    {
      method: 'GET',
      url: baseUrl,
      handler: async (req, reply) => {
        try {
          const { pageSize, currPage, ...query } = req.query;
          const pageOption = {
            pageSize: parseInt(pageSize) || 10,
            pageNo: parseInt(currPage) || 1
          };
          console.log("query:", query);
          const instances = await defination.find(query)
            .sort({id: -1})
            .skip((pageOption.pageNo - 1) * pageOption.pageSize)
            .limit(pageOption.pageSize)
            .exec();

          const total = await defination.count(query);

          return paginateRespSuccess(pageOption.pageNo, pageOption.pageSize, total, instances);
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
          const instance = await defination.findById(id)
          return respSuccess(instance);
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
          return respSuccess(instance.save())
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
          return respSuccess(update)
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
          return respSuccess(instance)
        } catch (err) {
          throw boom.boomify(err)
        }
      }
    }
  ];
}

const routes = createCrudRoutes('/api/users', User);

export default routes;
