import {ClayInput, ClaySelectWithOption} from '@clayui/form';
import React, {useState} from 'react';

import {
	ConditionBuilder,
	DefaultValueInput,
	generateConditionId,
} from 'src/main/resources/META-INF/resources/condition_builder/ConditionBuilder';

import {SheetDecorator} from '../decorators';

export default {
	component: ConditionBuilder,
	decorators: [SheetDecorator],
	title: 'Components/ConditionBuilder',
};

// ── Shared operator definitions ───────────────────────────────────────────────

const OPERATORS = {
	boolean: [
		{label: 'Is', value: 'eq'},
		{label: 'Is Not', value: 'not-eq'},
	],
	date: [
		{label: 'Equals', value: 'eq'},
		{label: 'Not Equals', value: 'not-eq'},
		{label: 'After', value: 'gt'},
		{label: 'On or After', value: 'ge'},
		{label: 'Before', value: 'lt'},
		{label: 'On or Before', value: 'le'},
	],
	double: [
		{label: 'Equals', value: 'eq'},
		{label: 'Not Equals', value: 'not-eq'},
		{label: 'Greater Than', value: 'gt'},
		{label: 'Greater Than or Equals', value: 'ge'},
		{label: 'Less Than', value: 'lt'},
		{label: 'Less Than or Equals', value: 'le'},
	],
	integer: [
		{label: 'Equals', value: 'eq'},
		{label: 'Not Equals', value: 'not-eq'},
		{label: 'Greater Than', value: 'gt'},
		{label: 'Greater Than or Equals', value: 'ge'},
		{label: 'Less Than', value: 'lt'},
		{label: 'Less Than or Equals', value: 'le'},
	],
	picklist: [
		{label: 'Includes', value: 'includes'},
		{label: 'Excludes', value: 'excludes'},
	],
	string: [
		{label: 'Equals', value: 'eq'},
		{label: 'Not Equals', value: 'not-eq'},
		{label: 'Contains', value: 'contains'},
		{label: 'Does Not Contain', value: 'not-contains'},
	],
};

const getOperatorsByType = (property) =>
	OPERATORS[property.type] ?? OPERATORS.string;

// ── Story wrapper ─────────────────────────────────────────────────────────────

function Demo({description, getOperators, properties, renderValueInput, showConjunctionPicker, title}) {
	const [conditions, setConditions] = useState([{id: generateConditionId()}]);
	const [conditionType, setConditionType] = useState('all');

	return (
		<div style={{marginBottom: 48}}>
			<h3 style={{marginBottom: 4}}>{title}</h3>

			<p style={{color: '#6b6c7e', marginBottom: 16}}>{description}</p>

			<ConditionBuilder
				conditions={conditions}
				conditionType={conditionType}
				getOperators={getOperators}
				onChange={(newConditions, newType) => {
					setConditions(newConditions);
					setConditionType(newType);
				}}
				properties={properties}
				renderValueInput={renderValueInput}
				showConjunctionPicker={showConjunctionPicker}
			/>

			<pre
				style={{
					background: '#f5f5f5',
					borderRadius: 4,
					fontSize: 11,
					marginTop: 16,
					padding: 12,
				}}
			>
				{JSON.stringify({conditionType, conditions}, null, 2)}
			</pre>
		</div>
	);
}

// ── Story 1: Collections Filter (LPD-74731) ───────────────────────────────────
//
// Full OData operator set. Properties come from CMS (DDM ClassTypeField) and
// Object fields, normalized to GenericProperty by an adapter at the JSP layer.
// DefaultValueInput handles all standard types out of the box.

const COLLECTIONS_PROPERTIES = [
	{label: 'Title', name: 'title', type: 'string'},
	{label: 'Author', name: 'author', type: 'string'},
	{label: 'Publish Date', name: 'publishDate', type: 'date'},
	{label: 'Price', name: 'price', type: 'double'},
	{label: 'Featured', name: 'featured', type: 'boolean'},
	{
		label: 'Category',
		name: 'category',
		options: [
			{label: 'Technology', value: 'technology'},
			{label: 'Business', value: 'business'},
			{label: 'Design', value: 'design'},
		],
		type: 'picklist',
	},
];

