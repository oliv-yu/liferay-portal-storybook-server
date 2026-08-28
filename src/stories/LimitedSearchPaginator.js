import React from "react";

import LimitedSearchPaginator from "src/main/resources/META-INF/resources/js/components/search_paginator/LimitedSearchPaginator";
import {LanguageIdDecorator} from "../decorators";
import {argTypes, baseProps} from "../searchPaginatorProps";

/**
 * The paginator that shows a limited range of pages, for a total that is only
 * accurate up to the accurate count limit. It links no end page and hides
 * nothing behind an ellipsis; a window slides to keep the active page in the
 * middle, clamping at the start.
 */
export default {
	title: "Components/LimitedSearchPaginator",
	decorators: [LanguageIdDecorator],
	component: LimitedSearchPaginator,
	argTypes: {
		...argTypes,
		visiblePageCount: {control: {type: "select"}, options: [3, 5, 7]},
	},
};

const Template = ({bcp47LanguageId, ...args}) => (
	<LimitedSearchPaginator {...baseProps} {...args} />
);

/**
 * An approximate total, which is what this paginator is for. The count reads
 * as a floor and the forward arrow stays live past the last counted page.
 */
export const Default = Template.bind({});

Default.args = {
	activeDelta: 20,
	activePage: 3,
	bcp47LanguageId: "en-US",
	showDeltasDropDown: true,
	totalItems: 1000,
	totalItemsApproximate: true,
	visiblePageCount: 5,
};

/**
 * Several pages in, where the window has slid away from the start and no
 * longer shows page 1.
 */
export const DeepPage = Template.bind({});

DeepPage.args = {
	...Default.args,
	activePage: 17,
};

/**
 * The last page the floor accounts for. Only the pages the total covers are
 * linked, so the window is short here, but paging forward stays available
 * because results may still follow.
 */
export const AtLastKnownPage = Template.bind({});

AtLastKnownPage.args = {
	...Default.args,
	activePage: 50,
};

/**
 * The same window with an exact total. The last page is genuinely the last, so
 * the forward arrow disables, which is the only thing the approximate flag
 * changes here.
 */
export const ExactTotal = Template.bind({});

ExactTotal.args = {
	...Default.args,
	activePage: 50,
	totalItemsApproximate: false,
};

/**
 * A narrower window, showing that visiblePageCount sizes the range rather than
 * deciding whether there is one.
 */
export const NarrowWindow = Template.bind({});

NarrowWindow.args = {
	...Default.args,
	activePage: 17,
	visiblePageCount: 3,
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
