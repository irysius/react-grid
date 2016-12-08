interface IPeople {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: 'Male'|'Female';
    ip_address: string;
}
interface IPeopleData {
    people: IPeople[];
}

class App extends React.Component<IPeopleData, any> {
    constructor(props) {
        super(props);
    }
    render() {
        return <Table {...this.props} />;
    }
}