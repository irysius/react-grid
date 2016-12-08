// IPeople {
// id, first_name, last_name, email, gender, ip_address
//}

class Row extends React.Component<IPeople, any> {
    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.first_name}</td>
                <td>{this.props.last_name}</td>
                <td>{this.props.email}</td>
                <td>{this.props.gender}</td>
                <td>{this.props.ip_address}</td>
            </tr>
        )
    }
}