import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  cadastrarAluno,
  cadastrarCoordenador,
  cadastrarDiretor,
  cadastrarDisciplina,
  cadastrarProfessor,
  cadastrarResponsavel,
  cadastrarSecretario,
  cadastrarVinculoAlunoResponsavel,
  cadastrarVinculoProfessor,
  listarAlunos,
  listarCoordenadores,
  listarDiretores,
  listarDisciplinas,
  listarNotas,
  listarProfessores,
  listarResponsaveis,
  listarSecretarios,
  listarTurmas,
  listarVinculosAlunoResponsavel,
  listarVinculosProfessor,
} from '../services/schoolApi';

const CadastrosContext = createContext(null);

export function CadastrosProvider({ children }) {
  const [alunos, setAlunos] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [responsaveis, setResponsaveis] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function carregarCadastros() {
      const results = await Promise.allSettled([
        listarAlunos(),
        listarTurmas(),
        listarProfessores(),
        listarResponsaveis(),
        listarVinculosAlunoResponsavel(),
        listarVinculosProfessor(),
        listarCoordenadores(),
        listarDiretores(),
        listarSecretarios(),
      ]);

      if (!mounted) return;

      const [alunosResult, turmasResult, professoresResult, responsaveisResult, vinculosResult,
        aulasResult, coordenadoresResult, diretoresResult, secretariosResult] = results;
      const value = (result) => result.status === 'fulfilled' ? result.value : [];
      const erroLeitura = results.some((result) => result.status === 'rejected');
      const turmasApi = value(turmasResult);
      const vinculos = value(vinculosResult);
      const aulas = value(aulasResult);

      setTurmas(turmasApi);
      setAlunos(value(alunosResult).map((aluno) => ({
        ...aluno,
        id: `A-${aluno.matricula}`,
        matricula: String(aluno.matricula),
        nomeCompleto: aluno.nome,
        turmaId: aluno.turma?.idTurma,
        ano: aluno.turma?.anoSerie ?? '',
        status: 'Ativo',
      })));
      setProfessores(value(professoresResult).map((professor) => {
        const turmasDoProfessor = aulas
          .filter((vinculo) => vinculo.professor?.idProfessor === professor.idProfessor)
          .map((vinculo) => vinculo.turma)
          .filter(Boolean);
        return {
          ...professor,
          id: `P-${professor.idProfessor}`,
          matricula: String(professor.idProfessor),
          nomeCompleto: professor.nome,
          turmas: turmasDoProfessor,
          turmasIds: turmasDoProfessor.map((turma) => String(turma.idTurma)),
          disciplinas: aulas
            .filter((vinculo) => vinculo.professor?.idProfessor === professor.idProfessor)
            .map((vinculo) => vinculo.disciplina?.nome)
            .filter(Boolean)
            .join(', '),
          status: 'Ativo',
        };
      }));
      setResponsaveis(value(responsaveisResult).map((responsavel) => {
        const vinculo = vinculos.find((item) => item.responsavel?.idResponsavel === responsavel.idResponsavel);
        return {
          ...responsavel,
          id: `R-${responsavel.idResponsavel}`,
          matricula: String(responsavel.idResponsavel),
          nomeCompleto: responsavel.nome,
          parentesco: vinculo?.parentesco ?? '',
          alunoVinculado: vinculo?.aluno?.nome ?? '',
          status: 'Ativo',
        };
      }));
      setFuncionarios([
        ...value(coordenadoresResult).map((item) => ({ ...item, id: `C-${item.id}`, matricula: String(item.id), nomeCompleto: item.nome, cargo: 'Coordenador(a)', status: 'Ativo' })),
        ...value(diretoresResult).map((item) => ({ ...item, id: `D-${item.id}`, matricula: String(item.id), nomeCompleto: item.nome, cargo: 'Diretor(a)', status: 'Ativo' })),
        ...value(secretariosResult).map((item) => ({ ...item, id: `S-${item.id}`, matricula: String(item.id), nomeCompleto: item.nome, cargo: 'Secretário(a) escolar', status: 'Ativo' })),
      ]);
      if (erroLeitura) setError('Algumas listas não puderam ser carregadas do backend.');
      setLoading(false);
    }

    carregarCadastros();
    return () => { mounted = false; };
  }, []);

  const addAluno = useCallback(async (dados) => {
    const salvo = await cadastrarAluno({
      nome: dados.nomeCompleto.trim(),
      cpf: dados.cpf.replace(/\D/g, ''),
      email: dados.email || null,
      dataNascimento: dados.dataNascimento,
      turma: { idTurma: Number(dados.turmaId) },
    });
    const novo = { ...salvo, id: `A-${salvo.matricula}`, matricula: String(salvo.matricula), nomeCompleto: salvo.nome, status: 'Ativo' };
    setAlunos((prev) => [novo, ...prev]);

    try {
      const nomeResponsavel = dados.responsavelPrincipal.trim();
      const existente = responsaveis.find((item) => item.nomeCompleto.toLowerCase() === nomeResponsavel.toLowerCase());
      const responsavel = existente ?? await cadastrarResponsavel({
        nome: nomeResponsavel,
        email: dados.emailResponsavel || null,
        telefone: dados.telefoneResponsavel || null,
      });
      await cadastrarVinculoAlunoResponsavel({
        parentesco: dados.parentesco,
        aluno: { matricula: Number(salvo.matricula) },
        responsavel: { idResponsavel: responsavel.idResponsavel },
      });
      if (!existente) {
        setResponsaveis((prev) => [{
          ...responsavel,
          id: `R-${responsavel.idResponsavel}`,
          matricula: String(responsavel.idResponsavel),
          nomeCompleto: responsavel.nome,
          status: 'Ativo',
        }, ...prev]);
      }
    } catch (erro) {
      throw new Error(`Aluno cadastrado, mas o vínculo do responsável falhou: ${erro.response?.data?.message || erro.message}`);
    }

    return novo;
  }, [responsaveis]);

  const addProfessor = useCallback(async (dados) => {
    const idsTurma = dados.turmasIds.map(Number).filter(Number.isInteger);
    if (idsTurma.length === 0) throw new Error('Selecione ao menos uma turma cadastrada no backend.');

    const salvo = await cadastrarProfessor({
      nome: dados.nomeCompleto.trim(),
      cpf: dados.cpf.replace(/\D/g, ''),
      email: dados.email || null,
      telefone: dados.telefone || null,
    });
    const disciplinasExistentes = await listarDisciplinas();
    const nomesDisciplinas = [...new Set(dados.disciplinas.split(',').map((nome) => nome.trim()).filter(Boolean))];
    const disciplinas = [];

    for (const nome of nomesDisciplinas) {
      const existente = disciplinasExistentes.find((item) => item.nome.toLowerCase() === nome.toLowerCase());
      disciplinas.push(existente ?? await cadastrarDisciplina({ nome }));
    }

    try {
      await Promise.all(idsTurma.flatMap((idTurma) => disciplinas.map((disciplina) =>
        cadastrarVinculoProfessor({
          professor: { idProfessor: salvo.idProfessor },
          turma: { idTurma },
          disciplina: { idDisciplina: disciplina.idDisciplina },
        })
      )));
    } catch (erro) {
      throw new Error(`Professor cadastrado, mas não foi possível salvar os vínculos: ${erro.response?.data?.message || erro.message}`);
    }

    const novo = {
      ...salvo,
      id: `P-${salvo.idProfessor}`,
      matricula: String(salvo.idProfessor),
      nomeCompleto: salvo.nome,
      turmas: turmas.filter((turma) => idsTurma.includes(turma.idTurma)),
      turmasIds: idsTurma.map(String),
      disciplinas: nomesDisciplinas.join(', '),
      status: 'Ativo',
    };
    setProfessores((prev) => [novo, ...prev]);
    return novo;
  }, [turmas]);

  const addResponsavel = useCallback(async (dados) => {
    const aluno = alunos.find((item) => item.nomeCompleto.toLowerCase() === dados.alunoVinculado.trim().toLowerCase());
    if (!aluno) throw new Error('Selecione um aluno existente para criar o vínculo.');

    const salvo = await cadastrarResponsavel({
      nome: dados.nomeCompleto.trim(),
      cpf: dados.cpf.replace(/\D/g, '') || null,
      email: dados.email || null,
      telefone: dados.telefone || null,
    });
    await cadastrarVinculoAlunoResponsavel({
      parentesco: dados.parentesco,
      aluno: { matricula: Number(aluno.matricula) },
      responsavel: { idResponsavel: salvo.idResponsavel },
    });
    const novo = {
      ...salvo,
      id: `R-${salvo.idResponsavel}`,
      matricula: String(salvo.idResponsavel),
      nomeCompleto: salvo.nome,
      parentesco: dados.parentesco,
      alunoVinculado: aluno.nomeCompleto,
      status: 'Ativo',
    };
    setResponsaveis((prev) => [novo, ...prev]);
    return novo;
  }, [alunos]);

  const addFuncionario = useCallback(async (dados) => {
    const payload = {
      nome: dados.nomeCompleto.trim(),
      email: dados.email || null,
      telefone: dados.telefone || null,
    };
    const cargo = dados.cargo.toLowerCase();
    const [recurso, salvo] = cargo === 'diretor(a)' || cargo === 'diretor'
      ? ['Diretor(a)', await cadastrarDiretor(payload)]
      : cargo.includes('coordenador')
        ? ['Coordenador(a)', await cadastrarCoordenador(payload)]
        : cargo.includes('secretário') || cargo.includes('secretario')
          ? ['Secretário(a) escolar', await cadastrarSecretario(payload)]
          : [null, null];
    if (!salvo) throw new Error('Esse cargo ainda não possui cadastro no backend.');
    const novo = { ...salvo, id: `${recurso}-${salvo.id}`, matricula: String(salvo.id), nomeCompleto: salvo.nome, cargo: recurso, status: 'Ativo' };
    setFuncionarios((prev) => [novo, ...prev]);
    return novo;
  }, []);

  const value = useMemo(
    () => ({ alunos, professores, responsaveis, funcionarios, turmas, loading, error, addAluno, addProfessor, addResponsavel, addFuncionario }),
    [alunos, professores, responsaveis, funcionarios, turmas, loading, error, addAluno, addProfessor, addResponsavel, addFuncionario]
  );

  return <CadastrosContext.Provider value={value}>{children}</CadastrosContext.Provider>;
}

