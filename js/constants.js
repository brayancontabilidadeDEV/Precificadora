// ==================== CONSTANTES E CONFIGURAÇÕES ====================

const CENARIOS_IVA = {
    pessimista: {
        nome: 'Pessimista',
        aliquota: 28.0,
        cbs: 11.2,
        ibs: 16.8,
        descricao: 'Cenário de compensação de perdas fiscais'
    },
    base: {
        nome: 'Base (Referência)',
        aliquota: 26.5,
        cbs: 10.6,
        ibs: 15.9,
        descricao: 'Estimativa técnica mais provável'
    },
    otimista: {
        nome: 'Otimista',
        aliquota: 25.0,
        cbs: 10.0,
        ibs: 15.0,
        descricao: 'Cenário de eficiência máxima'
    }
};

// Dados CORRIGIDOS para estados
const INFO_ESTADOS_CORRIGIDO = {
    'SC': { 
        icms: 17.0,
        iss: 5.0,
        beneficios: ['SIMPLES Catarinense', 'Incentivos TI', 'Polo Tecnológico'],
        beneficiosDesconto: 0.10, // 10% de desconto em benefícios estaduais
        score: 8.5,
        descricao: 'Menor ICMS do país, excelente para tecnologia e inovação'
    },
    'RS': { 
        icms: 17.0,
        iss: 5.0,
        beneficios: ['Polo Tecnológico', 'Incentivos Exportação', 'RS Tech'],
        beneficiosDesconto: 0.08,
        score: 8.2,
        descricao: 'ICMS competitivo, forte em exportação e tecnologia'
    },
    'PR': { 
        icms: 18.0,
        iss: 5.0,
        beneficios: ['ICMS 0 para software', 'REDESUL', 'Paraná Competitivo'],
        beneficiosDesconto: 0.12,
        score: 8.7,
        descricao: 'Incentivos robustos para software, posição geográfica estratégica'
    },
    'SP': { 
        icms: 18.0,
        iss: 5.0,
        beneficios: ['Simples Paulista', 'Desconto ICMS', 'Polo Industrial'],
        beneficiosDesconto: 0.05,
        score: 8.0,
        descricao: 'Maior mercado consumidor, melhor infraestrutura, mas custos elevados'
    },
    'MG': { 
        icms: 18.0,
        iss: 5.0,
        beneficios: ['MINAS FÁCIL', 'Incentivos Industriais', 'MG Digital'],
        beneficiosDesconto: 0.07,
        score: 7.8,
        descricao: 'Posição central, incentivos industriais, custos moderados'
    },
    'RJ': { 
        icms: 20.0,
        iss: 5.0,
        beneficios: ['Porto do Rio', 'Cidade Olímpica'],
        beneficiosDesconto: 0.03,
        score: 7.2,
        descricao: 'Mercado relevante mas com maior carga tributária'
    },
    'BA': { 
        icms: 18.0,
        iss: 5.0,
        beneficios: ['PRODEB', 'Incentivos Nordeste', 'BA Inovação'],
        beneficiosDesconto: 0.09,
        score: 7.5,
        descricao: 'Incentivos federais para Nordeste, custos operacionais baixos'
    },
    'DF': { 
        icms: 18.0,
        iss: 5.0,
        beneficios: ['Capital Federal'],
        beneficiosDesconto: 0.02,
        score: 7.0,
        descricao: 'Acesso a órgãos federais, mercado restrito'
    }
};

// Dados para comparação internacional
const COMPARACAO_INTERNACIONAL = {
    'brasil-atual': {
        nome: 'Brasil (Atual)',
        cargaTotal: 34.0,
        ivaVat: 0,
        complexidade: 9.5,
        horasAno: 1501,
        numTributos: 92,
        rankingDoingBusiness: 124,
        descricao: 'Sistema mais complexo do mundo, múltiplos impostos cumulativos'
    },
    'brasil-pos-reforma': {
        nome: 'Brasil (Pós-Reforma)',
        cargaTotal: 26.5,
        ivaVat: 26.5,
        complexidade: 6.0,
        horasAno: 800,
        numTributos: 3,
        rankingDoingBusiness: 80,
        descricao: 'IVA Dual, menos cumulatividade, mais simples'
    },
    'chile': {
        nome: 'Chile',
        cargaTotal: 20.2,
        ivaVat: 19.0,
        complexidade: 5.0,
        horasAno: 320,
        numTributos: 7,
        rankingDoingBusiness: 59,
        descricao: 'IVA único, sistema simples e previsível'
    },
    'mexico': {
        nome: 'México',
        cargaTotal: 16.1,
        ivaVat: 16.0,
        complexidade: 6.5,
        horasAno: 240,
        numTributos: 9,
        rankingDoingBusiness: 60,
        descricao: 'IVA federal, sistema relativamente simples'
    },
    'argentina': {
        nome: 'Argentina',
        cargaTotal: 29.0,
        ivaVat: 21.0,
        complexidade: 8.0,
        horasAno: 311,
        numTributos: 9,
        rankingDoingBusiness: 126,
        descricao: 'IVA alto, sistema complexo com muitas alíquotas'
    },
    'uruguai': {
        nome: 'Uruguai',
        cargaTotal: 26.8,
        ivaVat: 22.0,
        complexidade: 6.0,
        horasAno: 304,
        numTributos: 8,
        rankingDoingBusiness: 101,
        descricao: 'IVA alto, sistema mais simples que o Brasil atual'
    },
    'paraguai': {
        nome: 'Paraguai',
        cargaTotal: 14.0,
        ivaVat: 10.0,
        complexidade: 4.5,
        horasAno: 248,
        numTributos: 6,
        rankingDoingBusiness: 125,
        descricao: 'IVA mais baixo da América Latina, sistema simples'
    },
    'colombia': {
        nome: 'Colômbia',
        cargaTotal: 19.5,
        ivaVat: 19.0,
        complexidade: 6.0,
        horasAno: 317,
        numTributos: 11,
        rankingDoingBusiness: 67,
        descricao: 'IVA moderado, sistema em reforma constante'
    },
    'eua': {
        nome: 'Estados Unidos',
        cargaTotal: 27.1,
        ivaVat: 0,
        complexidade: 8.0,
        horasAno: 175,
        numTributos: 10,
        rankingDoingBusiness: 6,
        descricao: 'Sem IVA federal, sales tax por estado, sistema complexo mas eficiente'
    },
    'alemanha': {
        nome: 'Alemanha',
        cargaTotal: 39.3,
        ivaVat: 19.0,
        complexidade: 7.0,
        horasAno: 218,
        numTributos: 5,
        rankingDoingBusiness: 22,
        descricao: 'Alta carga tributária mas sistema eficiente e simplificado'
    }
};

