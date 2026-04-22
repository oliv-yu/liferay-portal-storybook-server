import React, {useState} from 'react';

import CollectionFilterBuilder from 'src/main/resources/META-INF/resources/js/components/CollectionFilterBuilder/index';

import {SheetDecorator} from '../decorators';

export default {
	component: CollectionFilterBuilder,
	decorators: [SheetDecorator],
	title: 'Components/CollectionFilterBuilder',
};

// A realistic mix of CMS (DDM ClassTypeField-backed) properties and Object
// properties, normalized to the GenericProperty shape by a JSP-side adapter
// in production. The `name` is the portable `structureKey__fieldReference`
// proposed by the LPD-74731 portability NFR — not a DB-ID-encoded DDM name.
const MOCK_PROPERTIES = [
	{
		label: Liferay.Language.get('common-fields'),
		items: [
			{label: 'Title', name: 'title', type: 'string'},
			{label: 'Summary', name: 'summary', type: 'string'},
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
		],
	},
];

// When more than one asset type (or subtype) is selected in the source panel,
// the per-type field groups can collide, so Source.js writes only the first
// "Common Fields" group to `propertiesAtom`. This mock mirrors the full,
// multi-group payload the server returns before that collapse.
const MOCK_PROPERTIES_MULTIPLE_TYPES = [
	...MOCK_PROPERTIES,
	{
		label: 'Blog',
		items: [
			{label: 'Content', name: 'content', type: 'string'},
			{label: 'Subtitle', name: 'subtitle', type: 'string'},
		],
	},
	{
		label: 'Document',
		items: [
			{label: 'File Name', name: 'fileName', type: 'string'},
			{label: 'MIME Type', name: 'mimeType', type: 'string'},
		],
	},
];

const NAMESPACE = '_com_liferay_asset_list_web_portlet_AssetListPortlet_';

function Demo({initialConditions, properties = MOCK_PROPERTIES}) {
	const [state, setState] = useState(null);

	return (
		<>
			<CollectionFilterBuilder
				initialConditions={initialConditions}
				namespace={NAMESPACE}
				onChange={setState}
				properties={properties}
			/>
		</>
	);
}

export const Empty = () => <Demo />;

// Multiple types selected: Source.js collapses the multi-group payload to just
// the first "Common Fields" group, so only those shared fields are available.
export const MultipleTypes = () => (
	<Demo properties={MOCK_PROPERTIES_MULTIPLE_TYPES.slice(0, 1)} />
);

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
