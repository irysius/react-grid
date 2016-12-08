class Table extends React.Component<IPeopleData, any> {
    constructor(props) {
        super(props);
    }
    render() {
        let rowHeader = <span>Row Header Placeholder</span>;
        let rows = this.props.people.map(person => {
            return <div key={person.id}>{person.first_name}</div>;
        });
        return <div>
            <div>
                {rowHeader}
            </div>
            <div>
                {rows}
            </div>
        </div>;
    }
}