class Table extends React.Component<IPeopleData, any> {
    constructor(props) {
        super(props);
    }
    render() {
        let rowHeader = <span>Row Header Placeholder</span>;
        let rows = this.props.people.map(person => {
            return <Row key={person.id} {...person} />;
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