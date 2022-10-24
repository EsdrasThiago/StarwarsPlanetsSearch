import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testes Filters', () => {
  it('Testando forms de filter', () => {
    render(<App />);

    const filterButton = screen.getByRole('button', { name: /filtrar/i })

    userEvent.click(filterButton);

    const filters = screen.getByTestId('filter');

    expect(filters).toHaveTextContent('population');
    
  });
  it('Testes para TableContent', async () => {
    render(<App />);

    const filterName = screen.getByRole('textbox')
    const filterButton = screen.getByRole('button', { name: /filtrar/i })
    
    
    
    await waitFor(() => {
      const tatooine = screen.getByRole('cell', { name: /tatooine/i });
      const bespin = screen.getByRole('cell', { name: /bespin/i });
      
      expect(tatooine).toBeInTheDocument();
      userEvent.type(filterName, 'oo')
      expect(bespin).not.toBeInTheDocument();
      userEvent.click(filterButton);
      expect(tatooine).toBeInTheDocument();
    },{ timeout: 2000 });
  })
  it('Testando o MyProvider', async () => {
    render(<App />);

    const filterButton = screen.getByRole('button', { name: /filtrar/i })
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    await waitFor(() => {
      const hoth = screen.getByRole('cell', { name: /hoth/i });
      userEvent.selectOptions(columnFilter, 'diameter');
      userEvent.selectOptions(comparisonFilter, 'maior que');
      const valueFilter = screen.getByTestId('value-filter');
      userEvent.type(valueFilter, '8900');
      userEvent.click(filterButton);
      const diameterCleaner = screen.getByRole('button', { name: /limpar/i });
      expect(hoth).not.toBeInTheDocument();
      expect(columnFilter).toHaveTextContent('population');
      userEvent.type(valueFilter, '1000')
      userEvent.selectOptions(columnFilter, 'orbital_period')
      userEvent.selectOptions(comparisonFilter, 'menor que')
      userEvent.click(filterButton);
      userEvent.click(diameterCleaner)
      userEvent.type(valueFilter, '12')
      userEvent.selectOptions(columnFilter, 'surface_water')
      userEvent.selectOptions(comparisonFilter, 'igual a')
      userEvent.click(filterButton);
      userEvent.click(diameterCleaner)
      expect(diameterCleaner).not.toBeInTheDocument();
      const clearAllButton = screen.getByRole('button', { name: /remover todas as filtragens/i });
      userEvent.click(clearAllButton);
    }, { timeout: 2000 });
    
  });
});
