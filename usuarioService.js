const express = require('express');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('./usuarioModel');
const router = express.Router();

//Criar usuario
router.post('/', async (req, res) => {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).send({ message: 'Nome é obrigatório.' });
  }

  try {
    const result = await createUser(nome);
    res.status(201).send({ message: 'Usuário criado com sucesso.', id: result.insertId });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao criar usuário.', error });
  }
});

// Buscar todos os usuarios
router.get('/', async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao obter usuários.', error });
  }
});

// Buscar usuario por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).send({ message: 'Usuário não encontrado.' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao obter usuário.', error });
  }
});

// Atualizar usuario
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).send({ message: 'Nome é obrigatório.' });
  }

  try {
    const result = await updateUser(id, nome);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Usuário não encontrado.' });
    }
    res.status(200).send({ message: 'Usuário atualizado com sucesso.' });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar usuário.', error });
  }
});

// Excluir usuario
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteUser(id);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Usuário não encontrado.' });
    }
    res.status(200).send({ message: 'Usuário excluído com sucesso.' });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir usuário.', error });
  }
});

module.exports = router;
