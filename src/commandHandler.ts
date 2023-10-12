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

// A function that takes a markdown string as input and returns a string with trimmed MathJax equations
function trimMathJax(markdown: string): string {
  // A regular expression that matches MathJax equations delimited by $, $ or $$, $$
  const mathJaxRegex = /(\$\$?)([^$]*?)(\$\$?)/g;
  // A function that takes a matched equation and returns it with trimmed whitespace
  const trimEquation = (match: string, start: string, equation: string, end: string) => {
    // Remove any leading or trailing whitespace from the equation
    equation = equation.trim();
    // Return the equation with the original delimiters
    return start + equation + end;
  };
  // Replace all MathJax equations in the markdown string with trimmed ones
  return markdown.replace(mathJaxRegex, trimEquation);
}
