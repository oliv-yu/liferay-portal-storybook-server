import React from "react";
import {ClayIconSpriteContext} from "@clayui/icon";

import "@portal/modules/apps/frontend-theme/frontend-theme-admin/build/css/main.scss";
import "@portal/modules/apps/frontend-theme/frontend-theme-admin/build/css/clay.scss";

import "src/main/resources/META-INF/resources/css/main.scss";

const SPRITEMAP_PATH = "icons.svg";

export const parameters = {
	actions: {argTypesRegex: "^on[A-Z].*"},
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	options: {
		// https://storybook.js.org/docs/ember/writing-stories/naming-components-and-hierarchy
		storySort: {
			order: ["Pages", "Components"],
		},
	},
};

export const decorators = [
	(Story) => (
		<ClayIconSpriteContext.Provider value={SPRITEMAP_PATH}>
			<Story />
		</ClayIconSpriteContext.Provider>
	),
];
export const tags = ["autodocs"];
