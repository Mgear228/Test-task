import { useEffect, useState } from "react";
import { Dropdown } from "../Dropdown/Dropdown";
import styles from './SortOptions.module.css'
import { Todo } from "../../api/getData";

interface props {
    data: Todo[];
    value: Todo[];
    setValue: React.Dispatch<React.SetStateAction<Todo[]>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export function SortOptions({data, value, setValue, setCurrentPage} : props) {
    const [filter, setFilter] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('id');
    const [order, setOrder] = useState<string>('ascending');
    const [completed, setCompleted] = useState<string>('');

    useEffect(() => {
        const filtered = data.filter(todo => {
            const titleMatch = todo.title.toLowerCase().includes(filter.toLowerCase());
            const completedMatch = completed === '' || todo.completed === (completed === 'true');
            return titleMatch && completedMatch;
        });
        setValue(filtered);
        setCurrentPage(1);
    }, [filter, data, completed]);

    useEffect(() => {
        const sorted = [...value].sort((a, b) => {
            if(sortBy === 'id') {
                return order === 'ascending' ? a.id - b.id: b.id - a.id;
            } else if (sortBy === 'title') {
                return order === 'ascending' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
            }
            return 0;
        });
        setValue(sorted);
        setCurrentPage(1);
    }, [sortBy, order]);

    return (
        <div>
            <div className={styles.sectionRow}>
                <div className={styles.rowCell}>title
                    <input className={styles.textInput} value={filter} onChange={(e) => setFilter(e.target.value)}></input>
                </div>
                <div className={styles.rowCell}>completed
                    <Dropdown items={['true', 'false']} method={setCompleted}/>
                </div>
            </div>
            <div className={styles.sectionRow}>
                <div className={styles.rowCell}>sort by
                    <Dropdown items={['id', 'title']} method={setSortBy}/>
                </div>
                <div className={styles.rowCell}>order
                    <Dropdown items={['ascending', 'descending']} method={setOrder}/>
                </div>
            </div>
        </div>
    );
}