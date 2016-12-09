import * as React from 'react';
export interface IColumnMap {
    [name: string]: {
        className: string;
        [others: string]: any;
    }
}
export interface IRowHeaderProps {
    columns: IColumnMap;
    setSort<T>(columns: IColumnMap, sortColumn: string, prevSortColumn: string): void;
    refresh(): void;
}
export interface IRowHeaderState {
    prevSortColumn: string;
}

export class RowHeader extends React.Component<IRowHeaderProps, IRowHeaderState> {
    constructor(props) {
        super(props);
        this.state = {
            prevSortColumn: ''
        };
    }

    sort(columnName: string) {
        // emit sort event to bus
        this.props.setSort(this.props.columns, columnName, this.state.prevSortColumn);
        this.setState({
            prevSortColumn: (this.state.prevSortColumn == columnName) ? '' : columnName
        });
        this.props.refresh();
    }

    render() {
        let headerCells = Object.keys(this.props.columns).map((key, index) => {
            let column = this.props.columns[key];
            return <div key={index} className={column.className} 
                onClick={this.sort.bind(this, key)}>
                {key}
            </div>;
        });
        
        return <div className="row header-row">
            { headerCells }
        </div>
    }
}