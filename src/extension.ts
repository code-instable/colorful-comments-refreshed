import * as vscode from 'vscode';
import { Parser } from './parser';
import { JupyterParser } from './jupyterParser';

export function activate(context: vscode.ExtensionContext)
{
	let activeEditor: vscode.TextEditor | undefined;
	let parser: Parser = new Parser();
	let jupyterParser: JupyterParser = new JupyterParser();

	let updateDecorations = function (useHash = false)
	{
		if (!activeEditor) return;

		if (!parser.supportedLanguage) return;

		parser.FindSingleLineComments(activeEditor);
		parser.FindBlockComments(activeEditor);
		parser.FindJSDocComments(activeEditor);
		parser.ApplyDecorations(activeEditor);
	};

	if (vscode.window.activeTextEditor)
	{
		activeEditor = vscode.window.activeTextEditor;

		parser.SetRegex(activeEditor.document.languageId);

		triggerUpdateDecorations();
	}

	vscode.window.onDidChangeActiveTextEditor( (editor) =>
	{
		activeEditor = editor;
		
		if (editor)
		{
			parser.SetRegex(editor.document.languageId);

			triggerUpdateDecorations();
		}
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeTextDocument( event =>
	{
		if (activeEditor && event.document === activeEditor.document) {
			triggerUpdateDecorations();
		}
	}, null, context.subscriptions);

	var timeout: NodeJS.Timer;

	function triggerUpdateDecorations()
	{
		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(updateDecorations, 200);
	}

	// ⭐ Add notebook support ——————
	// https://github.com/allemand-instable/colorful-comments-refreshed/issues/7
	vscode.workspace.onDidOpenNotebookDocument(async notebook => {
		if (notebook.notebookType === 'jupyter') {
			await jupyterParser.parseNotebook(notebook);
		}
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeNotebookDocument(async event => {
		if (event.notebook.notebookType === 'jupyter') {
			await jupyterParser.parseNotebook(event.notebook);
		}
	}, null, context.subscriptions);

	vscode.window.onDidChangeActiveNotebookEditor(async editor => {
		if (editor?.notebook.notebookType === 'jupyter') {
			await jupyterParser.parseNotebook(editor.notebook);
		}
	}, null, context.subscriptions);
	// —————————————————————————————
}

export function deactivate() { }