// Custos de implantação detalhados
const CUSTOS_IMPLANTACAO_DETALHADO = {
    'micro': {
        descricao: 'Microempresa (Até R$ 360 mil/ano)',
        custos: {
            consultoria: { minimo: 3000, medio: 5000, maximo: 8000 },
            software: { minimo: 1500, medio: 2500, maximo: 4000 },
            treinamento: { minimo: 1000, medio: 2000, maximo: 3000 },
            documentacao: { minimo: 500, medio: 1000, maximo: 1500 },
            totalMinimo: 6000,
            totalMedio: 10500,
            totalMaximo: 16500
        }
    },
    'pequena': {
        descricao: 'Pequena Empresa (R$ 360k - R$ 4,8 mi/ano)',
        custos: {
            consultoria: { minimo: 8000, medio: 15000, maximo: 25000 },
            software: { minimo: 3000, medio: 5000, maximo: 8000 },
            treinamento: { minimo: 2000, medio: 4000, maximo: 6000 },
            documentacao: { minimo: 1000, medio: 2000, maximo: 3000 },
            totalMinimo: 14000,
            totalMedio: 26000,
            totalMaximo: 42000
        }
    },
    'media': {
        descricao: 'Média Empresa (R$ 4,8 mi - R$ 50 mi/ano)',
        custos: {
            consultoria: { minimo: 25000, medio: 40000, maximo: 60000 },
            software: { minimo: 8000, medio: 15000, maximo: 25000 },
            treinamento: { minimo: 5000, medio: 8000, maximo: 12000 },
            documentacao: { minimo: 2000, medio: 4000, maximo: 6000 },
            totalMinimo: 40000,
            totalMedio: 67000,
            totalMaximo: 103000
        }
    },
    'grande': {
        descricao: 'Grande Empresa (Acima de R$ 50 mi/ano)',
        custos: {
            consultoria: { minimo: 60000, medio: 100000, maximo: 200000 },
            software: { minimo: 25000, medio: 50000, maximo: 100000 },
            treinamento: { minimo: 10000, medio: 20000, maximo: 40000 },
            documentacao: { minimo: 5000, medio: 10000, maximo: 20000 },
            totalMinimo: 100000,
            totalMedio: 180000,
            totalMaximo: 360000
        }
    }
};

const MARGEM_PRESUMIDA = {
    'comercio': 8,
    'industria': 8,
    'servicos-gerais': 32,
    'servicos-tecnologia': 32,
    'servicos-engenharia': 16,
    'servicos-advocacia': 32,
    'energia': 8,
    'telecom': 8
};

const LIMITE_CREDITO_SERVICOS = 0.7;

const CATEGORIAS_ALIQUOTA = {
    zero: { 
        nome: 'Alíquota Zero', 
        fator: 0.0,
        descricao: 'Cesta básica nacional (arroz, feijão, leite, etc.)'
    },
    reduzida60: { 
        nome: 'Reduzida 60%', 
        fator: 0.4,
        descricao: 'Serviços de saúde, educação, transporte público'
    },
    reduzida30: { 
        nome: 'Reduzida 30%', 
        fator: 0.7,
        descricao: 'Alimentos processados, produtos de higiene pessoal'
    },
    padrao: { 
        nome: 'Padrão', 
        fator: 1.0,
        descricao: 'Maioria dos produtos e serviços (alíquota cheia)'
    },
    seletivo: { 
        nome: 'Imposto Seletivo', 
        fator: 1.0,
        impostoSeletivo: 0.25,
        descricao: 'Bebidas alcoólicas, cigarros, armas (adicional de 25%)'
    }
};

