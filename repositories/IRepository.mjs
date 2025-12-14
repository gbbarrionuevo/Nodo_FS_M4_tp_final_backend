class IRepository {
  getAll() {
    throw new Error('Este método debe ser implementado por la subclase');
  }

  getById(id) {
    throw new Error('Este método debe ser implementado por la subclase');
  }

  getOne(data) {
    throw new Error('Este método debe ser implementado por la subclase');
  }

  create(data) {
    throw new Error('Este método debe ser implementado por la subclase');
  }

  update(id, data) {
    throw new Error('Este método debe ser implementado por la subclase');
  }

  delete(data) {
    throw new Error('Este método debe ser implementado por la subclase');
  }

  restore(data) {
    throw new Error('Este método debe ser implementado por la subclase');
  }
}

export default IRepository;