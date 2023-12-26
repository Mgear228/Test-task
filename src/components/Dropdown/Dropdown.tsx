import { useState } from 'react';
import styles from './Dropdown.module.css'

interface props {
    items: string[];
    method: any;
}

export function Dropdown({items, method} : props) {
    const [active, setActive] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');

    return (
        <div className={styles.dropdown} onClick={() => setActive(!active)}>
            {value}
            <div className={styles.arrow}></div>
            {active && <div className={styles.dropdownList}>
                <div className={styles.dropdownListElem} onClick={() => {setValue(items[0]); method(items[0])}}>{items[0]}</div>
                <div className={styles.dropdownListElem} onClick={() => {setValue(items[1]); method(items[1])}}>{items[1]}</div>
                </div>}
        </div>
    );
}