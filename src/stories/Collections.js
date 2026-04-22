import React from "react";

import AssetFilterBuilder from "src/main/resources/META-INF/resources/js/components/AssetFilterBuilder";
import learnMessages from "../../static/learn-resources/search-experiences-web.json";
import {SheetDecorator} from "../decorators";

import "src/main/resources/META-INF/resources/sxp_blueprint_options/css/main.scss";

export default {
	title: "Components/Collections",
	decorators: [SheetDecorator],
	component: AssetFilterBuilder,
	args: {},
};

const Template = (args) => <AssetFilterBuilder rules={[]} {...args} />;

export const Default = Template.bind({});
