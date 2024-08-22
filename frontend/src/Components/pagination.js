import React from 'react';
import { Pagination } from 'antd';

const Paginationbox = ({ activePage, itemsCountPerPage, totalItemsCount, onChange }) => (

    <Pagination   
    current={activePage}
    pageSize={itemsCountPerPage}
    total={totalItemsCount}
    onChange={onChange}
    />

);
export default Paginationbox;