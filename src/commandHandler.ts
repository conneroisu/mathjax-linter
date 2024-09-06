import { Editor, MarkdownView, Plugin } from "obsidian";

export default class CommandHandler {
	plugin: Plugin;

	constructor(plugin: Plugin) {
		this.plugin = plugin;
		loadCommands();
	}
}

function loadCommands() {
	this.plugin.addCommand({
		id: 'lint-mathjax',
		name: 'Lint Mathjax',
		editorCallback: (editor: Editor, view: MarkdownView) => {
			// get the current file 
			// get the current markdown string of the file
			const file = view.file;
			// read from the file using Obsidian APi
			const markdown =  this.app.vault.read(file);
			// trim the MathJax equations
			trimMathJax(markdown);
		}
	});
}

/**
 * @param content - The content of the file to be formatted
 * @returns The formatted content with MathJax expressions trimmed and formatted.
 */
function trimMathJax(content: string): string {
  // Regular expression to match MathJax expressions
  const mathJaxRegex = /(\$\$[\s\S]*?\$\$|\$[^\n\$]*\$)/g;

  return content.replace(mathJaxRegex, (match) => {
    // Remove spaces around operators and relations
    let formatted = match.replace(/\s*([+\-*/<>=])\s*/g, '$1');

    // Remove spaces around commas and semicolons
    formatted = formatted.replace(/\s*([,;])\s*/g, '$1');

    // Remove spaces around parentheses, brackets, and braces
    formatted = formatted.replace(/\s*([\(\[\{])\s*/g, '$1');
    formatted = formatted.replace(/\s*([\)\]\}])\s*/g, '$1');

    // Remove spaces around superscript and subscript
    formatted = formatted.replace(/\s*(\^|_)\s*/g, '$1');

    // Remove multiple spaces
    formatted = formatted.replace(/\s+/g, ' ');

    // Trim spaces at the beginning and end of the expression
    formatted = formatted.replace(/^\$\s+/, '$').replace(/\s+\$$/, '$');
    formatted = formatted.replace(/^\$\$\s+/, '$$').replace(/\s+\$\$$/, '$$');

    return formatted;
  });
}

