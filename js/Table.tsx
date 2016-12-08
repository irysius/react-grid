class Table extends React.Component<IPeopleData, any> {
    constructor(props) {
        super(props);
    }
    render() {
        // console.log(this.props.headers);
        let rowHeader = <RowHeader {...this.props} />;
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