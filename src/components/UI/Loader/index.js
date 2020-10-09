import { getDefaultNormalizer } from '@testing-library/react';
import React from 'react'
import styles from './loader.module.css';
const Loader = (props) => {
    return (
        props.show ?
            <div className={styles.lds}><div></div><div></div><div></div><div></div></div>
            :
            null
    )
}
export default Loader;