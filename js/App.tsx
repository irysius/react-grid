interface IPeople {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;
}
interface IPeopleData {
    people: IPeople[];
    [others: string]: any;
}
interface IAppState {
    headers: string[];
}

class App extends React.Component<IPeopleData, IAppState> {
    constructor(props: IPeopleData) {
        super(props);
        this.state = {
            headers: Object.keys(props.people[0] || {}) 
        };
    }
    render() {
        return <Table {...this.props} headers={this.state.headers}/>;
    }
}