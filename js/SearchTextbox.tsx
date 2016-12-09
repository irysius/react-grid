import * as React from 'react';
import * as _ from 'lodash';
import { IColumnMap } from './RowHeader';
interface ISearchTextbox {
    filter: Function;
    filterDebounced: Function;
}
interface ISearchTextboxState {
    searchTerm?: string;
    searchColumn?: string;
}
export interface ISearchTextboxProps {
    columns: IColumnMap;
    setFilter(searchTerm: string, searchColumn: string): void; 
    refresh(): void;
}
export class SearchTextbox extends React.Component<ISearchTextboxProps, ISearchTextboxState> implements ISearchTextbox {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            searchColumn: Object.keys(this.props.columns)[0]
        };
        // http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js/24679479#24679479
        this.filterDebounced = _.debounce(function () {
            this.filter.apply(this, [this.state.searchTerm]);
        }.bind(this), 100);
    }

    filterDebounced;
    filter(searchTerm: string) {
        this.props.setFilter(this.state.searchTerm, this.state.searchColumn);
        this.props.refresh();
    }

    clearFilter() {
        if(!this.state.searchTerm.length) return false;

        this.setState({
            searchTerm: '',
            searchColumn: Object.keys(this.props.columns)[0]
        });

        filter = null;
        refresh();
    }

    onChange(event) {
        this.setState({ 
            searchTerm: event.target.value
        });
        this.filterDebounced();
    }

    onSelect(event) {
        this.setState({
            searchColumn: event.target.value
        });
    }

    render() {
        var options = Object.keys(this.props.columns).map(function(header, index) {
            return <option key={index}>{header}</option>
        });

        return <div>
            <input type="text" value={this.state.searchTerm} onChange={this.onChange.bind(this)} />
            <select onChange={this.onSelect.bind(this)}>
                {options}
            </select>
            <button onClick={this.filter.bind(this)}>Search</button>
            <button onClick={this.clearFilter.bind(this)}>Clear</button>
        </div>;
    }
}