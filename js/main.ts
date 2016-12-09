import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
import * as axios from 'axios';
import { App, IAppProps } from './App';
import { PagingCalculator } from './Pager';
import { IColumnMap } from './RowHeader';

var AppFactory = React.createFactory<IAppProps>(App);
function render(data: IAppProps) {
    ReactDOM.render(
        AppFactory(data),
        document.getElementById('mount'));
}

let columns: IColumnMap = {
    id: { className: 'col-md-1' },
    first_name: { className: 'col-md-2' },
    last_name: { className: 'col-md-2' },
    email: { className: 'col-md-3' },
    gender: { className: 'col-md-1' },
    ip_address: { className: 'col-md-3' }
};

let filter, sort, paginate;

function navigateToPage(pageIndex: number) {
    paginate = function (data: IAppProps) {
        let numberOfPages = Math.ceil(data.collection.length / pageSize * 1.0);
        data.collection = getPage(data.collection, pageIndex);
        data.pagingData = {
            currentPageIndex: pageIndex,
            numberOfPages: numberOfPages
        };
        return data;
    };
}
function updateHeaderState(columns: IColumnMap, currSortCol: string, prevSortCol: string) {
    console.log("now sorting: " + currSortCol + " | previously sorting: " + prevSortCol + "\n");
    sort = function (data: IAppProps) {
        data.collection = sortData(data.collection, currSortCol, (currSortCol == prevSortCol));
        return data;
    };
}
function sortData(data: any[], columnName: string, descending: boolean) {
    let order = descending ? 'desc' : 'asc';
    return _.orderBy(data, columnName, order);
}

function updateFilterState(searchTerm: string, searchColumn: string) {
    if (!searchTerm && !searchColumn) {
        filter = x => x;
    } else {
        filter = function (data: IAppProps) {
            data.collection = filterData(data.collection, fullStringMatch(searchTerm, searchColumn));
            return data;
        }
    }
}

function filterData(data: any[], condition: (p: any) => boolean) {
    return data.filter(condition);
}
function fullStringMatch(searchTerm: string, columnName: string) {
    return function (p: any) {
        return ('' + p[columnName]).toLowerCase() === searchTerm.toLowerCase();
    };
}

navigateToPage(0);

let pageSize = 10;
let currentPageIndex = 0;
let getPage = PagingCalculator(pageSize);
let peopleData = [];


// On initial load
axios.get('./data/simple-rows.json').then(function (response) {
    peopleData = response.data as any;
    refresh();
});

function refresh() {
    (<any>window).testData = peopleData;
    let data = {
        collection: peopleData,
        columns: columns,
        pagingData: null,
        refresh: refresh,
        setSort: updateHeaderState,
        setFilter: updateFilterState,
        setPagination: navigateToPage
    };

    data = filter ? filter(data) : data;
    data = sort ? sort(data) : data;
    data = paginate ? paginate(data) : data;
    
    render(data);
}