const TRANSICAO_DETALHADA = {
    2026: { cbs: 0.001, ibs: 0.001, sistemaAntigo: 0.998, descricao: 'Fase experimental' },
    2027: { cbs: 1.0, ibs: 0.001, sistemaAntigo: 0, descricao: 'CBS substitui PIS/COFINS' },
    2028: { cbs: 1.0, ibs: 0.001, sistemaAntigo: 0, descricao: 'Consolidação do CBS' },
    2029: { cbs: 1.0, ibs: 0.1, sistemaAntigo: 0, descricao: 'IBS inicia substituição' },
    2030: { cbs: 1.0, ibs: 0.3, sistemaAntigo: 0, descricao: 'IBS a 30%' },
    2031: { cbs: 1.0, ibs: 0.6, sistemaAntigo: 0, descricao: 'IBS a 60%' },
    2032: { cbs: 1.0, ibs: 0.9, sistemaAntigo: 0, descricao: 'IBS a 90%' },
    2033: { cbs: 1.0, ibs: 1.0, sistemaAntigo: 0, descricao: 'Sistema completo' }
};

const SIMPLES_ALIQUOTAS = {
    comercio: [
        { limite: 180000, aliquota: 4.0, deducao: 0 },
        { limite: 360000, aliquota: 7.3, deducao: 5940 },
        { limite: 720000, aliquota: 9.5, deducao: 13860 },
        { limite: 1800000, aliquota: 10.7, deducao: 22500 },
        { limite: 3600000, aliquota: 14.3, deducao: 87300 },
        { limite: 4800000, aliquota: 19.0, deducao: 378000 }
    ],
    industria: [
        { limite: 180000, aliquota: 4.5, deducao: 0 },
        { limite: 360000, aliquota: 7.8, deducao: 5940 },
        { limite: 720000, aliquota: 10.0, deducao: 13860 },
        { limite: 1800000, aliquota: 11.2, deducao: 22500 },
        { limite: 3600000, aliquota: 14.7, deducao: 85500 },
        { limite: 4800000, aliquota: 30.0, deducao: 720000 }
    ],
    'servicos-gerais': [
        { limite: 180000, aliquota: 6.0, deducao: 0 },
        { limite: 360000, aliquota: 11.2, deducao: 9360 },
        { limite: 720000, aliquota: 13.5, deducao: 17640 },
        { limite: 1800000, aliquota: 16.0, deducao: 35640 },
        { limite: 3600000, aliquota: 21.0, deducao: 125640 },
        { limite: 4800000, aliquota: 33.0, deducao: 648000 }
    ],
    'servicos-tecnologia': [
        { limite: 180000, aliquota: 6.0, deducao: 0 },
        { limite: 360000, aliquota: 11.2, deducao: 9360 },
        { limite: 720000, aliquota: 13.5, deducao: 17640 },
        { limite: 1800000, aliquota: 16.0, deducao: 35640 },
        { limite: 3600000, aliquota: 21.0, deducao: 125640 },
        { limite: 4800000, aliquota: 33.0, deducao: 648000 }
    ],
    'servicos-engenharia': [
        { limite: 180000, aliquota: 6.0, deducao: 0 },
        { limite: 360000, aliquota: 11.2, deducao: 9360 },
        { limite: 720000, aliquota: 13.5, deducao: 17640 },
        { limite: 1800000, aliquota: 16.0, deducao: 35640 },
        { limite: 3600000, aliquota: 21.0, deducao: 125640 },
        { limite: 4800000, aliquota: 33.0, deducao: 648000 }
    ],
    'servicos-advocacia': [
        { limite: 180000, aliquota: 15.5, deducao: 0 },
        { limite: 360000, aliquota: 18.0, deducao: 4500 },
        { limite: 720000, aliquota: 19.5, deducao: 9900 },
        { limite: 1800000, aliquota: 20.5, deducao: 17100 },
        { limite: 3600000, aliquota: 23.0, deducao: 62100 },
        { limite: 4800000, aliquota: 30.5, deducao: 540000 }
    ],
    'energia': [
        { limite: 180000, aliquota: 4.0, deducao: 0 },
        { limite: 360000, aliquota: 7.3, deducao: 5940 },
        { limite: 720000, aliquota: 9.5, deducao: 13860 },
        { limite: 1800000, aliquota: 10.7, deducao: 22500 },
        { limite: 3600000, aliquota: 14.3, deducao: 87300 },
        { limite: 4800000, aliquota: 19.0, deducao: 378000 }
    ],
    'telecom': [
        { limite: 180000, aliquota: 4.0, deducao: 0 },
        { limite: 360000, aliquota: 7.3, deducao: 5940 },
        { limite: 720000, aliquota: 9.5, deducao: 13860 },
        { limite: 1800000, aliquota: 10.7, deducao: 22500 },
        { limite: 3600000, aliquota: 14.3, deducao: 87300 },
        { limite: 4800000, aliquota: 19.0, deducao: 378000 }
    ]
};
