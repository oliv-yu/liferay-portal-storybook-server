import React from "react";

import SelectVocabularies from "src/main/resources/META-INF/resources/js/components/SelectVocabularies";
import "src/main/resources/META-INF/resources/css/main.scss";
import portalSearchWeb from "../../static/learn-resources/portal-search-web.json";

/**
 * `groups` mirrors the JSON array built server side by
 * CategoryFacetConfigurationDisplayContext.getGroupsJSONArray(). Each group
 * carries its own external reference code, and every vocabulary underneath it
 * is keyed by "<groupERC>&&<vocabularyERC>" — the vocabulary is always paired
 * with the group that actually owns it. Asset libraries additionally carry an
 * `assetLibraryKey` and are listed after the sites, sorted by name.
 */

const GUEST_SITE = {
	children: [
		{
			externalReferenceCode:
				"L_GUEST&&c7840946-2b67-7238-34f0-08b06c4dba6f",
			id: 38512,
			name: "Topic",
		},
		{
			externalReferenceCode:
				"L_GUEST&&3c3888ff-01ad-0857-9414-d3ee49a542ce",
			id: 38514,
			name: "Product Line",
		},
	],
	externalReferenceCode: "L_GUEST",
	groupId: 20126,
	name: "Liferay DXP Site",
};

const GLOBAL_SITE = {
	children: [
		{
			externalReferenceCode: "L_GLOBAL&&L_TOPIC",
			id: 36767,
			name: "Topic",
		},
		{
			externalReferenceCode: "L_GLOBAL&&L_AUDIENCE",
			id: 36768,
			name: "Audience",
		},
		{
			externalReferenceCode: "L_GLOBAL&&L_STAGE",
			id: 36769,
			name: "Stage",
		},
	],
	externalReferenceCode: "L_GLOBAL",
	groupId: 20129,
	name: "Global",
};

const MARKETING_SITE = {
	children: [
		{
			externalReferenceCode:
				"8f2a17c4-6d90-4f11-b8e2-1c7d5a9e3b40&&d41f9a23-7c58-4e06-9a11-5b2e8c7d0f63",
			id: 40112,
			name: "Campaign",
		},
	],
	externalReferenceCode: "8f2a17c4-6d90-4f11-b8e2-1c7d5a9e3b40",
	groupId: 40110,
	name: "Marketing",
};

const ASSET_LIBRARY = {
	assetLibraryKey: "Asset Library Sample",
	children: [
		{
			externalReferenceCode:
				"a0c65564-c211-cf84-b163-c03b506a27f3&&4feb9029-e027-fbf2-6648-637eb3ccbe49",
			id: 38255,
			name: "AL Vocab 1",
		},
		{
			externalReferenceCode:
				"a0c65564-c211-cf84-b163-c03b506a27f3&&918721d6-579f-247b-5d38-35734eaa275c",
			id: 38259,
			name: "AL Vocab 2",
		},
	],
	externalReferenceCode: "a0c65564-c211-cf84-b163-c03b506a27f3",
	groupId: 38245,
	name: "Asset Library Sample",
};

const BRAND_LIBRARY = {
	assetLibraryKey: "Brand Assets",
	children: [
		{
			externalReferenceCode:
				"b71d3e08-5a4c-42f9-9d16-e0c8b35af217&&6c09f4d1-2e83-47ba-8f50-91d7a6c2e845",
			id: 41007,
			name: "Brand Region",
		},
	],
	externalReferenceCode: "b71d3e08-5a4c-42f9-9d16-e0c8b35af217",
	groupId: 41005,
	name: "Brand Assets",
};

const SITE_WITHOUT_VOCABULARIES = {
	children: [],
	externalReferenceCode: "2d6b90fe-1c47-4a85-b3d9-7e05f81ca62b",
	groupId: 40220,
	name: "Support",
};

const GROUPS = [GUEST_SITE, GLOBAL_SITE, ASSET_LIBRARY];

export default {
	title: "Components/SelectVocabularies",
	component: Element,
};

const Template = (args) => (
	<SelectVocabularies
		groups={GROUPS}
		initialSelectedVocabularyExternalReferenceCodes="L_GUEST&&c7840946-2b67-7238-34f0-08b06c4dba6f"
		learnResources={{"portal-search-web": portalSearchWeb}}
		vocabularyExternalReferenceCodesInputName="groupVocabularyExternalReferenceCodes"
		{...args}
	/>
);

/**
 * A site, Global and one connected asset library, with a site vocabulary
 * already selected.
 */
export const Default = Template.bind({});

Default.args = {};

/**
 * Nothing stored, so the widget opens on "All Vocabularies" and the tree stays
 * hidden until the other radio is picked.
 */
export const AllVocabularies = Template.bind({});

AllVocabularies.args = {
	initialSelectedVocabularyExternalReferenceCodes: "",
};

/**
 * Two connected libraries alongside two sites. Libraries always follow the
 * sites and are sorted by name, so "Asset Library Sample" precedes
 * "Brand Assets". The selection is a library vocabulary paired with the
 * library that owns it — the case LPD-104381 fixed.
 */
export const WithAssetLibraries = Template.bind({});

WithAssetLibraries.args = {
	groups: [
		GUEST_SITE,
		MARKETING_SITE,
		GLOBAL_SITE,
		ASSET_LIBRARY,
		BRAND_LIBRARY,
	],
	initialSelectedVocabularyExternalReferenceCodes:
		"a0c65564-c211-cf84-b163-c03b506a27f3&&4feb9029-e027-fbf2-6648-637eb3ccbe49",
};

/**
 * A selection saved before LPD-104381, pairing a library vocabulary with the
 * site's external reference code instead of the library's. No tree item
 * matches, so the vocabulary renders unchecked and the info alert offers
 * "Remove unavailable vocabularies".
 */
export const UnavailableSelection = Template.bind({});

UnavailableSelection.args = {
	initialSelectedVocabularyExternalReferenceCodes:
		"L_GUEST&&4feb9029-e027-fbf2-6648-637eb3ccbe49",
};

/**
 * Several stored codes where only one still resolves, leaving a mix of
 * available and unavailable selections.
 */
export const PartiallyUnavailableSelection = Template.bind({});

PartiallyUnavailableSelection.args = {
	initialSelectedVocabularyExternalReferenceCodes: [
		"L_GUEST&&c7840946-2b67-7238-34f0-08b06c4dba6f",
		"L_GUEST&&4feb9029-e027-fbf2-6648-637eb3ccbe49",
		"L_GLOBAL&&L_DELETED",
	].join(","),
};

/**
 * A group with no vocabularies of its own still renders as a tree item, with
 * nothing to expand.
 */
export const GroupWithoutVocabularies = Template.bind({});

GroupWithoutVocabularies.args = {
	groups: [GUEST_SITE, SITE_WITHOUT_VOCABULARIES, GLOBAL_SITE],
};

/**
 * Twenty-one vocabularies under one site. The list is not capped — see
 * LPS-178336, where selection was limited to twenty.
 */
export const ManyVocabularies = Template.bind({});

ManyVocabularies.args = {
	groups: [
		{
			...GUEST_SITE,
			children: Array.from({length: 21}, (_, index) => ({
				externalReferenceCode: `L_GUEST&&vocabulary-${index + 1}`,
				id: 39000 + index,
				name: `Vocabulary ${index + 1}`,
			})),
		},
		GLOBAL_SITE,
	],
};

/**
 * No groups came back from the server, which the component reports as a load
 * failure rather than an empty tree.
 */
export const NoGroups = Template.bind({});

NoGroups.args = {
	groups: [],
};
