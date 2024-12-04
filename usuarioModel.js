const db = require('./db');

// Funcao criar usuario
const createUser = async (nome) => {
  const [rows] = await db.execute(
    'INSERT INTO usuarios (nome, data_criacao) VALUES (?, ?)', 
    [nome, new Date()]
  );
  return rows;
};

// Funcao get de todos os usuarios
const getUsers = async () => {
  const [rows] = await db.execute('SELECT * FROM usuarios');
  return rows;
};

// Funcao get por id
const getUserById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
};

// Funcao para atualizar usuario
const updateUser = async (id, nome) => {
  const [rows] = await db.execute('UPDATE usuarios SET nome = ? WHERE id = ?', [nome, id]);
  return rows;
};

// Funcao para excluir
const deleteUser = async (id) => {
  const [rows] = await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
  return rows;
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
