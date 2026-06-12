import React from "react";

import SemanticSearch from "src/main/resources/META-INF/resources/js/components/semantic_search_configuration/index";
import learnMessages from "../../static/learn-resources/portal-search-web.json";
import {FeatureFlagDecorator} from '../decorators';

export default {
	title: "SemanticSearch/SemanticSearch",
	component: SemanticSearch,
	argTypes: {onChange: {action: "changed"}, onEnter: {action: "enter"}},
};

const Template = (args) => (
	<SemanticSearch
		availableEmbeddingVectorDimensions={["384", "512", "768"]}
		availableTextEmbeddingProviders={{
			"Elasticsearch Inference Endpoint": "Elasticsearch Inference Endpoint",
			"hugging-face-inference-api": "Hugging Face Inference API (Beta)",
			"hugging-face-inference-endpoint": "Hugging Face Inference Endpoint (Beta)",
			openai: "OpenAI",
			txtai: "txtai (Beta)",
			"vertex-ai": "Vertex AI",
		}}
		availableTextTruncationStrategies={{
			beginning: "Beginning",
			middle: "Middle",
			end: "End",
		}}
		initialTextEmbeddingsEnabled={true}
		initialTextEmbeddingProviderConfigurationJSONs={[]}
		availableLanguageDisplayNames={{
			ar_SA: "Arabic (Saudi Arabia)",
			ca_ES: "Catalan (Spain)",
			zh_CN: "Chinese (China)",
			nl_NL: "Dutch (Netherlands)",
			en_US: "English (United States)",
			fi_FI: "Finnish (Finland)",
			fr_FR: "French (France)",
			de_DE: "German (Germany)",
			hu_HU: "Hungarian (Hungary)",
			ja_JP: "Japanese (Japan)",
			pt_BR: "Portuguese (Brazil)",
			es_ES: "Spanish (Spain)",
			sv_SE: "Swedish (Sweden)",
		}}
		initialTextEmbeddingCacheTimeout={0}
		availableModelClassNames={{
			"com.liferay.blogs.model.BlogsEntry": "Blogs Entry",
			"com.liferay.knowledge.base.model.KBArticle":
				"Knowledge Base Article",
			"com.liferay.message.boards.model.MBMessage":
				"Message Boards Message",
			"com.liferay.journal.model.JournalArticle": "Web Content Article",
			"com.liferay.wiki.model.WikiPage": "Wiki Page",
		}}
		learnMessages={learnMessages}
		{...args}
	/>
);

export const Default = Template.bind({});

export const FeatureFlagEnabled = Template.bind({});
FeatureFlagEnabled.storyName = "BYO-LLM FF LPD-11319";
FeatureFlagEnabled.decorators = [FeatureFlagDecorator('LPD-11319', true)];
