import { Todo } from '../../api/getData';
import styles from './Pagination.module.css';

interface props {
    filteredData: Todo[];
    itemsPerPage: number;
    currPage: number;
    setCurrPage: React.Dispatch<React.SetStateAction<number>>;
}

export function Pagination({filteredData, itemsPerPage, currPage, setCurrPage} : props) {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={styles.btnSection}>
            {pageNumbers.map(number => (
                <button className={`${styles.btns} ${currPage === number? styles.active : ''}`} key={number} onClick={() => setCurrPage(number)}>{number}</button>
            ))}
        </div>
    );
}