export function useCadastros() {
  const ctx = useContext(CadastrosContext);
  if (!ctx) throw new Error('useCadastros deve ser usado dentro de <CadastrosProvider>');
  return ctx;
}

export function resumoAluno(a) {
  const nome = a.nomeCompleto || a.nome || '';
  return {
    id: nome.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase(),
    name: nome,
    code: String(a.matricula ?? '—'),
    etapa: a.turma?.anoSerie ?? '—',
    turma: a.turma?.nome ?? '—',
    status: a.status,
  };
}

export function resumoProfessor(p) {
  const nome = p.nomeCompleto || p.nome || '';
  const turmasNomes = p.turmas?.map((turma) => turma.nome).filter(Boolean)
    ?? [];
  return {
    id: nome.split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase(),
    name: nome,
    code: p.matricula,
    etapa: p.areaAtuacao || '—',
    turma: turmasNomes.length ? `${turmasNomes.length} turma(s)` : '—',
    status: p.status,
  };
}

export function resumoResponsavel(r) {
  const nome = r.nomeCompleto || r.nome || '';
  return {
    id: nome.split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase(),
    name: nome,
    code: r.matricula,
    etapa: r.parentesco || '—',
    turma: r.alunoVinculado || '—',
    status: r.status,
  };
}

export function resumoFuncionario(f) {
  const nome = f.nomeCompleto || f.nome || '';
  return {
    id: nome.split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase(),
    name: nome,
    code: f.matricula,
    etapa: f.cargo || '—',
    turma: '—',
    status: f.status,
  };
}