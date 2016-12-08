interface IPagerProps {
    currentPageIndex: number;
    numberOfPages: number;
}

class Pager extends React.Component<IPagerProps, any> {
    goToPage(pageIndex: number) {
        console.log('going to page', pageIndex);
        paginate = navigateToPage(pageIndex);
        refresh();
    }

    render() {
        console.log(this.props);
        let pages = _.times(this.props.numberOfPages).map((index) => {
            return <li key={index}
                className={index === this.props.currentPageIndex ? "active" : null}>
                <a href="#" onClick={this.goToPage.bind(this, index)}>{index + 1}</a>
            </li>;
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

function navigateToPage(pageIndex: number) {
    return function (data: IPeopleData) {
        let numberOfPages = Math.ceil(data.people.length / pageSize * 1.0);
        data.people = getPage(data.people, pageIndex);
        data.pagingData = {
            currentPageIndex: pageIndex,
            numberOfPages: numberOfPages
        };
        return data;
    };
}