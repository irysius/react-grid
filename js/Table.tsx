import * as React from 'react';
import { RowHeader, IColumnMap, IRowHeaderProps } from './RowHeader';
import { Row, IRowProps } from './Row';

export interface ITableRecord {
    id: any;
    columns: IColumnMap;
    [others: string]: any;
}
export interface ITableProps extends IRowHeaderProps {
    collection: ITableRecord[];
    [others: string]: any;
}
export interface ITableState {
}

export class Table extends React.Component<ITableProps, ITableState> {
    constructor(props) {
        super(props);
    }
    render() {
        let rowHeader = <RowHeader {...this.props} />;
        let rows = this.props.collection.map(item => {
            return <Row key={item.id} {...item} columns={this.props.columns} />;
        });
        return <div className="container">
            <div>
                {rowHeader}
            </div>
            <div>
                {rows}
            </div>
        </div>;
    }
}