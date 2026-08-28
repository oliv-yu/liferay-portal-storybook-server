/**
 * Fixtures shared by the ClassicSearchPaginator and LimitedSearchPaginator
 * stories, standing in for what
 * SearchResultsPaginatorReactDataBuilder sends from the server.
 *
 * This lives outside "src/stories" on purpose: the Storybook config globs every
 * JS file under that directory as a story, so a helper placed there would be
 * picked up as one.
 */

export const DELTAS = [10, 20, 30, 50].map((label) => ({
	href: `#delta=${label}`,
	label,
}));

/**
 * Page links point at the fragment rather than a real search URL, so clicking
 * one stays inside the story instead of navigating the Storybook frame away.
 */
export const baseProps = {
	deltas: DELTAS,
	paginationURLTemplate: "#start={0}",
};

export const argTypes = {
	activeDelta: {control: {type: "select"}, options: [10, 20, 30, 50]},
	activePage: {control: {min: 1, type: "number"}},
	bcp47LanguageId: {
		control: {type: "select"},
		options: ["en-US", "de-DE", "fr-FR", "ja-JP", "pt-BR"],
	},
};
