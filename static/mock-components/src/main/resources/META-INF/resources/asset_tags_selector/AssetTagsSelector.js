/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayButton from "@clayui/button";
import ClayForm, {ClayInput} from "@clayui/form";
import ClayMultiSelect from "@clayui/multi-select";
import PropTypes from "prop-types";
import React, {useMemo, useState} from "react";

// The real `AssetTagsSelector` searches tags through `/api/jsonws/invoke` and
// opens the tag item selector in a modal, so it only works against a running
// portal. This mock keeps the same prop contract but serves a fixed tag list,
// which lets the value input be exercised standalone.

const SOURCE_TAGS = [
	"announcement",
	"design",
	"engineering",
	"featured",
	"marketing",
	"press",
	"product",
	"release",
].map((tag) => ({label: tag, value: tag}));

function AssetTagsSelector({
	formGroupClassName = "",
	helpText = "",
	id,
	inputName,
	label = Liferay.Language.get("tags"),
	onSelectedItemsChange = () => {},
	selectedItems = [],
	showLabel = true,
	showSelectButton,
	showSubtitle = true,
	subtitle = Liferay.Language.get("other-metadata"),
}) {

	// The real component takes `inputValue`/`onInputValueChange` from its
	// parent. `ValueInput` passes neither, so hold the query locally to keep
	// the field typeable.

	const [inputValue, setInputValue] = useState("");

	const sourceItems = useMemo(
		() =>
			SOURCE_TAGS.filter(
				({value}) => !selectedItems.find((item) => item.value === value)
			),
		[selectedItems]
	);

	return (
		<div id={id}>
			<ClayForm.Group className={formGroupClassName} role="group">
				{showSubtitle && (
					<div className="border-0 mb-0 sheet-subtitle text-uppercase">
						{subtitle}
					</div>
				)}

				<label
					className={showLabel ? "" : "sr-only"}
					htmlFor={inputName + "_MultiSelect"}
					id={inputName + "_MultiSelectLabel"}
				>
					{label}
				</label>

				<ClayInput.Group style={{minHeight: "2.125rem"}}>
					<ClayInput.GroupItem>
						<ClayMultiSelect
							aria-labelledby={inputName + "_MultiSelectLabel"}
							clearAllTitle={Liferay.Language.get("clear-all")}
							id={inputName + "_MultiSelect"}
							inputName={inputName}
							items={selectedItems}
							onChange={setInputValue}
							onItemsChange={(items) =>
								onSelectedItemsChange(
									items.map(({label, value}) => ({
										label,
										value: value ?? label,
									}))
								)
							}
							sourceItems={sourceItems}
							value={inputValue}
						/>
					</ClayInput.GroupItem>

					{showSelectButton && (
						<ClayInput.GroupItem shrink>
							<ClayButton
								aria-haspopup="dialog"
								displayType="secondary"
								onClick={() =>
									onSelectedItemsChange([
										...selectedItems,
										SOURCE_TAGS[selectedItems.length] ??
											SOURCE_TAGS[0],
									])
								}
							>
								{Liferay.Language.get("select")}
							</ClayButton>
						</ClayInput.GroupItem>
					)}
				</ClayInput.Group>

				{helpText ? (
					<p className="m-0 mt-1 small text-secondary">{helpText}</p>
				) : null}
			</ClayForm.Group>
		</div>
	);
}

AssetTagsSelector.propTypes = {
	formGroupClassName: PropTypes.string,
	helpText: PropTypes.string,
	id: PropTypes.string,
	inputName: PropTypes.string,
	label: PropTypes.string,
	onSelectedItemsChange: PropTypes.func,
	selectedItems: PropTypes.array,
	showLabel: PropTypes.bool,
	showSelectButton: PropTypes.bool,
	showSubtitle: PropTypes.bool,
	subtitle: PropTypes.string,
};

export default AssetTagsSelector;
