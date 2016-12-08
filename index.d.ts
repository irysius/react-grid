/// <reference path="typings/index.d.ts" />
import React = __React;
declare var render: (data: IPeopleData) => void;
declare var peopleData: IPeople[];
declare var pageSize: number;
declare var currentPageIndex: number;
declare var getPage: (data: IPeople[], pageIndex: number) => IPeople[];

declare var filter: (data: IPeopleData) => IPeopleData;
declare var sort: (data: IPeopleData) => IPeopleData;
declare var paginate: (data: IPeopleData) => IPeopleData;

declare var refresh: () => void;
