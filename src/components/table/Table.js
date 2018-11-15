import _ from 'lodash';
import React from 'react';
import tableData from './makeTableData';

// Styled
import Styled from './Table.styled';

const TableData = React.memo(({ item }) => _.map(item, (atomic) => {
  let text = '';

  if (typeof atomic.date === 'string') {
    text = `${atomic.date} 시`;
  }

  if (atomic.all) {
    text = `${atomic.all} (And ${atomic.android}, iOS ${atomic.ios})`;
  }

  return <Styled.ContentTD key={atomic.date}>{text}</Styled.ContentTD>;
}));

const TableRows = React.memo(() => _.map(tableData.addTimeTable, item => (
  <tr key={item[0].date}>
    <TableData item={item} />
  </tr>
)));

const TableHead = React.memo(() => {
  const tableArr = tableData.addTimeTable[0];
  const dateArr = _.map(_.tail(tableArr), item => item.date.format('YYYY-MM-DD'));
  return _.map(dateArr, item => <th key={item}>{item}</th>);
});

const Table = () => (
  <Styled.MarginAutoTable>
    <Styled.BoldFontThead>
      <Styled.TitleTR>
        <th>시간</th>
        <TableHead />
      </Styled.TitleTR>
    </Styled.BoldFontThead>
    <tbody>
      <TableRows />
    </tbody>
  </Styled.MarginAutoTable>
);

export default Table;
