// Imports
import * as cli from "../cli.js";
import capitalizeWord from "../helpers/capitalizeWord.js";

// Creates types
type Definition = {
	meanings: {
		partOfSpeech: string;
		definitions: {
			antonyms: string[];
			definition: string;
			example?: string;
			synonyms: string[];
		}[];
		synonyms: string[];
		antonyms: string[];
	}[];
	license?: {
		name: string;
		url: string;
	};
	phonetic?: string;
	phonetics: {
		audio?: string;
		license?: {
			name: string;
			url: string;
		};
		sourceUrl?: string;
		text?: string;
	}[];
	sourceUrls: string[];
	word: string;
};

// Creates solver
export async function execute(
	values: {
		query?: string;
	} = {}
): Promise<void> {
	// Defines word
	const query = values.query ?? (await cli.promptString("[Prompt] Query: "));
	if (query === null) throw new Error("[Error] Invalid query");
	cli.print(`[Given] Query = ${query}`);

	// Searches query
	const result = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
	if (result.status === 404) throw new Error("[Error] Query not found");
	else if (result.status !== 200) throw new Error("[Error] Cannot connect to dictionapi at this moment");

	// Loads definition
	const definitions: Definition[] = await result.json();

	// Prints definitions
	cli.print("--- [Dictionary (Start)] ---", "separator");
	for (let definitionIndex = 0; definitionIndex < definitions.length; definitionIndex++) {
		// Defines definition
		const definition = definitions[definitionIndex];

		// Parses definition
		const word = definition.word;
		const phonetics = definition.phonetics
			.filter((phonetic) => {
				return "text" in phonetic && typeof phonetic.text === "string";
			})
			.map((phonetic) => {
				return phonetic.text as string;
			})
			.join(", ");

		// Prints header
		if(definitionIndex) cli.gap();
		cli.print(`Word: ${word}`, "important");
		cli.print(`Phonetics: (${phonetics})`, "hidden");

		// Prints meanings
		for (let meaningIndex = 0; meaningIndex < definition.meanings.length; meaningIndex++) {
			// Defines meaning
			const meaning = definition.meanings[meaningIndex];

			// Pares meaning
			const partsOfSpeech = await capitalizeWord({ value: meaning.partOfSpeech });
			const synonyms = meaning.synonyms.join(", ");
			const antonyms = meaning.antonyms.join(", ");

			// Prints parts of speech
			cli.gap();
			cli.print(`Parts of Speech: ${partsOfSpeech}`);

			// Prints explanations
			cli.print("Definition:");
			for (let explanationIndex = 0; explanationIndex < meaning.definitions.length; explanationIndex++) {
				// Defines explanantion
				const explanantion = meaning.definitions[explanationIndex];

				// Prints explanation
				cli.print(`${explanationIndex + 1}. ${explanantion.definition}`, "text");

				// Prints example
				if ("example" in explanantion && typeof explanantion.example === "string")
					cli.print(`- Example: ${explanantion.example}`, "hidden");
			}

			// Prints synonyms and antonyms
			cli.print(`Synonyms: ${synonyms}`);
			cli.print(`Antonyms: ${antonyms}`);
		}
	}
	cli.print("--- [Dictionary (End)] ---", "separator");
}

// Exports
export default execute;
