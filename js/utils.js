// ==================== FUNÇÕES DE UTILIDADE ====================

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor);
}

function formatarPorcentagem(valor, casas = 2) {
    return valor.toFixed(casas) + '%';
}

function abrirTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    document.getElementById(tabId).classList.add('active');
    
    document.querySelector(`button[onclick="abrirTab('${tabId}')"]`).classList.add('active');
}

function abrirChartTab(chartTabId) {
    document.querySelectorAll('#chart-comparativo, #chart-cascata, #chart-transicao, #chart-estados, #chart-setor').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    document.getElementById(chartTabId).classList.add('active');
    
    document.querySelector(`button[onclick="abrirChartTab('${chartTabId}')"]`).classList.add('active');
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
