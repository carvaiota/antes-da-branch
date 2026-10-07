import veiculoRepository from '../repositories/veiculoRepositories.js';
import Veiculo from '../models/veiculo.js';

class veiculoService {
  async criar(dados) {
    const veiculoExistente = await veiculoRepository.buscarPorPlaca(dados.placa);
    if (veiculoExistente) {
      throw new Error("Já existe um veículo cadastrado com esta placa.");
    }

    const novoVeiculo = new Veiculo(
      null,
      dados.placa,
      dados.idcliente,
      dados.cor,
      dados.modelo,
      dados.ano_modelo,
      dados.chassi,
      dados.tipo_combustivel
    );

    const idInserido = await veiculoRepository.criar(novoVeiculo);
    return { idveiculo: idInserido, ...dados };
  }

  async buscarTodos() {
    return await veiculoRepository.buscarTodos();
  }

  async buscarPorId(idveiculo) {
    const veiculo = await veiculoRepository.buscarPorId(idveiculo);
    if (!veiculo) {
      throw new Error("Veículo não encontrado.");
    }
    return veiculo;
  }

  async atualizar(idveiculo, dados) {
    const veiculoExistente = await veiculoRepository.buscarPorId(idveiculo);
    if (!veiculoExistente) {
      throw new Error("Veículo não encontrado para atualização.");
    }

    const atualizado = await veiculoRepository.atualizar(idveiculo, dados);
    return atualizado;
  }

  async deletar(idveiculo) {
    const veiculoExistente = await veiculoRepository.buscarPorId(idveiculo);
    if (!veiculoExistente) {
      throw new Error("Veículo não encontrado para remoção.");
    }

    return await veiculoRepository.deletar(idveiculo);
  }
}

export default new veiculoService();