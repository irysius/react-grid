interface IPagerProps {
    currentPageIndex: number;
    numberOfPages: number;
}

class Pager extends React.Component<IPagerProps, any> {
    goToPage(pageIndex: number) {
        console.log(pageIndex);
    }

    render() {
        let pages = _.times(this.props.numberOfPages).map((index) => {
            return <li key={index}><a href="#" onClick={this.goToPage.bind(this, index)}>{index + 1}</a></li>;
        });

        return (
            <nav aria-label="Page navigation">
            <ul className="pagination">
                <li className={this.props.currentPageIndex <= 0 ? "disabled" : null}>
                    <a href="#" aria-label="Previous" onClick={this.goToPage.bind(this, this.props.currentPageIndex - 1)}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                { pages }
                <li className={this.props.currentPageIndex >= this.props.numberOfPages - 1 ? "disabled" : null }>
                    <a href="#" aria-label="Next" onClick={this.goToPage.bind(this, this.props.currentPageIndex + 1)}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
            </nav>
        );
    }
}