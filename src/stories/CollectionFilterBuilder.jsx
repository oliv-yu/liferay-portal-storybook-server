import React, {useState} from 'react';

import CollectionFilterBuilder from 'src/main/resources/META-INF/resources/js/components/CollectionFilterBuilder/index';

import {SheetPlainDecorator} from '../decorators';

export default {
	component: CollectionFilterBuilder,
	decorators: [SheetPlainDecorator],
	title: 'Components/CollectionFilterBuilder',
};

// A realistic mix of CMS (DDM ClassTypeField-backed) properties and Object
// properties, normalized to the GenericProperty shape by a JSP-side adapter
// in production. The `name` is the portable `structureKey__fieldReference`
// proposed by the LPD-74731 portability NFR — not a DB-ID-encoded DDM name.
const MOCK_PROPERTIES = [
	{label: 'Title', name: 'title', type: 'text'},
	{label: 'Summary', name: 'summary', type: 'text'},
	{
		label: 'Publish Date',
		name: 'displayDate',
		type: 'date',
	},
	{
		label: 'Publish Date Time',
		name: 'displayDateTime',
		type: 'date-time',
	},
	{label: 'Integer', name: 'integer', type: 'integer'},
	{label: 'Number', name: 'number', type: 'numeric'},
	{label: 'Price', name: 'price', type: 'decimal'},
	{
		label: 'Stock Count',
		name: 'stockCount',
		type: 'integer',
	},
	{label: 'Featured', name: 'featured', type: 'boolean'},
	{
		label: 'Genre',
		name: 'genre',
		options: [
			{label: 'Fiction', value: 'fiction'},
			{label: 'Non-Fiction', value: 'non-fiction'},
			{label: 'Biography', value: 'biography'},
		],
		type: 'picklist',
	},
];

const NAMESPACE = '_com_liferay_asset_list_web_portlet_AssetListPortlet_';

function Demo({initialConditions}) {
	const [state, setState] = useState(null);

	return (
		<>
			<CollectionFilterBuilder
				initialConditions={initialConditions}
				namespace={NAMESPACE}
				onChange={setState}
				properties={MOCK_PROPERTIES}
			/>
		</>
	);
}

export const Empty = () => <Demo />;

export const WithInitialConditions = () => (
	<Demo
		initialConditionType="any"
		initialConditions={[
			{
				operatorName: 'contains',
				propertyName: 'title',
				value: 'Liferay',
			},
			{
				operatorName: 'eq',
				propertyName: 'featured',
				value: 'true',
			},
			{
				operatorName: 'between',
				propertyName: 'price',
				value: ['19.99', '20.00'],
			},
		]}
	/>
);
