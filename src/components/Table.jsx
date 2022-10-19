import React from 'react';
import TableContent from './TableContent';
import TableHead from './TableHead';

function Table() {
  return (
    <table>
      <TableHead />
      <TableContent />
    </table>
  );
}

export default Table;
