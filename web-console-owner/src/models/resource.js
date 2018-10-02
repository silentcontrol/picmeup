import api from './api'

const Resource = (endpoint) => {
  function findAll(){
    return new Promise((resolve, reject) => {
      api.get(`/${ endpoint }`)
        .then(result => {
          resolve(result.data)
        })
        .catch(errors => reject(errors))
    })
  }

  function find(id){
    return new Promise((resolve, reject) => {
      api.get(`/${endpoint}/${id}`)
        .then(result => resolve(result.data))
        .catch(errors => reject(errors))
    })
  }

  function update(id, data){
    return api.post(`/${endpoint}/${id}`, data)
  }

  function create(data){
    return api.post(`/${endpoint}`, data)
  }

  return {
    findAll,
    find,
    update,
    create
  }

}

export default Resource;