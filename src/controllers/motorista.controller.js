const db = require('../config/mySqlConnection.config');

exports.create = async (req, res) => {
  console.info('[START] Criar cadastro motorista');

  try {
    const { nome } = req.body;
    const query = `INSERT INTO motorista (nome) VALUES ('${nome}')`;

    db.query(query, async (err, result) => {
      if (err) {
        console.error(`[ERRO] ${err}`);
        return res.status(404).json({ error: `[ERRO] ${err}` });
      }

      console.info('[INFO] Motorista criado com sucesso!');

      const motorista = {
        id: result.insertId,
        nome,
      };

      return res.status(200).json({
        msg: 'Motorista criado com sucesso!',
        result: motorista,
      });
    });
  } catch (error) {
    console.error(`[ERRO] ${error}`);
    return res.status(404).json({ error: `[ERRO] ${error}` });
  }
};

exports.getAll = async (req, res) => {
  console.info('[START] Listar todos');

  try {
    const query = 'SELECT * FROM motorista';

    db.query(query, async (err, result) => {
      if (err) {
        console.error(`[ERRO] ${err}`);
        return res.status(404).json({ error: `[ERRO] ${err}` });
      }

      if (result.length === 0) {
        console.info(`[INFO] Nenhum motorista encontrado`);
        return res.status(400).json({ msg: 'Nenhum motorista encontrado ' });
      }

      console.info('[INFO] Listagem completa!');

      return res.status(200).json({
        msg: 'Listagem completa',
        result,
      });
    });
  } catch (error) {
    console.error(`[ERRO] ${error}`);
    return res.status(404).json({ error: `[ERRO] ${error}` });
  }
};

exports.getById = async (req, res) => {
  console.info('[START] Obter motorista por ID');

  try {
    const { id } = req.params;
    const query = `SELECT * FROM motorista WHERE id = ${id}`;

    db.query(query, async (err, result) => {
      if (err) {
        console.error(`[ERRO] ${err}`);
        return res.status(404).json({ error: `[ERRO] ${err}` });
      }

      if (result.length === 0) {
        console.info(`[INFO] Nenhum motorista encontrado com o ID ${id}`);
        return res.status(400).json({ msg: `Nenhum motorista encontrado com o ID ${id}` });
      }

      console.info(`[INFO] Obtido motorista pelo ID ${id}`);

      return res.status(200).json({
        msg: `Obtido motorista pelo ID ${id}`,
        result: result[0],
      });
    });
  } catch (error) {
    console.error(`[ERRO] ${error}`);
    return res.status(404).json({ error: `[ERRO] ${error}` });
  }
};

exports.getByNome = async (req, res) => {
  console.info('[START] Obter motorista por nome');

  try {
    const { nome } = req.params;
    const query = `SELECT * FROM motorista WHERE nome LIKE '%${nome}%'`;

    db.query(query, async (err, result) => {
      if (err) {
        console.error(`[ERRO] ${err}`);
        return res.status(404).json({ error: `[ERRO] ${err}` });
      }

      if (result.length === 0) {
        console.info(`[INFO] Nenhum motorista encontrado com o nome contendo ${nome}`);
        return res.status(400).json({ msg: `Nenhum motorista encontrado com o nome ${nome}` });
      }

      console.info(`[INFO] Obtido motorista pelo nome ${nome}`);

      return res.status(200).json({
        msg: `Obtido motorista pelo nome ${nome}`,
        result,
      });
    });
  } catch (error) {
    console.error(`[ERRO] ${error}`);
    return res.status(404).json({ error: `[ERRO] ${error}` });
  }
};

exports.update = async (req, res) => {
  console.info('[START] Alterar cadastro motorista');

  try {
    const { id } = req.params;
    console.info(`[INFO] Verificar se o ID ${id} existe`);
    let query = `SELECT * FROM motorista WHERE id = ${id}`;

    db.query(query, async (err, result) => {
      if (err) {
        console.error(`[ERRO] ${err}`);
        return res.status(404).json({ error: `[ERRO] ${err}` });
      }

      if (result.length === 0) {
        return res.status(400).json({ msg: `Nenhum motorista encontrado com o ID ${id}` });
      }

      const { nome } = req.body;
      query = `UPDATE motorista SET nome = '${nome}' WHERE id = ${id}`;

      db.query(query, async (error) => {
        if (err) {
          console.error(`[ERRO] ${error}`);
          return res.status(404).json({ error: `[ERRO] ${error}` });
        }

        const motorista = {
          id,
          nome,
        };

        console.info('[INFO] Motorista alterado com sucesso!');

        return res.status(209).json({
          msg: `Motorista com ID ${id} alterado com sucesso!`,
          result: motorista,
        });
      });
    });
  } catch (error) {
    console.error(`[ERRO] ${error}`);
    return res.status(404).json({ error: `[ERRO] ${error}` });
  }
};

exports.delete = async (req, res) => {
  console.info('[START] Deletar cadastro motorista');

  try {
    const { id } = req.params;
    console.info(`[INFO] Verificar se o ID ${id} existe`);
    let query = `SELECT * FROM motorista WHERE id = ${id}`;

    db.query(query, async (err, result) => {
      if (err) {
        console.error(`[ERRO] ${err}`);
        return res.status(404).json({ error: `[ERRO] ${err}` });
      }

      if (result.length === 0) {
        return res.status(400).json({ msg: `Nenhum motorista encontrado com o ID ${id}` });
      }

      query = `DELETE FROM motorista WHERE id = ${id}`;

      db.query(query, async (error) => {
        if (err) {
          console.error(`[ERRO] ${error}`);
          return res.status(404).json({ error: `[ERRO] ${error}` });
        }

        console.info(`[INFO] Motorista com ID ${id} excluido com sucesso!`);

        return res.status(200).json({
          msg: `Motorista com ID ${id} excluido com sucesso!`,
        });
      });
    });
  } catch (error) {
    console.error(`[ERRO] ${error}`);
    return res.status(404).json({ error: `[ERRO] ${error}` });
  }
};
