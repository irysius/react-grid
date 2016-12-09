import * as React from 'react';
import { SearchTextbox, ISearchTextboxProps } from './SearchTextbox';
import { IColumnMap } from './RowHeader';
import { Pager, IPagerProps } from './Pager';
import { Table, ITableRecord, ITableProps } from './Table';

export interface IAppProps extends ITableProps, ISearchTextboxProps {
    pagingData: IPagerProps;
    setPagination<T>(pageIndex: number): void;
    refresh(): void;
}
export interface IAppState {
}

export class App extends React.Component<IAppProps, IAppState> {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            <SearchTextbox {...this.props}/>
            <Pager 
                setPagination={this.props.setPagination} 
                refresh={this.props.refresh}
                {...this.props.pagingData} />
            <Table {...this.props}/>
        </div>;
    }
}
