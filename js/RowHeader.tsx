class RowHeader extends React.Component<IAppState, any> {
    render() {
        return <div className="header-row">
            <div className="col-md-1">{this.props.headers[0]}</div>
            <div className="col-md-2">{this.props.headers[1]}</div>
            <div className="col-md-2">{this.props.headers[2]}</div>
            <div className="col-md-3">{this.props.headers[3]}</div>
            <div className="col-md-1">{this.props.headers[4]}</div>
            <div className="col-md-3">{this.props.headers[5]}</div>
        </div>
    }
}