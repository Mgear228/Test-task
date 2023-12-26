import { useEffect, useState } from 'react';
import styles from './Table.module.css'
import { Todo, getData } from '../../api/getData';
import { SortOptions } from '../SortOptions/SortOptions';
import { Pagination } from '../Pagination/Pagination';

export function Table() {
    const [data, setData] = useState<Todo[]>([]);
    const [filteredData, setFilteredData] = useState<Todo[]>([])
    const [currPage, setCurrPage] = useState<number>(1);

    useEffect(() => {
        getData()
            .then(response => {
            setData(response);
            setFilteredData(response);
        }).catch(error => console.error(error));
    }, []);

    const itemsPerPage = 15;

    const indexOfLastItem = currPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    return ( <>
        <SortOptions data={data} value={filteredData} setValue={setFilteredData} setCurrentPage={setCurrPage}/>
        <table className={styles.mainTable}>
            <thead>
                <tr>
                    <td className={styles.tableCell}>id</td>
                    <td className={styles.tableCell}>user</td>
                    <td className={styles.tableCell}>title</td>
                    <td className={styles.tableCell}>completed</td>
                </tr>
            </thead>
            <tbody>
                {currentItems?.map((todoData) => (
                    <tr>
                        <td className={styles.tableCell} key={todoData.id}>{todoData.id}</td>
                        <td className={styles.tableCell}>{todoData.userId}</td>
                        <td className={styles.tableCell}>{todoData.title}</td>
                        <td className={styles.tableCell}>{todoData.completed? `true`: `false`}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Pagination filteredData={filteredData} itemsPerPage={itemsPerPage} currPage={currPage} setCurrPage={setCurrPage}/>
    </>
    );
}