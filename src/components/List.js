import {useContext} from 'react';
import FormCard from './FormCard';
import {context} from '../store/context';

export default function List() {
    const ctx = useContext(context);
    return (
        <div id='cards'>
            {ctx.itemAmounts.map((item, i) => <FormCard index={i} key={i} {...item}/>)}
        </div>
    );
}