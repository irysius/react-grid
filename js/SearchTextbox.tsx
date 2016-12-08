interface ISearchTextbox {
    filter: Function;
    filterDebounced: Function;
}
interface ISearchTextboxState {
    searchTerm: string;
}
class SearchTextbox extends React.Component<IAppState, ISearchTextboxState> implements ISearchTextbox {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        };
        // http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js/24679479#24679479
        this.filterDebounced = _.debounce(function () {
            this.filter.apply(this, [this.state.searchTerm]);
        }.bind(this), 100);
    }

    filterDebounced;
    filter(searchTerm: string) {
        
    }

    onChange(event) {
        this.setState({ searchTerm: event.target.value });
        this.filterDebounced();
    }

    render() {
        return <div>
            <input type="text" value={this.state.searchTerm} onChange={this.onChange.bind(this)} />
            <select>
                <option>id</option>
            </select>
        </div>;
    }
}