interface IRowHeaderState {
    prevSortColumn: string;
}

class RowHeader extends React.Component<IAppState, IRowHeaderState> {
    constructor(props) {
        super(props);
        this.state = {
            prevSortColumn: ''
        };
    }

    sort(columnName: string) {
        // emit sort event to bus
        updateHeaderState(this.props.headers, columnName, this.state.prevSortColumn);

        this.setState({
            prevSortColumn: (this.state.prevSortColumn == columnName) ? '' : columnName
        });
    }

    render() {
        let classNames = ['col-md-1', 'col-md-2', 'col-md-2', 'col-md-3', 'col-md-1', 'col-md-3'];
        let headerCells = classNames.map((className, index) => {
            return <div key={index} className={className} onClick={this.sort.bind(this, this.props.headers[index])}>{this.props.headers[index]}</div>
        });
        return <div className="row header-row">
            { headerCells }
        </div>
    }
}