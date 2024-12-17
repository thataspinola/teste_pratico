const db = require('../config/mySqlConnection.config');

exports.create = async (req, res) => {
  console.info('[START] Criar cadastro automovel');

  try {
    console.info(`[INFO] Verificar se a placa já esta cadastrada`);
    const { placa, cor, marca } = req.body;
    let query = `SELECT * FROM automovel WHERE placa = '${placa}'`;

    db.query(query, async (err, result) => {
      if (err) {
        console.error(`[ERRO] ${err}`);
        return res.status(404).json({ error: `[ERRO] ${err}` });
      }

      if (result.length > 0) {
        console.info(`[INFO] Placa ${placa} já cadastrada`);
        return res.status(400).json({ msg: `Placa ${placa} já cadastrada` });
      }

      query = `INSERT INTO automovel (placa, cor, marca) VALUES ('${placa}', '${cor}', '${marca}')`;

      db.query(query, async (error, resultInsert) => {
        if (error) {
          console.error(`[ERRO] ${error}`);
          return res.status(404).json({ error: `[ERRO] ${error}` });
        }

        const auto = {
          id: resultInsert.insertId,
          placa,
          cor,
          marca,
        };

        console.info('[INFO] Automovel criado com sucesso!');

        return res.status(200).json({
          msg: 'Automovel criado com sucesso!',
          result: auto,
        });
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
    const query = 'SELECT * FROM automovel';

    db.query(query, async (err, result) => {
      if (err) {
        console.error(`[ERRO] ${err}`);
        return res.status(404).json({ error: `[ERRO] ${err}` });
      }

      if (result.length === 0) {
        console.info('[INFO] Nenhum automovel encontrado');
        return res.status(400).json({ msg: 'Nenhum automovel encontrado' });
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
  console.info('[START] Obter automovel por ID');

  try {
    const { id } = req.params;
    const query = `SELECT * FROM automovel WHERE id = ${id}`;

    db.query(query, async (err, result) => {
      if (err) {
        console.error(`[ERRO] ${err}`);
        return res.status(404).json({ error: `[ERRO] ${err}` });
      }

      if (result.length === 0) {
        console.info(`[INFO] Nenhum automovel encontrado com o ID ${id}`);
        return res.status(400).json({ msg: `Nenhum automovel encontrado com o ID ${id}` });
      }

      console.info(`[INFO] Obtido automovel pelo ID ${id}`);

      return res.status(200).json({
        msg: `Obtido automovel pelo ID ${id}`,
        result,
      });
    });
  } catch (error) {
    console.error(`[ERRO] ${error}`);
    return res.status(404).json({ error: `[ERRO] ${error}` });
  }
};

exports.getByPlaca = async (req, res) => {
  console.info('[START] Obter automovel por placa');

  try {
    const { placa } = req.params;
    const query = `SELECT * FROM automovel WHERE placa LIKE '%${placa}%'`;

    db.query(query, async (err, result) => {
      if (err) {
        console.error(`[ERRO] ${err}`);
        return res.status(404).json({ error: `[ERRO] ${err}` });
      }

      if (result.length === 0) {
        console.info(`[INFO] Nenhum automovel encontrado com a placa contendo ${placa}`);
        return res.status(400).json({ msg: `Nenhum automovel encontrado com a placa contendo ${placa}` });
      }

      console.info(`[INFO] Obtido automovel pela placa ${placa}`);

      return res.status(200).json({
        msg: `Automovel(is) que contem a placa ${placa}`,
        result,
      });
    });
  } catch (error) {
    console.error(`[ERRO] ${error}`);
    return res.status(404).json({ error: `[ERRO] ${error}` });
  }
};

exports.delete = async (req, res) => {
  console.info('[START] Deletar cadastro automovel');

  try {
    console.info(`[INFO] Verificar se o id informado existe`);
    const { id } = req.params;
    let query = `SELECT * FROM automovel WHERE id = ${id}`;

    db.query(query, async (err, result) => {
      if (err) {
        console.error(`[ERRO] ${err}`);
        return res.status(404).json({ error: `[ERRO] ${err}` });
      }

      if (result.length === 0) {
        console.info(`[INFO] Nenhum automovel encontrado com o ID ${id}`);
        return res.status(400).json({ msg: `Nenhum automovel encontrado com o ID ${id}` });
      }

      query = `DELETE FROM automovel WHERE id = ${id}`;

      db.query(query, async (error, resultDelete) => {
        if (error) {
          console.error(`[ERRO] ${err}`);
          return res.status(404).json({ error: `[ERRO] ${error}` });
        }

        console.info('[INFO] Automovel excluido com sucesso!');

        return res.status(200).json({
          msg: `Automovel com ID ${id} excluido com sucesso!`,
          result: resultDelete.resultDelete,
        });
      });
    });
  } catch (error) {
    console.error(`[ERRO] ${error}`);
    return res.status(404).json({ error: `[ERRO] ${error}` });
  }
};

exports.update = async (req, res) => {
  console.info('[START] Alterar cadastro automovel');

  try {
    console.info(`[INFO] Verificar se o id informado existe`);
    const { id } = req.params;
    let query = `SELECT * FROM automovel WHERE id = ${id}`;

    db.query(query, async (err, result) => {
      if (err) {
        console.error(`[ERRO] ${err}`);
        return res.status(404).json({ error: `[ERRO] ${err}` });
      }

      if (result.length === 0) {
        console.info(`[INFO] Nenhum automovel encontrado com o ID ${id}`);
        return res.status(400).json({ msg: `Nenhum automovel encontrado com o ID ${id}` });
      }

      const { placa, cor, marca } = req.body;

      if (placa === undefined && cor === undefined && marca === undefined) {
        return res.status(404).json({ error: `[ERRO] Nenhum automovel a ser modificado` });
      }

      const objs = [];

      if (placa !== undefined) {
        objs.push(`placa = '${placa}'`);
      }

      if (cor !== undefined) {
        objs.push(`cor = '${cor}'`);
      }

      if (marca !== undefined) {
        objs.push(`marca = '${marca}'`);
      }

      let params;
      let count = 0;

      objs.forEach((item) => {
        if (count === 0) {
          params = item;
        } else {
          params += `, ${item}`;
        }

        count += 1;
      });

      query = `UPDATE automovel SET ${params} WHERE id = ${id}`;

      db.query(query, async (error) => {
        if (error) {
          console.error(`[ERRO] ${error}`);
          return res.status(404).json({ error: `[ERRO] ${err}` });
        }

        console.info('[INFO] Automovel alterado com sucesso!');

        const auto = {
          id,
          placa: placa === undefined ? result[0].placa : placa,
          cor: cor === undefined ? result[0].cor : cor,
          marca: marca === undefined ? result[0].marca : marca,
        };

        return res.status(200).json({
          msg: 'Automovel alterado com sucesso!',
          result: auto,
        });
      });
    });
  } catch (error) {
    console.error(`[ERRO] ${error}`);
    return res.status(404).json({ error: `[ERRO] ${error}` });
  }
};
