import * as React from 'react';
import { IColumnMap } from './RowHeader';
export interface IRowProps {
    id: any;
    [others: string]: any;
    columns: IColumnMap;
}
export interface IRowState {

}
export function Row(props: IRowProps) {
    let cells = Object.keys(props.columns).map(key => {
        let column = props.columns[key];
        return <div className={column.className}>{props[key]}</div>;
    });
    return (
        <div classname="row">
            { cells }
        </div>
    );
}