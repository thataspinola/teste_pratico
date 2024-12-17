/* eslint-disable camelcase */
const db = require('../config/mySqlConnection.config');

exports.create = async (req, res) => {
  console.info('[START] Criar cadastro utilizacao');

  try {
    const {
      data_init, data_fim, motorista, automovel, motivo,
    } = req.body;

    console.info(`[INFO] Verificar se o motorista com ID ${motorista} existe`);
    let query = `SELECT * FROM motorista WHERE id = ${motorista}`;

    db.query(query, async (err, result) => {
      if (err) {
        console.error(`[ERRO] ${err}`);
        return res.status(404).json({ error: `[ERRO] ${err}` });
      }

      if (result.length === 0) {
        console.info(`[INFO] Motorista com ID ${motorista} não existe`);
        return res.status(400).json({ error: `Motorista com ID ${motorista} não existe` });
      }

      console.info(`[INFO] Verificar se o automovel com ID ${automovel} existe`);
      query = `SELECT * FROM automovel WHERE id = ${automovel}`;

      db.query(query, async (err2, result2) => {
        if (err2) {
          console.error(`[ERRO] ${err2}`);
          return res.status(404).json({ error: `[ERRO] ${err2}` });
        }

        if (result2.length === 0) {
          console.info(`[INFO] Automovel com ID ${motorista} não existe`);
          return res.status(400).json({ error: `Automovel com ID ${motorista} não existe` });
        }

        console.info(`[INFO] Verificar se o automovel com ID ${automovel} esta disponivel para o perídodo informado`);

        query = `SELECT * FROM utilizacao WHERE automovel = ${automovel}
          AND data_init BETWEEN ${data_init} AND ${data_fim}
          OR data_fim BETWEEN ${data_init} AND ${data_fim}`;

        db.query(query, async (err3, result3) => {
          if (err3) {
            console.error(`[ERRO] ${err3}`);
            return res.status(404).json({ error: `[ERRO] ${err3}` });
          }

          if (result3.length > 0) {
            console.info(`[INFO] Automovel com ID ${automovel} em utilização no período ${data_init} à ${data_fim}`);
            return res.status(400).json({ msg: `Automovel com ID ${automovel} em utilização no período ${data_init} à ${data_fim}` });
          }

          console.info(`[INFO] Verificar se o motorista com ID ${motorista} esta com algum automovel para o perídodo informado`);

          query = `SELECT * FROM utilizacao WHERE motorista = ${motorista}
            AND data_init BETWEEN ${data_init} AND ${data_fim}
            OR data_fim BETWEEN ${data_init} AND ${data_fim}`;

          db.query(query, async (err4, result4) => {
            if (err4) {
              console.error(`[ERRO] ${err4}`);
              return res.status(404).json({ error: `[ERRO] ${err4}` });
            }

            if (result4.length > 0) {
              console.info(`[INFO] Motorista com ID ${motorista} com automovel no período ${data_init} à ${data_fim}`);
              return res.status(400).json({ msg: `Motorista com ID ${motorista} com automovel no período ${data_init} à ${data_fim}` });
            }

            query = `INSERT INTO utilizacao (data_init, data_fim, motorista, automovel, motivo)
              VALUES ('${data_init}', '${data_fim}', ${motorista}, ${automovel}, '${motivo}')`;

            db.query(query, async (err5, result5) => {
              if (err5) {
                console.error(`[ERRO] ${err5}`);
                return res.status(404).json({ error: `[ERRO] ${err5}` });
              }

              console.info('[INFO] Utilização inserida com sucesso!');

              const utilizacao = {
                id: result5.insertId,
                data_init,
                data_fim,
                motorista,
                automovel,
                motivo,
              };

              return res.status(200).json({
                msg: 'Utilização inserida com sucesso!',
                result: utilizacao,
              });
            });
          });
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
    const query = 'SELECT * FROM utilizacao';

    db.query(query, async (err, result) => {
      if (err) {
        console.error(`[ERRO] ${err}`);
        return res.status(404).json({ error: `[ERRO] ${err}` });
      }

      if (result.length === 0) {
        console.info(`[INFO] Nenhum registro utilização encontrado`);
        return res.status(400).json({ msg: 'Nenhum registro utilização encontrado' });
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
  console.info('[START] Obter utilizacao por ID');

  try {
    const { id } = req.params;
    const query = `SELECT * FROM utilizacao WHERE id = ${id}`;

    db.query(query, async (err, result) => {
      if (err) {
        console.error(`[ERRO] ${err}`);
        return res.status(404).json({ error: `[ERRO] ${err}` });
      }

      if (result.length === 0) {
        console.info(`[INFO] O registro de utilização com ID ${id} não existe`);
        return res.status(400).json({ msg: `O registro de utilização com ID ${id} não existe` });
      }

      console.info(`[INFO] Obtido utilizacao pelo ID ${req.body.id}`);

      return res.status(200).json({
        msg: `Obtida utilizacao pelo ID ${req.body.id}`,
        result,
      });
    });
  } catch (error) {
    console.error(`[ERRO] ${error}`);
    return res.status(404).json({ error: `[ERRO] ${error}` });
  }
};

exports.update = async (req, res) => {
  console.info('[START] Alterar utilizacao automovel');

  try {
    const { id } = req.params;
    console.info(`[INFO] Verificar se o registro de utilização com o ID ${id} existe`);
    let query = `SELECT * FROM utilizacao WHERE id = ${id}`;

    db.query(query, async (err, result) => {
      if (err) {
        console.error(`[ERRO] ${err}`);
        return res.status(404).json({ error: `[ERRO] ${err}` });
      }

      if (result.length === 0) {
        console.info(`[INFO] O registro de utilização com ID ${id} não existe`);
        return res.status(400).json({ msg: `O registro de utilização com ID ${id} não existe` });
      }

      const {
        data_init, data_fim, motorista, automovel, motivo,
      } = req.body;

      if (data_init === undefined && data_fim === undefined && motorista === undefined && automovel === undefined && motivo === undefined) {
        return res.status(400).json({ msg: 'Nenhum dado a ser alterado' });
      }

      const objs = [];

      if (motorista !== undefined) {
        console.info(`[INFO] Verificar se o motorista com ID ${motorista} existe`);
        query = `SELECT * FROM motorista WHERE id = ${motorista}`;

        db.query(query, async (err2, result2) => {
          if (err2) {
            console.error(`[ERRO] ${err2}`);
            return res.status(404).json({ error: `[ERRO] ${err2}` });
          }

          if (result2.length === 0) {
            console.info(`[INFO] Motorista com ID ${motorista} não existe`);
            return res.status(400).json({ msg: `Motorista com ID ${motorista} não existe` });
          }
        });

        if ((motorista !== result[0].motorista) || (data_init !== result[0].data_init) || (data_fim !== result[0].data_fim)) {
          console.info(`[INFO] Motorista com ID ${motorista} diferente do motorista original com ID ${result[0].motorista}`);
          console.info(`[INFO] Verificar se o motorista com ID ${motorista} esta com algum automovel para o perídodo informado`);

          query = `SELECT * FROM utilizacao WHERE motorista = ${motorista}
            AND data_init BETWEEN ${data_init} AND ${data_fim}
            OR data_fim BETWEEN ${data_init} AND ${data_fim}`;

          db.query(query, async (err3, result3) => {
            if (err3) {
              console.error(`[ERRO] ${err3}`);
              return res.status(404).json({ error: `[ERRO] ${err3}` });
            }

            if (result3.length > 0) {
              console.info(`[INFO] Motorista com ID ${motorista} com automovel no período ${data_init} à ${data_fim}`);
              return res.status(400).json({ msg: `Motorista com ID ${motorista} com automovel no período ${data_init} à ${data_fim}` });
            }
          });
        }

        objs.push(`motorista = ${motorista}`);
      }

      if (automovel !== undefined) {
        console.info(`[INFO] Verificar se o automovel com id ${automovel} existe`);
        query = `SELECT * FROM automovel WHERE id = ${automovel}`;

        db.query(query, async (err4, result4) => {
          if (err4) {
            console.error(`[ERRO] ${err4}`);
            return res.status(404).json({ error: `[ERRO] ${err4}` });
          }

          if (result4.length === 0) {
            console.info(`[INFO] Automovel com ID ${automovel} não existe`);
            return res.status(400).json({ msg: `Automovel com ID ${automovel} não existe` });
          }
        });

        if ((automovel !== result[0].automovel) || (data_init !== result[0].data_init) || (data_fim !== result[0].data_fim)) {
          console.info(`[INFO] Automovel com ID ${automovel} diferente do automovel original com ID ${result[0].automovel}`);
          console.info(`[INFO] Verificar se o automovel com ID ${automovel} esta em utilização para o perídodo informado`);

          query = `SELECT * FROM utilizacao WHERE automovel = ${automovel}
          AND data_init BETWEEN ${data_init} AND ${data_fim}
          OR data_fim BETWEEN ${data_init} AND ${data_fim}`;

          db.query(query, async (err5, result5) => {
            if (err5) {
              console.error(`[ERRO] ${err5}`);
              return res.status(404).json({ error: `[ERRO] ${err5}` });
            }

            if (result5.length === 0) {
              console.info(`[INFO] Automovel com ID ${automovel} em utilização para o período ${data_init} à ${data_fim}`);
              return res.status(400).json({ msg: `Automovel com ID ${automovel} em utilização para o período ${data_init} à ${data_fim}` });
            }
          });
        }

        objs.push(`automovel = ${automovel}`);
      }

      if (data_init !== undefined && data_init !== result[0].data_init) {
        objs.push(`data_init = '${data_init}'`);
      }

      if (data_fim !== undefined && data_fim !== result[0].data_fim) {
        objs.push(`data_fim = '${data_fim}'`);
      }

      if (motivo !== undefined && motivo !== result[0].motivo) {
        objs.push(`motivo = ${motivo}`);
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

      query = `UPDATE utilizacao SET ${params} WHERE id = ${id}`;

      db.query(query, async (err6) => {
        if (err6) {
          console.error(`[ERRO] ${err6}`);
          return res.status(404).json({ error: `[ERRO] ${err6}` });
        }

        console.info(`[INFO] Registro de utilização ID ${id} alterado com sucesso`);

        const utilizacao = {
          id,
          data_init,
          data_fim,
          motorista,
          automovel,
          motivo,
        };

        return res.status(200).json({
          msg: `Registro de utilização ID ${id} alterado com sucesso`,
          result: utilizacao,
        });
      });
    });
  } catch (error) {
    console.error(`[ERRO] ${error}`);
    return res.status(404).json({ error: `[ERRO] ${error}` });
  }
};

exports.delete = async (req, res) => {
  console.info('[START] Deletar cadastro utilizacao');

  try {
    const { id } = req.params;
    console.info(`[INFO] Verificar se o registro de utilização com ID ${id} existe`);
    let query = `SELECT * FROM utilizacao WHERE id = ${id}`;

    db.query(query, async (err, result) => {
      if (err) {
        console.error(`[ERRO] ${err}`);
        return res.status(404).json({ error: `[ERRO] ${err}` });
      }

      if (result.length === 0) {
        console.info(`[INFO] O registro de utilização com ID ${id} não eixste`);
        return res.status(400).json({ msg: `O registro de utilização com ID ${id} não existe` });
      }

      query = `DELETE FROM utilizacao WHERE id = ${req.body.id}`;

      db.query(query, async (error) => {
        if (error) {
          console.error(`[ERRO] ${error}`);
          return res.status(404).json({ error: `[ERRO] ${error}` });
        }

        console.info(`[INFO] Registro de utilização com ID ${id} excluido com sucesso!`);

        return res.status(201).json({
          msg: `Registro de utilização com ID ${id} excluido com sucesso!`,
        });
      });
    });
  } catch (error) {
    console.error(`[ERRO] ${error}`);
    return res.status(404).json({ error: `[ERRO] ${error}` });
  }
};
