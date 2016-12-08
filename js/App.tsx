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
    headers?: string[];
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
        return <div>
            <SearchTextbox />
            <Table {...this.props} headers={this.state.headers}/>
        </div>;
    }
}

function sortData(data: IPeople[], columnName: string, descending: boolean) {
    let order = descending ? 'desc' : 'asc';
    return _.orderBy(data, columnName, order);
}

function filterData(data: IPeople[], condition: (p: IPeople) => boolean) {
    return data.filter(condition);
}

function fullStringMatch(searchTerm: string, columnName: string) {
    return function (p: IPeople) {
        return p[columnName].toLowerCase() === searchTerm.toLowerCase();
    };
}

function subSectionMatch(data: IPeople[], start: number, end: number) {
    return data.slice(start, end);
}

function pager(pageSize: number) {
    // index of 0
    return function getPage(data: IPeople[], page: number) {
        if (page < 0) page = 0;
        if (page > data.length - 1) { page = data.length - 1;}
        return subSectionMatch(data, page * pageSize, (page + 1) * pageSize); 
    };
}