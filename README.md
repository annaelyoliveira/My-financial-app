# 🐷 Meu Bolso — Controle Financeiro Pessoal

App de controle financeiro pessoal feito com **React + Vite + Tailwind CSS**, com suporte a **modo escuro** e **dados salvos automaticamente no navegador** (localStorage).

## Funcionalidades

- **Início**: saldo atual, receitas/despesas e formulário rápido para adicionar transações
- **Relatórios**: gráfico de barras (receitas vs despesas), gráfico de pizza (despesas por categoria) e estatísticas, filtráveis por Hoje / Semana / Mês / Ano
- **Categorias**: detalhamento de gastos por categoria (Casa, Empresa, Pessoal, Cartão, Outros) com gráfico por período
- **Mensal**: evolução das despesas mês a mês (gráfico de linha) + tabela comparativa por categoria
- **Transações**: lista completa com edição e exclusão
- **Modo claro/escuro**: alternável pelo botão no topo, com preferência salva

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:5173 no navegador.

## Build para produção

```bash
npm run build
npm run preview
```

A pasta `dist/` gerada pode ser publicada em qualquer host estático (Vercel, Netlify, GitHub Pages, etc).

## Estrutura

```
src/
  context/
    ThemeContext.jsx      → estado do tema claro/escuro (persistido)
    FinanceContext.jsx     → estado das transações + toda a lógica financeira (persistido)
  components/
    Navbar.jsx              → topo + navegação (desktop) / tabs (mobile)
    ThemeToggle.jsx         → botão de alternar tema
    BalanceCard.jsx         → cartão de saldo atual
    CategoryPicker.jsx      → seletor de categoria reutilizável
    TransactionForm.jsx     → formulário de adicionar receita/despesa
    TransactionItem.jsx     → item de transação (editar/excluir)
    StatCard.jsx            → cartão de estatística genérico
  pages/
    Dashboard.jsx           → tela Início
    Reports.jsx              → tela Relatórios
    CategoryExpenses.jsx     → tela Despesas por Categoria
    MonthlyExpenses.jsx      → tela Despesas Mensais por Categoria
    Transactions.jsx         → tela Minhas Transações
  utils/
    categories.js            → definição das categorias (cor, ícone)
    format.js                 → formatação de moeda/data
```

## Dados

Tudo é salvo automaticamente no `localStorage` do navegador — não há backend. Se quiser resetar os dados, abra o DevTools → Application → Local Storage e apague as chaves `meu-bolso:transactions` e `meu-bolso:theme`.
