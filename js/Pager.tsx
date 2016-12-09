interface IPagerProps {
    currentPageIndex: number;
    numberOfPages: number;
    maxVisiblePages?: number;
}

class Pager extends React.Component<IPagerProps, any> {
    goToPage(pageIndex: number) {
        paginate = navigateToPage(pageIndex);
        refresh();
    }

    render() {
        let setLength = this.props.maxVisiblePages || 5;
        let prevButton = (function () {
            if (this.props.currentPageIndex <= 0) {
                return <li className="disabled">
                    <a href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>;
            } else {
                return <li>
                    <a href="#" aria-label="Previous" onClick={this.goToPage.bind(this, this.props.currentPageIndex - 1)}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>;
            }
        }.bind(this))();
        let prevSetButton = (function () {
            if (this.props.currentPageIndex - setLength < 0) {
                return null;
            } else {
                return <li>
                    <a href="#" aria-label="Previous Set" onClick={this.goToPage.bind(this, this.props.currentPageIndex - setLength)}>
                        <span aria-hidden="true">&hellip;</span>
                    </a>
                </li>;
            }
        }.bind(this))();
        let nextButton = (function () {
            if (this.props.currentPageIndex >= this.props.numberOfPages - 1) {
                return <li className="disabled">
                    <a href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>;
            } else {
                return <li>
                    <a href="#" aria-label="Next" onClick={this.goToPage.bind(this, this.props.currentPageIndex + 1)}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>;
            }
        }.bind(this))();
        let nextSetButton = (function () {
            if (this.props.currentPageIndex + setLength > this.props.numberOfPages - 1) {
                return null;
            } else {
                return <li>
                    <a href="#" aria-label="Next Set" onClick={this.goToPage.bind(this, this.props.currentPageIndex + 1 + setLength)}>
                        <span aria-hidden="true">&hellip;</span>
                    </a>
                </li>;
            }
        }.bind(this))();

        let pageSet = null;
        _.chunk(_.times(this.props.numberOfPages), setLength).some(set => {
            let first = set[0]
            let last = set[set.length - 1];
            if (first <= this.props.currentPageIndex && this.props.currentPageIndex <= last) {
                pageSet = set;
                return true;
            } else {
                return false;
            }
        });
        console.log(pageSet);
        let pages = (pageSet || []).map((index) => {
            return <li key={index}
                className={index === this.props.currentPageIndex ? "active" : null}>
                <a href="#" onClick={this.goToPage.bind(this, index)}>{index + 1}</a>
            </li>;
        });

        return (
            <nav aria-label="Page navigation">
            <ul className="pagination">
                { prevButton }
                { prevSetButton }
                { pages }
                { nextSetButton }
                { nextButton }
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