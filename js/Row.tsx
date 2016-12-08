// IPeople {
// id, first_name, last_name, email, gender, ip_address
//}

class Row extends React.Component<IPeople, any> {
    render() {
        return (
            <div className="row">
                <div className="col-md-1">{this.props.id}</div>
                <div className="col-md-2">{this.props.first_name}</div>
                <div className="col-md-2">{this.props.last_name}</div>
                <div className="col-md-3">{this.props.email}</div>
                <div className="col-md-1">{this.props.gender}</div>
                <div className="col-md-3">{this.props.ip_address}</div>
            </div>
        )
    }
}