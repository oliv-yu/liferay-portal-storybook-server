import React from "react";

import ClassicSearchPaginator from "src/main/resources/META-INF/resources/js/components/search_paginator/ClassicSearchPaginator";
import {LanguageIdDecorator} from "../decorators";
import {argTypes, baseProps} from "../searchPaginatorProps";

/**
 * The paginator that shows every page the total accounts for: the first and
 * last pages are links and the pages between them sit behind an ellipsis
 * dropdown. It wants an exact total, since both are derived from the page
 * count.
 */
export default {
	title: "Components/ClassicSearchPaginator",
	decorators: [LanguageIdDecorator],
	component: ClassicSearchPaginator,
	argTypes,
};

const Template = ({bcp47LanguageId, ...args}) => (
	<ClassicSearchPaginator {...baseProps} {...args} />
);

export const Default = Template.bind({});

Default.args = {
	activeDelta: 20,
	activePage: 3,
	bcp47LanguageId: "en-US",
	showDeltasDropDown: true,
	totalItems: 1234,
	totalItemsApproximate: false,
};

/**
 * The first page, where the previous arrow is disabled.
 */
export const FirstPage = Template.bind({});

FirstPage.args = {
	...Default.args,
	activePage: 1,
};

/**
 * The last page, where the next arrow is disabled.
 */
export const LastPage = Template.bind({});

LastPage.args = {
	...Default.args,
	activePage: 62,
};

/**
 * A locale that groups digits differently, showing that the counts are
 * formatted for the reader rather than printed as bare numbers.
 */
export const LocalizedCounts = Template.bind({});

LocalizedCounts.args = {
	...Default.args,
	bcp47LanguageId: "de-DE",
	totalItems: 1234567,
};

/**
 * A fixed page size, which hides the items per page picker.
 */
export const WithoutDeltasDropDown = Template.bind({});

WithoutDeltasDropDown.args = {
	...Default.args,
	showDeltasDropDown: false,
};

/**
 * An approximate total handed to this paginator. The count reads as a floor,
 * but the last page link and the ellipsis contents are still derived from it,
 * so they point at pages that may not be the last. Use LimitedSearchPaginator
 * when the total is approximate.
 */
export const ApproximateTotalCaveat = Template.bind({});

ApproximateTotalCaveat.args = {
	...Default.args,
	totalItems: 1000,
	totalItemsApproximate: true,
};
