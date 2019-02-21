import boom from 'boom';
import User from '../model/user';

// Get all users
export const getUsers = async (req, reply) => {
  try {
    const users = await User.find()
    return users
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single user by ID
export const getSingleUser = async (req, reply) => {
  try {
    const id = req.params.id
    const user = await User.findById(id)
    return user
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new user
export const addUser = async (req, reply) => {
  try {
    const user = new User(req.body)
    return user.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing user
export const updateUser = async (req, reply) => {
  try {
    const id = req.params.id
    const user = req.body
    const { ...updateData } = user
    const update = await User.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a user
export const deleteUser = async (req, reply) => {
  try {
    const id = req.params.id
    const user = await User.findByIdAndRemove(id)
    return user
  } catch (err) {
    throw boom.boomify(err)
  }
}


export function createCrudRoutes(baseUrl, defination) {
  return [
    {
      method: 'GET',
      url: baseUrl,
      handler: async (req, reply) => {
        try {
          const id = req.params.id
          const instance = await defination.findById(id)
          return instance
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
          const instance = new defination(req.body)
          return instance.save()
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