export const CollectionsFilter = () => (
	<Demo
		description="Full OData operator set · CMS + Object fields · AND/ANY conjunction"
		getOperators={getOperatorsByType}
		properties={COLLECTIONS_PROPERTIES}
		renderValueInput={DefaultValueInput}
		showConjunctionPicker
		title="Collections Filter (LPD-74731)"
	/>
);

// ── Story 2: Objects View Filter ──────────────────────────────────────────────
//
// Operators are restricted per Objects business types (picklist → includes/
// excludes, date → range operators, integer → numeric comparisons).
// showConjunctionPicker is false because Objects view filters are AND-only.
// A real implementation would replace DefaultValueInput with a custom renderer
// that fetches picklist entries and relationship objects asynchronously.

const OBJECTS_PROPERTIES = [
	{
		label: 'Status',
		name: 'status',
		options: [
			{label: 'Approved', value: '0'},
			{label: 'Draft', value: '2'},
			{label: 'Pending', value: '1'},
		],
		type: 'picklist',
	},
	{
		label: 'Category',
		name: 'category',
		options: [
			{label: 'Electronics', value: 'electronics'},
			{label: 'Furniture', value: 'furniture'},
		],
		type: 'picklist',
	},
	{label: 'Created Date', name: 'createDate', type: 'date'},
	{label: 'Modified Date', name: 'modifiedDate', type: 'date'},
	{label: 'Quantity', name: 'quantity', type: 'integer'},
];

const getObjectsOperators = (property) => {
	if (property.type === 'picklist') {
		return OPERATORS.picklist;
	}

	if (property.type === 'integer') {
		return OPERATORS.integer;
	}

	if (property.type === 'date') {
		return [
			{label: 'Range', value: 'range'},
			{label: 'Before', value: 'lt'},
			{label: 'After', value: 'gt'},
		];
	}

	return OPERATORS.string;
};

export const ObjectsViewFilter = () => (
	<Demo
		description="Restricted operator set per Objects business types · AND-only (no conjunction picker)"
		getOperators={getObjectsOperators}
		properties={OBJECTS_PROPERTIES}
		renderValueInput={DefaultValueInput}
		showConjunctionPicker={false}
		title="Objects View Filter"
	/>
);

// ── Story 3: Page Editor Rule Conditions ──────────────────────────────────────
//
// Only boolean fragment input fields, only eq/not-eq operators.
// Demonstrates a custom renderValueInput — a real implementation would read
// fragment inputs from the page editor Redux store and pass them as properties.

const PAGE_EDITOR_PROPERTIES = [
	{label: 'Consent Checkbox', name: 'consentField', type: 'boolean'},
	{label: 'Newsletter Opt-in', name: 'newsletterField', type: 'boolean'},
	{label: 'Terms Accepted', name: 'termsField', type: 'boolean'},
];

const PAGE_EDITOR_OPERATORS = [
	{label: 'Is', value: 'equal'},
	{label: 'Is Not', value: 'not-equal'},
];

const pageEditorValueInput = (_property, _operator, value, onChange) => (
	<ClaySelectWithOption
		aria-label="Value"
		onChange={(e) => onChange(e.target.value)}
		options={[
			{label: '-- Select --', value: ''},
			{label: 'True', value: 'true'},
			{label: 'False', value: 'false'},
		]}
		value={value ?? ''}
	/>
);

export const PageEditorRuleConditions = () => (
	<Demo
		description="Boolean fields only · eq / not-eq only · custom renderValueInput · AND/ANY conjunction"
		getOperators={() => PAGE_EDITOR_OPERATORS}
		properties={PAGE_EDITOR_PROPERTIES}
		renderValueInput={pageEditorValueInput}
		showConjunctionPicker
		title="Page Editor Rule Conditions"
	/>
);

// ── Story 4: All Three Side-by-Side ──────────────────────────────────────────

export const AllConsumers = () => (
	<>
		<CollectionsFilter />
		<ObjectsViewFilter />
		<PageEditorRuleConditions />
	</>
);
