import api from './api'

const Resource = (endpoint) => {
  function findAll(){
    return new Promise((resolve, reject) => {
      api.get(`/${ endpoint }`)
        .then(result => resolve(result.data))
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
    return api.patch(`/${endpoint}/${id}`, data)
  }

  return {
    findAll,
    find,
    update
  }

}

export default Resource;