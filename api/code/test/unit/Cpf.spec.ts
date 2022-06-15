
import Cpf from '../../src/domain/entity/Cpf'
describe('CPF', () => {
  it('Deve validar um cpf válido', () => {
    const cpf = new Cpf('903.542.750-54')
    expect(cpf.value).toBe('903.542.750-54')
  })
  it('Deve validar um cpf inválido', () => {
    expect(() => new Cpf('123.456.789-99')).toThrow(new Error('Cpf inválido'))
  })

  it('Deve validar um cpf válido sem os pontos', () => {
    expect(new Cpf('90354275054').value).toBe('90354275054')
  })

  test('Deve validar um cpf válido com alguns pontos', function () {
    expect(new Cpf('935.411.34780').value).toBe('935.411.34780')
  })

  const wrongSameDigitCpf = [
    '111.111.111-11',
    '222.222.222-22',
    '333.333.333-33'
  ]
  test.each(wrongSameDigitCpf)('Deve validar um cpf inválido com todos os números iguais', function (cpf) {
    expect(() => new Cpf(cpf)).toThrow(new Error('Cpf inválido'))
  })
})
