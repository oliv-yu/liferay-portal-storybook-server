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
	{label: 'Title', name: 'BASIC_WEB_CONTENT__title', type: 'string'},
	{label: 'Summary', name: 'BASIC_WEB_CONTENT__summary', type: 'string'},
	{
		label: 'Publish Date',
		name: 'BASIC_WEB_CONTENT__displayDate',
		type: 'date',
	},
	{label: 'Price', name: 'Book__price', type: 'double'},
	{label: 'Stock Count', name: 'Book__stockCount', type: 'integer'},
	{label: 'Featured', name: 'Book__featured', type: 'boolean'},
	{
		label: 'Genre',
		name: 'Book__genre',
		options: [
			{label: 'Fiction', value: 'fiction'},
			{label: 'Non-Fiction', value: 'non-fiction'},
			{label: 'Biography', value: 'biography'},
		],
		type: 'picklist',
	},
];

const NAMESPACE = '_com_liferay_asset_list_web_portlet_AssetListPortlet_';

function Demo({initialConditionType, initialConditions}) {
	const [state, setState] = useState(null);

	return (
		<>
			<CollectionFilterBuilder
				initialConditionType={initialConditionType}
				initialConditions={initialConditions}
				namespace={NAMESPACE}
				onChange={setState}
				properties={MOCK_PROPERTIES}
			/>

			<div className="mt-4">
				<div className="text-secondary">
					Written to <code>{NAMESPACE}fieldCriteria</code> hidden input:
				</div>

				<pre
					style={{
						background: '#f5f5f5',
						borderRadius: 4,
						fontSize: 11,
						marginTop: 8,
						padding: 12,
					}}
				>
					{JSON.stringify(state, null, 2)}
				</pre>
			</div>
		</>
	);
}

export const Empty = () => <Demo />;

export const WithInitialConditions = () => (
	<Demo
		initialConditionType="any"
		initialConditions={[
			{
				id: 'pre-1',
				operatorName: 'contains',
				propertyName: 'BASIC_WEB_CONTENT__title',
				value: 'Liferay',
			},
			{
				id: 'pre-2',
				operatorName: 'eq',
				propertyName: 'Book__featured',
				value: 'true',
			},
			{
				id: 'pre-3',
				operatorName: 'gt',
				propertyName: 'Book__price',
				value: '19.99',
			},
		]}
	/>
);
