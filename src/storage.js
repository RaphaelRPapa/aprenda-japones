// Simulação do sistema de storage para desenvolvimento local
class LocalStorageWrapper {
    async get(key) {
      try {
        const value = localStorage.getItem(key);
        return value ? { key, value, shared: false } : null;
      } catch (error) {
        console.error('Erro ao ler storage:', error);
        return null;
      }
    }
  
    async set(key, value) {
      try {
        localStorage.setItem(key, value);
        return { key, value, shared: false };
      } catch (error) {
        console.error('Erro ao salvar storage:', error);
        return null;
      }
    }
  
    async delete(key) {
      try {
        localStorage.removeItem(key);
        return { key, deleted: true, shared: false };
      } catch (error) {
        console.error('Erro ao deletar storage:', error);
        return null;
      }
    }
  
    async list(prefix = '') {
      try {
        const keys = Object.keys(localStorage).filter(key => 
          key.startsWith(prefix)
        );
        return { keys, prefix, shared: false };
      } catch (error) {
        console.error('Erro ao listar storage:', error);
        return null;
      }
    }
  }
  
  // Disponibilizar globalmente
  if (typeof window !== 'undefined') {
    window.storage = new LocalStorageWrapper();
  }