import pool from '../configs/database.js';

class veiculoRepository {
  async criar(veiculo) {
    const sql = `
      INSERT INTO veiculo (placa, idcliente, cor, modelo, ano_modelo, chassi, tipo_combustivel)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [resultado] = await pool.execute(sql, [
      veiculo.placa,
      veiculo.idcliente,
      veiculo.cor,
      veiculo.modelo,
      veiculo.ano_modelo,
      veiculo.chassi || null, 
      veiculo.tipo_combustivel 
    ]);
    return resultado.insertId;
  }

  async buscarTodos() {
    const sql = 'SELECT * FROM veiculo';
    const [linhas] = await pool.execute(sql);
    return linhas;
  }

  async buscarPorId(idveiculo) {
    const sql = 'SELECT * FROM veiculo WHERE idveiculo = ?';
    const [linhas] = await pool.execute(sql, [idveiculo]);
    return linhas[0] || null;
  }

  async buscarPorPlaca(placa) {
    const sql = 'SELECT * FROM veiculo WHERE placa = ?';
    const [linhas] = await pool.execute(sql, [placa]);
    return linhas[0] || null;
  }

  async atualizar(idveiculo, dados) {
    const sql = `
      UPDATE veiculo 
      SET cor = ?, modelo = ?, ano_modelo = ?, tipo_combustivel = ?
      WHERE idveiculo = ?
    `;
    const [resultado] = await pool.execute(sql, [
      dados.cor,
      dados.modelo,
      dados.ano_modelo,
      dados.tipo_combustivel, 
      idveiculo
    ]);
    return resultado.affectedRows > 0;
  }

  async deletar(idveiculo) {
    const sql = 'DELETE FROM veiculo WHERE idveiculo = ?';
    const [resultado] = await pool.execute(sql, [idveiculo]);
    return resultado.affectedRows > 0;
  }
}

export default new veiculoRepository();