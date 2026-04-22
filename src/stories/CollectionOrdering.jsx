import React from 'react';

import CollectionOrdering from 'src/main/resources/META-INF/resources/js/components/CollectionOrdering/index';

import {SheetDecorator} from '../decorators';

export default {
	component: CollectionOrdering,
	decorators: [SheetDecorator],
	title: 'Components/CollectionOrdering',
};

const MOCK_PROPERTIES = [
	{
		label: 'CMS Object',
		items: [
			{
				classNameId: 10001,
				classTypeId: 20001,
				label: 'Author',
				name: 'author',
				sortable: true,
				type: 'string',
			},
			{
				classNameId: 10001,
				classTypeId: 20001,
				label: 'Price',
				name: 'price',
				sortable: true,
				type: 'decimal',
			},
			{
				classNameId: 10001,
				classTypeId: 20001,
				label: 'Stock Count',
				name: 'stockCount',
				sortable: true,
				type: 'integer',
			},
		],
	},
];

const NAMESPACE = '_com_liferay_asset_list_web_portlet_AssetListPortlet_';

function Demo(props) {
	return (
		<CollectionOrdering
			namespace={NAMESPACE}
			properties={MOCK_PROPERTIES}
			{...props}
		/>
	);
}

export const Default = () => <Demo />;

export const WithEmptyProperties = () => <Demo properties={[]} />;

export const WithStaticInitialColumn = () => (
	<Demo
		initialOrderByColumn1="modifiedDate"
		initialOrderByColumn2="createDate"
		initialOrderByType1="DESC"
		initialOrderByType2="ASC"
	/>
);

export const WithJSONInitialColumn = () => (
	<Demo
		initialOrderByColumn1={JSON.stringify({
			classNameId: 10001,
			classTypeId: 20001,
			name: 'price',
		})}
		initialOrderByColumn2={JSON.stringify({
			classNameId: 10001,
			classTypeId: 20001,
			name: 'author',
		})}
		initialOrderByType1="DESC"
		initialOrderByType2="ASC"
	/>
);
