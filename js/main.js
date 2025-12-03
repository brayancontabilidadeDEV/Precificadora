// ==================== NOVAS FUNÇÕES PARA COMPARATIVO INTERNACIONAL ====================

function gerarAnaliseInternacional(dados, sistemaAtual, tributoReforma) {
    const cargaAtual = (sistemaAtual.total / dados.faturamento) * 100;
    const cargaReforma = (tributoReforma / dados.faturamento) * 100;
    
    let html = `
        <div class="card-header">
            <h3 class="text-2xl font-bold flex items-center gap-3">
                <i class="fas fa-globe-americas text-indigo-600"></i>
                Comparativo Internacional de Carga Tributária
            </h3>
        </div>
        
        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Posicionamento Global do Brasil</h3>
            <p class="text-gray-600 mb-6">
                Compare a carga tributária brasileira (atual e pós-reforma) com outros países.
                Dados em % do PIB em tributos sobre empresas.
            </p>
        </div>
        
        <div class="chart-container">
            <canvas id="chartInternacional"></canvas>
        </div>
        
        <div class="mt-8 grid md:grid-cols-3 gap-6">
    `;
    
    // Países mais relevantes para comparação
    const paisesRelevantes = [
        'brasil-atual',
        'brasil-pos-reforma', 
        'chile',
        'argentina',
        'paraguai',
        'alemanha'
    ];
    
    paisesRelevantes.forEach(paisKey => {
        const pais = COMPARACAO_INTERNACIONAL[paisKey];
        const diferenca = pais.cargaTotal - cargaReforma;
        
        html += `
            <div class="card ${paisKey.includes('brasil') ? 'border-2 border-indigo-500' : ''}">
                <div class="text-center">
                    <div class="text-sm font-semibold text-gray-700 mb-2">${pais.nome}</div>
                    <div class="text-3xl font-bold ${pais.cargaTotal < cargaReforma ? 'text-green-600' : 'text-red-600'} mb-2">
                        ${pais.cargaTotal}%
                    </div>
                    <div class="text-sm text-gray-600 mb-3">Carga Tributária Total</div>
                    
                    <div class="space-y-2 text-left">
                        <div class="flex justify-between">
                            <span class="text-gray-600 text-sm">IVA/VAT:</span>
                            <span class="font-medium">${pais.ivaVat > 0 ? pais.ivaVat + '%' : 'Não tem'}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600 text-sm">Complexidade:</span>
                            <span class="font-medium">${pais.complexidade}/10</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600 text-sm">Horas/ano:</span>
                            <span class="font-medium">${pais.horasAno}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600 text-sm">Ranking DB:</span>
                            <span class="font-medium">${pais.rankingDoingBusiness}º</span>
                        </div>
                    </div>
                    
                    <div class="mt-4 p-3 bg-gray-50 rounded-lg">
                        <div class="text-sm ${diferenca < 0 ? 'text-green-600' : 'text-red-600'} font-medium">
                            ${diferenca < 0 ? 'Melhor que Brasil pós-reforma' : 'Pior que Brasil pós-reforma'}
                            ${diferenca !== 0 ? `(${Math.abs(diferenca).toFixed(1)}%)` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
        </div>
        
        <div class="mt-8 card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <h4 class="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <i class="fas fa-chart-line text-blue-600"></i>
                Análise Comparativa por Brayan Araujo Contador
            </h4>
            
            <div class="space-y-3 text-sm">
                <p><strong>Conclusões Importantes:</strong></p>
                <ul class="list-disc pl-5 space-y-1">
                    <li>O Brasil atual tem o sistema tributário mais complexo do mundo (9.5/10)</li>
                    <li>Após a reforma, cairemos para complexidade média (6.0/10)</li>
                    <li>A carga tributária brasileira (${cargaReforma.toFixed(1)}%) será maior que a média latino-americana (18-22%)</li>
                    <li>Países como Paraguai (10% IVA) e Chile (19% IVA) serão mais competitivos</li>
                    <li>A reforma reduzirá de 1.501 para ~800 horas/ano de compliance tributário</li>
                </ul>
                <p class="mt-3"><strong>Recomendação Estratégica:</strong> Mesmo com a reforma, empresas brasileiras ainda terão desvantagem competitiva frente a concorrentes de outros países da região. Considere estratégias de eficiência tributária adicional.</p>
            </div>
        </div>
    `;
    
    return html;
}

// ==================== FUNÇÕES PARA DETALHAMENTO DE CUSTOS ====================

function gerarDetalhamentoCustosImplantacao(dados) {
    const faturamentoAnual = dados.faturamento * 12;
    let porte = 'micro';
    
    if (faturamentoAnual <= 360000) {
        porte = 'micro';
    } else if (faturamentoAnual <= 4800000) {
        porte = 'pequena';
    } else if (faturamentoAnual <= 50000000) {
        porte = 'media';
    } else {
        porte = 'grande';
    }
    
    const custosPorte = CUSTOS_IMPLANTACAO_DETALHADO[porte];
    
    // Calcular economia esperada
    const sistemaAtual = calcularSistemaAtualCorrigido(dados);
    const reforma = calcularIVADual(dados);
    const economiaMensal = sistemaAtual.total - reforma.ivaLiquido;
    const economiaAnual = economiaMensal * 12;
    
    // Calcular ROI
    const custoMedio = custosPorte.custos.totalMedio;
    const mesesPayback = custoMedio / economiaMensal;
    const roiAnual = (economiaAnual / custoMedio) * 100;
    
    let html = `
        <div class="card-header">
            <h3 class="text-2xl font-bold flex items-center gap-3">
                <i class="fas fa-calculator text-purple-600"></i>
                Detalhamento de Custos para Implantação da Melhoria Tributária
            </h3>
            <p class="text-gray-600 mt-2 text-sm">
                Análise completa de investimento necessário para adaptação à reforma tributária
            </p>
        </div>
        
        <div class="space-y-8">
            <div class="grid md:grid-cols-4 gap-6">
                <div class="card text-center">
                    <div class="text-sm text-gray-600 mb-2">Porte da Empresa</div>
                    <div class="text-2xl font-bold text-indigo-600">${custosPorte.descricao}</div>
                    <div class="text-sm text-gray-500 mt-2">Faturamento anual: ${formatarMoeda(faturamentoAnual)}</div>
                </div>
                
                <div class="card text-center">
                    <div class="text-sm text-gray-600 mb-2">Custo Total Médio</div>
                    <div class="text-2xl font-bold text-purple-600">${formatarMoeda(custoMedio)}</div>
                    <div class="text-sm text-gray-500 mt-2">
                        Min: ${formatarMoeda(custosPorte.custos.totalMinimo)} | 
                        Max: ${formatarMoeda(custosPorte.custos.totalMaximo)}
                    </div>
                </div>
                
                <div class="card text-center">
                    <div class="text-sm text-gray-600 mb-2">Payback Estimado</div>
                    <div class="text-2xl font-bold ${mesesPayback <= 12 ? 'text-green-600' : 'text-yellow-600'}">
                        ${mesesPayback.toFixed(1)} meses
                    </div>
                    <div class="text-sm text-gray-500 mt-2">Tempo para retorno do investimento</div>
                </div>
                
                <div class="card text-center">
                    <div class="text-sm text-gray-600 mb-2">ROI Anual</div>
                    <div class="text-2xl font-bold ${roiAnual > 100 ? 'text-green-600' : roiAnual > 50 ? 'text-yellow-600' : 'text-red-600'}">
                        ${roiAnual.toFixed(0)}%
                    </div>
                    <div class="text-sm text-gray-500 mt-2">Retorno sobre o investimento</div>
                </div>
            </div>
            
            <!-- Detalhamento dos Custos -->
            <div>
                <h4 class="text-lg font-semibold mb-4 flex items-center gap-2">
                    <i class="fas fa-list-alt text-blue-600"></i>
                    Composição Detalhada dos Custos
                </h4>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="card">
                        <div class="text-center">
                            <div class="text-sm text-gray-600 mb-2">Consultoria Especializada</div>
                            <div class="text-2xl font-bold text-blue-600 mb-2">
                                ${formatarMoeda(custosPorte.custos.consultoria.medio)}
                            </div>
                            <div class="text-xs text-gray-500 mb-4">
                                Planejamento e implementação
                            </div>
                            <div class="space-y-1">
                                <div class="flex justify-between text-sm">
                                    <span>Análise inicial:</span>
                                    <span>${formatarMoeda(custosPorte.custos.consultoria.medio * 0.3)}</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span>Planejamento:</span>
                                    <span>${formatarMoeda(custosPorte.custos.consultoria.medio * 0.4)}</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span>Acompanhamento:</span>
                                    <span>${formatarMoeda(custosPorte.custos.consultoria.medio * 0.3)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="text-center">
                            <div class="text-sm text-gray-600 mb-2">Software/ERP</div>
                            <div class="text-2xl font-bold text-green-600 mb-2">
                                ${formatarMoeda(custosPorte.custos.software.medio)}
                            </div>
                            <div class="text-xs text-gray-500 mb-4">
                                Sistema compatível com IVA Dual
                            </div>
                            <div class="space-y-1">
                                <div class="flex justify-between text-sm">
                                    <span>Licença anual:</span>
                                    <span>${formatarMoeda(custosPorte.custos.software.medio * 0.7)}</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span>Implantação:</span>
                                    <span>${formatarMoeda(custosPorte.custos.software.medio * 0.3)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="text-center">
                            <div class="text-sm text-gray-600 mb-2">Treinamento da Equipe</div>
                            <div class="text-2xl font-bold text-yellow-600 mb-2">
                                ${formatarMoeda(custosPorte.custos.treinamento.medio)}
                            </div>
                            <div class="text-xs text-gray-500 mb-4">
                                Capacitação para nova tributação
                            </div>
                            <div class="space-y-1">
                                <div class="flex justify-between text-sm">
                                    <span>Gestores:</span>
                                    <span>${formatarMoeda(custosPorte.custos.treinamento.medio * 0.4)}</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span>Operacional:</span>
                                    <span>${formatarMoeda(custosPorte.custos.treinamento.medio * 0.6)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="text-center">
                            <div class="text-sm text-gray-600 mb-2">Documentação/Regulamentos</div>
                            <div class="text-2xl font-bold text-red-600 mb-2">
                                ${formatarMoeda(custosPorte.custos.documentacao.medio)}
                            </div>
                            <div class="text-xs text-gray-500 mb-4">
                                Adequação de processos e documentos
                            </div>
                            <div class="space-y-1">
                                <div class="flex justify-between text-sm">
                                    <span>Manuais:</span>
                                    <span>${formatarMoeda(custosPorte.custos.documentacao.medio * 0.5)}</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span>Certificações:</span>
                                    <span>${formatarMoeda(custosPorte.custos.documentacao.medio * 0.5)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Timeline de Implantação -->
            <div>
                <h4 class="text-lg font-semibold mb-4 flex items-center gap-2">
                    <i class="fas fa-calendar-alt text-indigo-600"></i>
                    Timeline de Implantação (6 meses)
                </h4>
                
                <div class="implementation-timeline">
                    <div class="timeline-phase phase-1">
                        <div class="flex justify-between items-start mb-3">
                            <h5 class="font-bold text-lg">Mês 1-2: Diagnóstico e Planejamento</h5>
                            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">${formatarMoeda(custoMedio * 0.3)}</span>
                        </div>
                        <ul class="list-disc pl-5 space-y-2 text-sm text-gray-700">
                            <li>Análise completa da situação atual</li>
                            <li>Mapeamento de processos tributários</li>
                            <li>Planejamento estratégico de adaptação</li>
                            <li>Seleção de fornecedores (software/consultoria)</li>
                        </ul>
                    </div>
                    
                    <div class="timeline-phase phase-2">
                        <div class="flex justify-between items-start mb-3">
                            <h5 class="font-bold text-lg">Mês 3-4: Implementação Técnica</h5>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">${formatarMoeda(custoMedio * 0.4)}</span>
                        </div>
                        <ul class="list-disc pl-5 space-y-2 text-sm text-gray-700">
                            <li>Implantação do sistema ERP/software</li>
                            <li>Configuração de parâmetros tributários</li>
                            <li>Adequação de processos contábeis</li>
                            <li>Integração com sistemas existentes</li>
                        </ul>
                    </div>
                    
                    <div class="timeline-phase phase-3">
                        <div class="flex justify-between items-start mb-3">
                            <h5 class="font-bold text-lg">Mês 5: Capacitação e Treinamento</h5>
                            <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">${formatarMoeda(custoMedio * 0.2)}</span>
                        </div>
                        <ul class="list-disc pl-5 space-y-2 text-sm text-gray-700">
                            <li>Treinamento da equipe contábil</li>
                            <li>Capacitação de gestores</li>
                            <li>Workshops setoriais</li>
                            <li>Elaboração de manuais e procedimentos</li>
                        </ul>
                    </div>
                    
                    <div class="timeline-phase phase-4">
                        <div class="flex justify-between items-start mb-3">
                            <h5 class="font-bold text-lg">Mês 6: Testes e Ajustes Finais</h5>
                            <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">${formatarMoeda(custoMedio * 0.1)}</span>
                        </div>
                        <ul class="list-disc pl-5 space-y-2 text-sm text-gray-700">
                            <li>Testes de validação do sistema</li>
                            <li>Ajustes finais nos processos</li>
                            <li>Auditoria de conformidade</li>
                            <li>Plano de contingência</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- Análise de Retorno Financeiro -->
            <div class="card bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <h4 class="font-bold text-green-900 mb-4 flex items-center gap-2">
                    <i class="fas fa-chart-line text-green-600"></i>
                    Análise de Retorno Financeiro (ROI)
                </h4>
                
                <div class="grid md:grid-cols-3 gap-6">
                    <div class="text-center">
                        <div class="text-sm text-gray-600 mb-2">Economia Anual Estimada</div>
                        <div class="text-3xl font-bold text-green-600">
                            ${formatarMoeda(economiaAnual)}
                        </div>
                        <div class="text-xs text-gray-500 mt-1">
                            ${formatarMoeda(economiaMensal)}/mês
                        </div>
                    </div>
                    
                    <div class="text-center">
                        <div class="text-sm text-gray-600 mb-2">Investimento Total</div>
                        <div class="text-3xl font-bold text-purple-600">
                            ${formatarMoeda(custoMedio)}
                        </div>
                        <div class="text-xs text-gray-500 mt-1">
                            Pago em ${mesesPayback.toFixed(1)} meses
                        </div>
                    </div>
                    
                    <div class="text-center">
                        <div class="text-sm text-gray-600 mb-2">ROI em 3 Anos</div>
                        <div class="text-3xl font-bold ${(roiAnual * 3) > 100 ? 'text-green-600' : 'text-yellow-600'}">
                            ${(roiAnual * 3).toFixed(0)}%
                        </div>
                        <div class="text-xs text-gray-500 mt-1">
                            Retorno sobre investimento
                        </div>
                    </div>
                </div>
                
                <div class="mt-6">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium text-gray-700">Payback Progressivo</span>
                        <span class="text-sm font-bold ${mesesPayback <= 12 ? 'text-green-600' : 'text-yellow-600'}">
                            ${mesesPayback <= 12 ? 'RETORNO RÁPIDO' : 'RETORNO MODERADO'}
                        </span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div class="bg-green-600 h-3 rounded-full" style="width: ${Math.min(100, (economiaMensal * 6) / custoMedio * 100)}%"></div>
                    </div>
                    <div class="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Mês 6: ${formatarMoeda(economiaMensal * 6)}</span>
                        <span>Investimento: ${formatarMoeda(custoMedio)}</span>
                    </div>
                </div>
            </div>
            
            <!-- Recomendações de Brayan Araujo Contador -->
            <div class="card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <h4 class="font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <i class="fas fa-user-tie text-blue-600"></i>
                    Recomendações Específicas por Brayan Araujo Contador
                </h4>
                
                <div class="space-y-4">
                    <div class="flex items-start gap-3">
                        <div class="bg-blue-100 p-2 rounded-lg">
                            <i class="fas fa-lightbulb text-blue-600"></i>
                        </div>
                        <div>
                            <h5 class="font-semibold text-blue-800">Estratégia de Implementação</h5>
                            <p class="text-sm text-gray-700 mt-1">
                                Baseado no seu faturamento de ${formatarMoeda(faturamentoAnual)}/ano, recomendo uma abordagem 
                                ${porte === 'micro' || porte === 'pequena' ? 'focada em eficiência de custos' : 'abrangente e estruturada'}.
                                O investimento de ${formatarMoeda(custoMedio)} tem ROI de ${roiAnual.toFixed(0)}% ao ano.
                            </p>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-3">
                        <div class="bg-green-100 p-2 rounded-lg">
                            <i class="fas fa-check-circle text-green-600"></i>
                        </div>
                        <div>
                            <h5 class="font-semibold text-green-800">Oportunidades Identificadas</h5>
                            <ul class="list-disc pl-5 mt-1 space-y-1 text-sm text-gray-700">
                                <li>Economia tributária mensal de ${formatarMoeda(economiaMensal)}</li>
                                <li>Redução de ${((sistemaAtual.total - reforma.ivaLiquido) / sistemaAtual.total * 100).toFixed(1)}% na carga tributária</li>
                                <li>Payback em ${mesesPayback.toFixed(1)} meses</li>
                                <li>Vantagem competitiva com sistemas atualizados</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-3">
                        <div class="bg-yellow-100 p-2 rounded-lg">
                            <i class="fas fa-exclamation-triangle text-yellow-600"></i>
                        </div>
                        <div>
                            <h5 class="font-semibold text-yellow-800">Riscos e Mitigações</h5>
                            <ul class="list-disc pl-5 mt-1 space-y-1 text-sm text-gray-700">
                                <li>Regulamentação em mudança → Monitoramento constante</li>
                                <li>Curva de aprendizado → Treinamento adequado da equipe</li>
                                <li>Investimento inicial → Estratégia de financiamento</li>
                                <li>Integração de sistemas → Escolha de fornecedores qualificados</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="p-4 bg-white rounded-lg border mt-4">
                        <div class="text-center">
                            <p class="font-semibold text-gray-800">Interessado em um plano personalizado?</p>
                            <p class="text-sm text-gray-600 mt-1">Entre em contato para uma consultoria detalhada</p>
                            <button onclick="abrirContatoConsultoria()" class="btn-primary mt-3 px-6 py-2 rounded-full">
                                <i class="fas fa-calendar-check mr-2"></i>Agendar Consultoria
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return html;
}

// ==================== FUNÇÕES EXISTENTES ATUALIZADAS ====================

function selecionarCenario(cenario) {
    cenarioAtual = cenario;
    document.querySelectorAll('input[name="cenario"]').forEach(radio => {
        radio.checked = radio.value === cenario;
    });
    
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('border-2', 'border-blue-500');
    });
    
    if (document.getElementById(`cenario-${cenario}`)) {
        document.getElementById(`cenario-${cenario}`).closest('.card').classList.add('border-2', 'border-blue-500');
    }
    
    atualizarCalculos();
}

function selecionarAnoTransicao(ano) {
    document.getElementById('anoTransicao').value = ano;
    
    document.querySelectorAll('.progress-step').forEach(step => {
        step.classList.remove('active', 'completed');
        const stepYear = parseInt(step.getAttribute('data-year'));
        if (stepYear === ano) {
            step.classList.add('active');
        } else if (stepYear < ano) {
            step.classList.add('completed');
        }
    });
    
    const descricoes = {
        2026: 'Fase de testes com 0,1% de CBS e IBS. Sistema antigo mantido em 99,8%. Adaptação de sistemas em curso.',
        2027: 'CBS substitui totalmente PIS e COFINS (10,6%). IBS ainda em fase teste (0,1%). Fim da cumulatividade de PIS/COFINS.',
        2029: 'IBS inicia substituição gradual de ICMS e ISS (10%). Empresas já devem ter sistemas adaptados.',
        2033: 'Sistema completo. ICMS e ISS extintos. IVA Dual 100% implementado. Brasil com um dos IVAs mais altos do mundo.'
    };
    
    document.getElementById('progress-description').textContent = descricoes[ano] || '';
    atualizarCalculos();
}

function atualizarCalculos() {
    const dados = {
        faturamento: parseFloat(document.getElementById('faturamento').value) || 0,
        regime: document.getElementById('regime').value,
        setor: document.getElementById('setor').value,
        estado: document.getElementById('estado').value,
        percentualInsumos: parseFloat(document.getElementById('percentualInsumos').value) || 0,
        percentualAtivo: parseFloat(document.getElementById('percentualAtivo').value) || 0,
        folhaPagamento: parseFloat(document.getElementById('folhaPagamento').value) || 0,
        categoria: document.getElementById('categoria').value,
        anoTransicao: document.getElementById('anoTransicao').value
    };

    // Atualizar labels
    const faturamentoAnual = dados.faturamento * 12;
    document.getElementById('faturamentoAnual').textContent = 
        `Anual: ${formatarMoeda(faturamentoAnual)}`;
    
    document.getElementById('ano-atual-label').textContent = '2025';
    document.getElementById('ano-reforma-label').textContent = dados.anoTransicao;

    // Calcular sistema atual COM FUNÇÃO CORRIGIDA
    const sistemaAtual = calcularSistemaAtualCorrigido(dados);
    const liquidoAtual = dados.faturamento - sistemaAtual.total;
    const cargaAtual = (sistemaAtual.total / dados.faturamento) * 100;

    // Atualizar UI - Sistema Atual
    document.getElementById('fat-atual').textContent = formatarMoeda(dados.faturamento);
    document.getElementById('trib-atual-total').textContent = formatarMoeda(sistemaAtual.total);
    document.getElementById('liq-atual').textContent = formatarMoeda(liquidoAtual);
    document.getElementById('carga-atual').textContent = formatarPorcentagem(cargaAtual);

    // Detalhamento tributos atuais
    let detalhamentoHTML = '';
    if (sistemaAtual.erro) {
        detalhamentoHTML = `<div class="text-red-600 font-semibold p-3 bg-red-50 rounded-lg">⚠️ ${sistemaAtual.erro}</div>`;
    } else {
        sistemaAtual.detalhes.forEach(item => {
            detalhamentoHTML += `
                <div class="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                    <span class="text-gray-700">${item.nome}</span>
                    <span class="font-semibold">${formatarMoeda(item.valor)}</span>
                </div>
            `;
        });
    }
    document.getElementById('tributos-atual-detalhado').innerHTML = detalhamentoHTML;

    // Calcular reforma
    let tributoReformaFinal, cargaReforma, liquidoReforma;
    
    if (dados.anoTransicao === '2033') {
        const reforma = calcularIVADual(dados);
        tributoReformaFinal = reforma.ivaLiquido;
        
        // Atualizar UI - Reforma
        document.getElementById('cenario-aplicado').textContent = reforma.cenario;
        document.getElementById('aliquotaAplicada').textContent = formatarPorcentagem(reforma.aliquotaTotal);
        document.getElementById('cbs-valor').textContent = formatarMoeda(reforma.cbsBruto);
        document.getElementById('ibs-valor').textContent = formatarMoeda(reforma.ibsBruto);
        document.getElementById('trib-reforma-bruto').textContent = formatarMoeda(reforma.ivaBruto);
        document.getElementById('credito-insumos').textContent = formatarMoeda(reforma.creditoInsumos);
        document.getElementById('credito-ativo').textContent = formatarMoeda(reforma.creditoAtivoMensal);
        document.getElementById('credito-total').textContent = formatarMoeda(reforma.creditoTotal);
        document.getElementById('trib-liquido-reforma').textContent = formatarMoeda(reforma.ivaLiquido);
        
        // Imposto Seletivo
        if (reforma.impostoSeletivo > 0) {
            document.getElementById('is-linha').style.display = 'flex';
            document.getElementById('is-valor').textContent = formatarMoeda(reforma.impostoSeletivo);
        } else {
            document.getElementById('is-linha').style.display = 'none';
        }
    } else {
        const transicao = calcularTransicao(dados, dados.anoTransicao);
        tributoReformaFinal = transicao.tributoTotal;
        
        const reforma = calcularIVADual(dados);
        document.getElementById('cenario-aplicado').textContent = 
            `${reforma.cenario} (Transição ${(transicao.transicao.cbs * 100).toFixed(0)}% CBS / ${(transicao.transicao.ibs * 100).toFixed(0)}% IBS)`;
        document.getElementById('aliquotaAplicada').textContent = formatarPorcentagem(reforma.aliquotaTotal);
        document.getElementById('cbs-valor').textContent = formatarMoeda(transicao.cbsParcial);
        document.getElementById('ibs-valor').textContent = formatarMoeda(transicao.ibsParcial);
        document.getElementById('trib-reforma-bruto').textContent = 
            formatarMoeda(transicao.cbsParcial + transicao.ibsParcial + transicao.sistemaAntigoParcial);
        document.getElementById('credito-insumos').textContent = formatarMoeda(reforma.creditoInsumos * transicao.transicao.ibs);
        document.getElementById('credito-ativo').textContent = formatarMoeda(reforma.creditoAtivoMensal * transicao.transicao.ibs);
        document.getElementById('credito-total').textContent = formatarMoeda(transicao.creditoParcial);
        document.getElementById('trib-liquido-reforma').textContent = formatarMoeda(transicao.tributoTotal);
        document.getElementById('is-linha').style.display = 'none';
    }
    
    liquidoReforma = dados.faturamento - tributoReformaFinal;
    cargaReforma = (tributoReformaFinal / dados.faturamento) * 100;
    
    document.getElementById('fat-reforma').textContent = formatarMoeda(dados.faturamento);
    document.getElementById('liq-reforma').textContent = formatarMoeda(liquidoReforma);
    document.getElementById('carga-reforma').textContent = formatarPorcentagem(cargaReforma);

    // Atualizar resumo executivo
    atualizarResumoExecutivo(dados, sistemaAtual, tributoReformaFinal);
    
    // Atualizar comparação visual
    atualizarComparacaoVisual(sistemaAtual, tributoReformaFinal);

    // Gerar análises avançadas
    document.getElementById('analiseInternacional').innerHTML = gerarAnaliseInternacional(dados, sistemaAtual, tributoReformaFinal);
    document.getElementById('detalhamentoCustosImplantacao').innerHTML = gerarDetalhamentoCustosImplantacao(dados);

    // Gerar recomendações
    gerarRecomendacoes(dados, sistemaAtual, tributoReformaFinal);

    // Atualizar gráficos
    atualizarGraficos(dados, sistemaAtual.total, tributoReformaFinal);

    // Atualizar timeline
    atualizarTimeline(dados);
    
    // Criar gráfico internacional
    setTimeout(() => {
        criarGraficoInternacional();
    }, 100);
}

function atualizarResumoExecutivo(dados, sistemaAtual, tributoReforma) {
    const cargaAtual = (sistemaAtual.total / dados.faturamento) * 100;
    const cargaReforma = (tributoReforma / dados.faturamento) * 100;
    const variacao = cargaReforma - cargaAtual;
    const impactoAnual = (tributoReforma - sistemaAtual.total) * 12;
    
    document.getElementById('resumo-carga-atual').textContent = formatarPorcentagem(cargaAtual, 1);
    document.getElementById('resumo-carga-reforma').textContent = formatarPorcentagem(cargaReforma, 1);
    document.getElementById('resumo-variacao').textContent = (variacao >= 0 ? '+' : '') + formatarPorcentagem(variacao, 1);
    document.getElementById('resumo-impacto-anual').textContent = formatarMoeda(impactoAnual);
    
    // Atualizar badge
    const badge = document.getElementById('resumo-badge');
    badge.className = 'badge ';
    if (variacao < -1) {
        badge.classList.add('badge-success');
        badge.textContent = 'ECONOMIA';
    } else if (variacao > 1) {
        badge.classList.add('badge-danger');
        badge.textContent = 'AUMENTO';
    } else {
        badge.classList.add('badge-neutral');
        badge.textContent = 'NEUTRO';
    }
}

function atualizarComparacaoVisual(sistemaAtual, tributoReforma) {
    const diferenca = tributoReforma - sistemaAtual.total;
    const cargaAtual = (sistemaAtual.total / (parseFloat(document.getElementById('faturamento').value) || 1)) * 100;
    const cargaReforma = (tributoReforma / (parseFloat(document.getElementById('faturamento').value) || 1)) * 100;
    
    document.getElementById('comparacao-atual').textContent = formatarMoeda(sistemaAtual.total);
    document.getElementById('comparacao-atual-porc').textContent = formatarPorcentagem(cargaAtual, 1) + ' de carga';
    
    document.getElementById('comparacao-reforma').textContent = formatarMoeda(tributoReforma);
    document.getElementById('comparacao-reforma-porc').textContent = formatarPorcentagem(cargaReforma, 1) + ' de carga';
    
    document.getElementById('comparacao-diferenca').textContent = formatarMoeda(Math.abs(diferenca));
    
    const badge = document.getElementById('comparacao-badge');
    const descricao = document.getElementById('comparacao-descricao');
    
    if (diferenca < -1000) {
        badge.className = 'badge badge-success';
        badge.textContent = 'ECONOMIA';
        descricao.textContent = `Redução de ${formatarPorcentagem(Math.abs((diferenca/sistemaAtual.total)*100), 1)} na carga tributária`;
    } else if (diferenca > 1000) {
        badge.className = 'badge badge-danger';
        badge.textContent = 'AUMENTO';
        descricao.textContent = `Aumento de ${formatarPorcentagem((diferenca/sistemaAtual.total)*100, 1)} na carga tributária`;
    } else {
        badge.className = 'badge badge-neutral';
        badge.textContent = 'NEUTRO';
        descricao.textContent = 'Alteração insignificante na carga tributária';
    }
}

// ==================== FUNÇÕES EXISTENTES MANTIDAS ====================

function gerarRecomendacoes(dados, sistemaAtual, tributoReforma) {
    const diferenca = tributoReforma - sistemaAtual.total;
    const percentualImpacto = sistemaAtual.total > 0 ? (diferenca / sistemaAtual.total) * 100 : 0;
    const faturamentoAnual = dados.faturamento * 12;
    const reforma = calcularIVADual(dados);
    
    let recomendacoesArray = [];

    // 1. ANÁLISE DE IMPACTO
    if (diferenca < -5000) {
        recomendacoesArray.push({
            tipo: 'success',
            icone: '💰',
            titulo: 'CENÁRIO FAVORÁVEL - Redução Tributária Significativa',
            texto: `Sua empresa terá uma <strong>economia de ${formatarMoeda(Math.abs(diferenca))}/mês</strong> (${formatarMoeda(Math.abs(diferenca * 12))}/ano). Esta redução de ${formatarPorcentagem(Math.abs(percentualImpacto))} representa uma vantagem competitiva importante. <strong>Brayan Araujo Contador recomenda:</strong> Reinvestir parte dessa economia em tecnologia e capacitação.`
        });
    } else if (diferenca >= 5000) {
        recomendacoesArray.push({
            tipo: 'danger',
            icone: '⚠️',
            titulo: 'ATENÇÃO - Aumento da Carga Tributária',
            texto: `A reforma resultará em um <strong>aumento de ${formatarMoeda(diferenca)}/mês</strong> (${formatarMoeda(diferenca * 12)}/ano). Aumento de ${formatarPorcentagem(percentualImpacto)} nos tributos. <strong>Brayan Araujo Contador recomenda:</strong> Agende uma consultoria urgente para planejamento tributário estratégico.`
        });
    } else {
        recomendacoesArray.push({
            tipo: 'info',
            icone: 'ℹ️',
            titulo: 'Impacto Neutro ou Marginal',
            texto: `O impacto será próximo da neutralidade, com variação de ${diferenca >= 0 ? '+' : ''}${formatarMoeda(diferenca)}/mês. <strong>Brayan Araujo Contador recomenda:</strong> Foque em eficiência operacional e formalização de fornecedores para maximizar créditos.`
        });
    }

    // 2. ESTRATÉGIAS DE CRÉDITOS
    if (dados.percentualInsumos < 40) {
        recomendacoesArray.push({
            tipo: 'warning',
            icone: '💡',
            titulo: 'OPORTUNIDADE: Maximize seus Créditos de IVA',
            texto: `Seus insumos representam apenas ${dados.percentualInsumos}% do faturamento, gerando créditos de ${formatarMoeda(reforma.creditoInsumos)}/mês. <strong>AÇÃO RECOMENDADA:</strong> Revise sua cadeia de fornecedores, formalize compras informais. Cada 10% a mais em insumos formalizados pode gerar ${formatarMoeda((dados.faturamento * 0.1) * (reforma.aliquotaTotal / 100))}/mês em créditos adicionais.`
        });
    }

    // 3. SETORES ESPECÍFICOS
    if (dados.setor === 'energia') {
        recomendacoesArray.push({
            tipo: 'info',
            icone: '⚡',
            titulo: 'Setor de Energia - Tratamento Especial',
            texto: `O setor de energia terá alíquota reduzida estimada em 14% (vs 26,5% geral). <strong>Brayan Araujo Contador recomenda:</strong> Aproveite esta vantagem competitiva, mas atenção à regulamentação específica do setor que ainda será definida.`
        });
    } else if (dados.setor === 'telecom') {
        recomendacoesArray.push({
            tipo: 'warning',
            icone: '📱',
            titulo: 'Telecomunicações - ISS Mantido',
            texto: `O setor de telecomunicações provavelmente manterá o ISS municipal além do IBS. <strong>Brayan Araujo Contador recomenda:</strong> Planeje-se para cumulatividade parcial. Consulte legislação municipal específica de cada cidade onde opera.`
        });
    }

    // 4. NOVO REGIME SIMPLIFICADO
    if (dados.regime === 'simples-futuro') {
        recomendacoesArray.push({
            tipo: 'success',
            icone: '🔄',
            titulo: 'Novo Regime Simplificado - Grande Oportunidade',
            texto: `Você optou pelo novo regime simplificado pós-reforma (alíquota única ~10%). <strong>Brayan Araujo Contador recomenda:</strong> Esta pode ser excelente opção para empresas com faturamento até R$ 4,8 milhões e baixa necessidade de créditos.`
        });
    }

    // 5. CONSULTORIA ESPECIALIZADA
    if (Math.abs(diferenca) > 10000 || faturamentoAnual > 2000000) {
        recomendacoesArray.push({
            tipo: 'danger',
            icone: '👨‍💼',
            titulo: 'RECOMENDAÇÃO CRÍTICA - Consultoria Especializada',
            texto: `Devido ao impacto significativo (${diferenca >= 0 ? 'aumento' : 'economia'} de ${formatarMoeda(Math.abs(diferenca * 12))}/ano), é <strong>ESSENCIAL</strong> contratar consultoria tributária especializada. <strong>Brayan Araujo Contador oferece:</strong> Análise personalizada, planejamento estratégico e implementação do IVA. Entre em contato: brayancontabilidade@gmail.com`
        });
    }

    // 6. TIMING ESTRATÉGICO
    const anoAtual = new Date().getFullYear();
    const anosPara2033 = 2033 - anoAtual;
    recomendacoesArray.push({
        tipo: 'info',
        icone: '⏰',
        titulo: 'Timing Estratégico para Decisões',
        texto: `
            <div class="space-y-3">
                <p>Restam <strong>${anosPara2033} anos</strong> até a implementação total do IVA Dual (2033).</p>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <strong>Agenda Recomendada:</strong>
                    <ul class="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>${anoAtual + 1}:</strong> Diagnóstico completo e planejamento estratégico</li>
                        <li><strong>2026:</strong> Adaptação de sistemas e cadastro de créditos</li>
                        <li><strong>2027:</strong> Otimização de cadeia de fornecedores</li>
                        <li><strong>2029+:</strong> Ajustes finos e otimizações contínuas</li>
                    </ul>
                </div>
            </div>
        `
    });

    // Renderizar recomendações
    const html = recomendacoesArray.map(rec => {
        const alertType = rec.tipo === 'success' ? 'alert-success' : 
                        rec.tipo === 'danger' ? 'alert-danger' : 
                        rec.tipo === 'warning' ? 'alert-warning' : 'alert-info';
        
        return `
            <div class="alert-box ${alertType}">
                <div class="flex items-start gap-3">
                    <div class="text-2xl">${rec.icone}</div>
                    <div>
                        <h3 class="font-bold text-lg mb-2">${rec.titulo}</h3>
                        <div class="text-sm leading-relaxed">${rec.texto}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('recomendacoes').innerHTML = html;
}

function atualizarTimeline(dados) {
    const timelineItems = [
        {
            ano: '2026',
            titulo: 'Fase Experimental',
            descricao: 'CBS e IBS iniciam em caráter experimental com 0,1% cada. Sistema antigo mantido em 99,8%. Empresas começam adaptação de sistemas.',
            acoes: ['Teste de sistemas', 'Cadastro de créditos', 'Treinamento inicial'],
            cor: 'blue'
        },
        {
            ano: '2027',
            titulo: 'CBS Entra em Vigor',
            descricao: 'CBS substitui TOTALMENTE PIS e COFINS. Alíquota CBS: ~10,6% (cenário base). IBS ainda em fase teste (0,1%). Fim da cumulatividade de PIS/COFINS.',
            acoes: ['Implementação CBS', 'Ajuste de processos', 'Monitoramento créditos'],
            cor: 'indigo'
        },
        {
            ano: '2029',
            titulo: 'IBS Começa Substituição',
            descricao: 'IBS inicia substituição gradual de ICMS e ISS (10%). Empresas já devem estar com sistemas adaptados. Créditos integrais começam a fazer diferença real.',
            acoes: ['Transição ICMS/ISS', 'Otimização créditos', 'Ajuste precificação'],
            cor: 'purple'
        },
        {
            ano: '2033',
            titulo: 'Sistema Completo',
            descricao: 'ICMS e ISS EXTINTOS. IVA Dual 100% implementado. Alíquota estimada: 25-28% (CBS + IBS). Brasil com um dos IVAs mais altos do mundo. Sistema não-cumulativo pleno.',
            acoes: ['Sistema consolidado', 'Otimização contínua', 'Análise competitiva'],
            cor: 'red'
        }
    ];

    let html = '<div class="space-y-8">';
    
    timelineItems.forEach(item => {
        const transicao = calcularTransicao(dados, item.ano);
        const cargaEfetiva = (transicao.tributoTotal / dados.faturamento) * 100;
        
        html += `
            <div class="flex flex-col md:flex-row gap-6">
                <div class="md:w-1/4">
                    <div class="bg-${item.cor}-100 text-${item.cor}-900 rounded-xl p-6 text-center">
                        <div class="text-3xl font-bold mb-2">${item.ano}</div>
                        <div class="text-sm font-semibold">${item.titulo}</div>
                        <div class="mt-4 text-lg font-bold">
                            ${formatarPorcentagem(cargaEfetiva)}
                        </div>
                        <div class="text-sm text-${item.cor}-700">carga efetiva</div>
                    </div>
                </div>
                
                <div class="md:w-3/4">
                    <div class="bg-white border border-gray-200 rounded-xl p-6">
                        <p class="text-gray-700 mb-4">${item.descricao}</p>
                        
                        <div class="mb-4">
                            <div class="text-sm font-semibold text-gray-600 mb-2">Tributo estimado para sua empresa:</div>
                            <div class="text-2xl font-bold text-${item.cor}-600">
                                ${formatarMoeda(transicao.tributoTotal)}/mês
                            </div>
                        </div>
                        
                        <div>
                            <div class="text-sm font-semibold text-gray-600 mb-2">Ações Recomendadas:</div>
                            <div class="flex flex-wrap gap-2">
                                ${item.acoes.map(acao => `
                                    <span class="bg-${item.cor}-50 text-${item.cor}-700 px-3 py-1 rounded-full text-sm">
                                        ${acao}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    document.getElementById('timeline').innerHTML = html;
}

// ==================== FUNÇÕES DE PERSISTÊNCIA ====================

function salvarSimulacao() {
    const dados = {
        faturamento: document.getElementById('faturamento').value,
        regime: document.getElementById('regime').value,
        setor: document.getElementById('setor').value,
        estado: document.getElementById('estado').value,
        cargaAtual: document.getElementById('carga-atual').textContent,
        cargaReforma: document.getElementById('carga-reforma').textContent,
        impacto: document.getElementById('resumo-impacto-anual').textContent,
        data: new Date().toLocaleString('pt-BR')
    };
    
    historicoSimulacoes.unshift(dados);
    if (historicoSimulacoes.length > 10) {
        historicoSimulacoes = historicoSimulacoes.slice(0, 10);
    }
    
    localStorage.setItem('historicoSimulacoes', JSON.stringify(historicoSimulacoes));
    
    alert('✅ Simulação salva com sucesso! Você pode acessá-la no "Histórico".');
}

function carregarSimulacoes() {
    document.getElementById('historicoSimulacoes').style.display = 'block';
    const lista = document.getElementById('listaSimulacoes');
    
    if (historicoSimulacoes.length === 0) {
        lista.innerHTML = '<p class="text-gray-500 text-center py-8">Nenhuma simulação salva ainda.</p>';
        return;
    }
    
    let html = '<div class="space-y-4">';
    historicoSimulacoes.forEach((sim, index) => {
        const impactoNum = parseFloat(sim.impacto.replace('R$', '').replace('.', '').replace(',', '.'));
        
        html += `
            <div class="card cursor-pointer hover:shadow-hard transition-all" onclick="carregarSimulacao(${index})">
                <div class="flex justify-between items-center">
                    <div>
                        <div class="font-bold text-gray-800">${sim.setor} - ${sim.regime}</div>
                        <div class="text-sm text-gray-600 mt-1">
                            Faturamento: R$ ${parseFloat(sim.faturamento).toLocaleString('pt-BR')} | 
                            Estado: ${sim.estado}
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-xs text-gray-500">${sim.data}</div>
                        <div class="text-lg font-bold ${impactoNum < 0 ? 'text-green-600' : 'text-red-600'}">
                            ${sim.impacto}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    lista.innerHTML = html;
}

function carregarSimulacao(index) {
    const sim = historicoSimulacoes[index];
    document.getElementById('faturamento').value = sim.faturamento;
    document.getElementById('regime').value = sim.regime;
    document.getElementById('setor').value = sim.setor;
    document.getElementById('estado').value = sim.estado;
    
    atualizarCalculos();
    document.getElementById('historicoSimulacoes').style.display = 'none';
}

function calcularCustosAdaptacao() {
    const html = `
        <div class="card-header">
            <h3 class="text-2xl font-bold flex items-center gap-3">
                <i class="fas fa-calculator text-purple-600"></i>
                Calculadora de Custos de Adaptação à Reforma
            </h3>
        </div>
        
        <div class="space-y-6">
            <div class="grid md:grid-cols-3 gap-6">
                <div class="card">
                    <label class="block text-sm font-semibold text-gray-700 mb-3">
                        Sistema ERP/Software
                    </label>
                    <select id="custoErp" class="w-full px-4 py-3 input-field rounded-lg">
                        <option value="500">Básico (R$ 500/mês)</option>
                        <option value="1500" selected>Intermediário (R$ 1.500/mês)</option>
                        <option value="5000">Avançado (R$ 5.000/mês)</option>
                    </select>
                    <p class="text-xs text-gray-500 mt-2">Sistema compatível com IVA Dual</p>
                </div>
                
                <div class="card">
                    <label class="block text-sm font-semibold text-gray-700 mb-3">
                        Treinamento da Equipe
                    </label>
                    <select id="custoTreinamento" class="w-full px-4 py-3 input-field rounded-lg">
                        <option value="1000">Básico (R$ 1.000)</option>
                        <option value="3000" selected>Completo (R$ 3.000)</option>
                        <option value="8000">Especializado (R$ 8.000)</option>
                    </select>
                    <p class="text-xs text-gray-500 mt-2">Capacitação para nova tributação</p>
                </div>
                
                <div class="card">
                    <label class="block text-sm font-semibold text-gray-700 mb-3">
                        Consultoria Especializada
                    </label>
                    <select id="custoConsultoria" class="w-full px-4 py-3 input-field rounded-lg">
                        <option value="5000">Planejamento (R$ 5.000)</option>
                        <option value="15000" selected>Implementação (R$ 15.000)</option>
                        <option value="30000">Completa (R$ 30.000)</option>
                    </select>
                    <p class="text-xs text-gray-500 mt-2">Análise personalizada por especialista</p>
                </div>
            </div>
            
            <div class="card bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h4 class="font-bold text-yellow-900 text-lg">Custo Total de Adaptação</h4>
                        <p class="text-sm text-yellow-800">Investimento necessário para transição completa</p>
                    </div>
                    <div class="text-3xl font-bold text-yellow-700 mt-4 md:mt-0" id="custoAdaptacaoTotal">R$ 0,00</div>
                </div>
                <div class="mt-4">
                    <button onclick="calcularTotalAdaptacao()" class="btn-primary px-6 py-2 rounded-full">
                        <i class="fas fa-calculator mr-2"></i>Calcular
                    </button>
                    <button onclick="fecharCustosAdaptacao()" class="btn-secondary px-6 py-2 rounded-full ml-3">
                        <i class="fas fa-times mr-2"></i>Fechar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('custosAdaptacao').innerHTML = html;
    document.getElementById('custosAdaptacao').style.display = 'block';
    calcularTotalAdaptacao();
}

function calcularTotalAdaptacao() {
    const custoErp = parseFloat(document.getElementById('custoErp').value) || 0;
    const custoTreinamento = parseFloat(document.getElementById('custoTreinamento').value) || 0;
    const custoConsultoria = parseFloat(document.getElementById('custoConsultoria').value) || 0;
    
    const total = custoErp * 12 + custoTreinamento + custoConsultoria;
    document.getElementById('custoAdaptacaoTotal').textContent = formatarMoeda(total);
}

function fecharCustosAdaptacao() {
    document.getElementById('custosAdaptacao').style.display = 'none';
}

function simularPrecificacao() {
    const faturamento = parseFloat(document.getElementById('faturamento').value) || 0;
    const margemAtual = prompt('Qual sua margem de lucro atual (%)?', '20');
    const margemDesejada = prompt('Qual margem de lucro deseja manter após a reforma (%)?', '20');
    
    if (!margemAtual || !margemDesejada) return;
    
    const sistemaAtual = calcularSistemaAtualCorrigido({
        faturamento: faturamento,
        regime: document.getElementById('regime').value,
        setor: document.getElementById('setor').value,
        estado: document.getElementById('estado').value,
        folhaPagamento: document.getElementById('folhaPagamento').value
    });
    
    const reforma = calcularIVADual({
        faturamento: faturamento,
        categoria: document.getElementById('categoria').value,
        percentualInsumos: document.getElementById('percentualInsumos').value,
        percentualAtivo: document.getElementById('percentualAtivo').value
    });
    
    const custoAtual = faturamento * (1 - (parseFloat(margemAtual)/100));
    const precoAtual = custoAtual + sistemaAtual.total;
    
    const custoReforma = faturamento * (1 - (parseFloat(margemDesejada)/100));
    const precoReformaNecessario = custoReforma + reforma.ivaLiquido;
    
    const aumentoPercentual = ((precoReformaNecessario - precoAtual) / precoAtual) * 100;
    
    alert(`📊 PRECIFICAÇÃO SIMULADA\n\n` +
          `Preço atual necessário: ${formatarMoeda(precoAtual)}\n` +
          `Preço pós-reforma necessário: ${formatarMoeda(precoReformaNecessario)}\n` +
          `Aumento necessário: ${aumentoPercentual.toFixed(1)}%\n\n` +
          `💡 Para manter margem de ${margemDesejada}%, você precisará aumentar os preços em ${aumentoPercentual.toFixed(1)}%.`);
}

function exportarParaCSV() {
    const dados = {
        faturamento: document.getElementById('faturamento').value,
        regime: document.getElementById('regime').value,
        setor: document.getElementById('setor').value,
        estado: document.getElementById('estado').value,
        cargaAtual: document.getElementById('carga-atual').textContent,
        cargaReforma: document.getElementById('carga-reforma').textContent,
        impactoAnual: document.getElementById('resumo-impacto-anual').textContent,
        data: new Date().toLocaleString('pt-BR')
    };
    
    let csv = 'Parâmetro,Valor\n';
    csv += `Faturamento Mensal,R$ ${dados.faturamento}\n`;
    csv += `Regime Tributário,${dados.regime}\n`;
    csv += `Setor,${dados.setor}\n`;
    csv += `Estado,${dados.estado}\n`;
    csv += `Carga Tributária Atual,${dados.cargaAtual}\n`;
    csv += `Carga Pós-Reforma,${dados.cargaReforma}\n`;
    csv += `Impacto Financeiro Anual,${dados.impactoAnual}\n`;
    csv += `Data da Simulação,${dados.data}\n`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `simulacao-reforma-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    
    alert('✅ CSV exportado com sucesso!');
}

function salvarComoPDF() {
    alert('📄 Para salvar como PDF, use a função de impressão do navegador (Ctrl+P) e selecione "Salvar como PDF" como destino.');
}

function compartilhar() {
    const texto = `Simulei o impacto da Reforma Tributária na minha empresa com a calculadora profissional do Brayan Araujo Contador. Confira esta ferramenta incrível!`;
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: 'Calculadora Reforma Tributária | Brayan Araujo Contador',
            text: texto,
            url: url
        });
    } else {
        navigator.clipboard.writeText(`${texto}\n\n${url}`).then(() => {
            alert('✅ Link copiado para a área de transferência! Compartilhe com seus colegas e parceiros.');
        });
    }
}

function abrirContatoConsultoria() {
    const dados = {
        faturamento: parseFloat(document.getElementById('faturamento').value) || 0,
        regime: document.getElementById('regime').value,
        setor: document.getElementById('setor').value,
        estado: document.getElementById('estado').value,
        folhaPagamento: parseFloat(document.getElementById('folhaPagamento').value) || 0
    };
    
    const sistemaAtual = calcularSistemaAtualCorrigido(dados);
    const reforma = calcularIVADual(dados);
    const economiaMensal = sistemaAtual.total - reforma.ivaLiquido;
    
    const mensagem = `Olá Brayan, gostaria de agendar uma consultoria sobre a Reforma Tributária.\n\n` +
                   `Minha empresa:\n` +
                   `- Faturamento: ${formatarMoeda(dados.faturamento)}/mês\n` +
                   `- Setor: ${document.getElementById('setor').options[document.getElementById('setor').selectedIndex].text}\n` +
                   `- Regime: ${document.getElementById('regime').options[document.getElementById('regime').selectedIndex].text}\n` +
                   `- Economia estimada: ${formatarMoeda(economiaMensal)}/mês\n\n` +
                   `Podemos agendar uma conversa?`;
    
    const telefone = "5521991577383";
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

function criarGraficoInternacional() {
    const ctx = document.getElementById('chartInternacional');
    if (!ctx) return;
    
    const context = ctx.getContext('2d');
    
    // Destruir gráfico existente
    if (charts.internacional) {
        charts.internacional.destroy();
    }
    
    const paises = Object.keys(COMPARACAO_INTERNACIONAL).slice(0, 8);
    const labels = paises.map(key => COMPARACAO_INTERNACIONAL[key].nome);
    const dadosCarga = paises.map(key => COMPARACAO_INTERNACIONAL[key].cargaTotal);
    const cores = paises.map(key => 
        key.includes('brasil-atual') ? '#ef4444' : 
        key.includes('brasil-pos') ? '#8b5cf6' : 
        '#3b82f6'
    );
    
    charts.internacional = new Chart(context, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Carga Tributária Total (% do PIB)',
                data: dadosCarga,
                backgroundColor: cores,
                borderColor: cores.map(cor => cor.replace('0.8', '1')),
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Comparativo Internacional de Carga Tributária Empresarial',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const pais = COMPARACAO_INTERNACIONAL[paises[context.dataIndex]];
                            return [
                                `Carga Total: ${pais.cargaTotal}% do PIB`,
                                `IVA/VAT: ${pais.ivaVat > 0 ? pais.ivaVat + '%' : 'Não tem'}`,
                                `Complexidade: ${pais.complexidade}/10`,
                                `Ranking DB: ${pais.rankingDoingBusiness}º`
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '% do PIB em tributos empresariais'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// ==================== EVENT LISTENERS ====================

document.addEventListener('DOMContentLoaded', function() {
    // Event listeners para inputs
    document.getElementById('faturamento').addEventListener('input', atualizarCalculos);
    document.getElementById('regime').addEventListener('change', function() {
        const regime = this.value;
        let infoText = '';
        if (regime === 'simples') {
            infoText = 'Limite: R$ 4,8 milhões/ano';
        } else if (regime === 'simples-futuro') {
            infoText = 'Novo regime pós-reforma (alíquota única ~10%)';
        } else if (regime === 'presumido') {
            infoText = 'Lucro estimado por lei';
        } else {
            infoText = 'Lucro efetivo contábil';
        }
        document.getElementById('regimeInfo').textContent = infoText;
        atualizarCalculos();
    });
    
    document.getElementById('setor').addEventListener('change', atualizarCalculos);
    document.getElementById('estado').addEventListener('change', atualizarCalculos);
    document.getElementById('folhaPagamento').addEventListener('input', atualizarCalculos);
    document.getElementById('categoria').addEventListener('change', atualizarCalculos);
    document.getElementById('anoTransicao').addEventListener('change', atualizarCalculos);
    document.getElementById('regimeApuracao').addEventListener('change', atualizarCalculos);

    document.getElementById('percentualInsumos').addEventListener('input', function() {
        const valor = this.value;
        document.getElementById('insumosValor').textContent = valor + '%';
        
        let alerta = '';
        if (valor < 20) {
            alerta = '⚠️ Baixo percentual! Você terá poucos créditos de IVA. Revise sua cadeia de fornecedores.';
            document.getElementById('insumosAlert').className = 'bg-red-50 text-red-700 p-3 rounded-lg border border-red-200';
        } else if (valor >= 60) {
            alerta = '✅ Excelente! Alto volume de créditos tributários. Ótimo posicionamento para a reforma.';
            document.getElementById('insumosAlert').className = 'bg-green-50 text-green-700 p-3 rounded-lg border border-green-200';
        } else {
            alerta = '💡 Razoável. Busque aumentar formalização de compras para maximizar créditos disponíveis.';
            document.getElementById('insumosAlert').className = 'bg-blue-50 text-blue-700 p-3 rounded-lg border border-blue-200';
        }
        document.getElementById('insumosAlert').textContent = alerta;
        
        atualizarCalculos();
    });

    document.getElementById('percentualAtivo').addEventListener('input', function() {
        const valor = this.value;
        document.getElementById('ativoValor').textContent = valor + '%';
        atualizarCalculos();
    });

    // Dark Mode
    document.getElementById('darkModeToggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        this.innerHTML = document.body.classList.contains('dark-mode') ? 
            '<i class="fas fa-sun mr-2"></i>Modo Claro' : 
            '<i class="fas fa-moon mr-2"></i>Modo Escuro';
    });

    // Exportar CSV
    document.getElementById('exportCSV').addEventListener('click', exportarParaCSV);

    // Exportar PDF
    document.getElementById('exportPDF').addEventListener('click', function() {
        window.print();
    });

    // Inicializar
    atualizarCalculos();
    selecionarAnoTransicao(2033);
    abrirTab('tab-geral');
    abrirChartTab('chart-comparativo');
});
