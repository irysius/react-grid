interface ISearchTextbox {
    filter: Function;
    filterDebounced: Function;
}
interface ISearchTextboxState {
    searchTerm?: string;
    searchColumn?: string;
}
class SearchTextbox extends React.Component<any, ISearchTextboxState> implements ISearchTextbox {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            searchColumn: this.props.headers[0]
        };
        // http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js/24679479#24679479
        this.filterDebounced = _.debounce(function () {
            this.filter.apply(this, [this.state.searchTerm]);
        }.bind(this), 100);
    }

    filterDebounced;
    filter(searchTerm: string) {
        filter = updateFilterState(this.state.searchTerm, this.state.searchColumn);

        refresh();
    }

    clearFilter() {
        if(!this.state.searchTerm.length) return false;

        this.setState({
            searchTerm: '',
            searchColumn: ''
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
        var options = this.props.headers.map(function(header, index) {
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