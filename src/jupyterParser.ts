// jupyterParser.ts
import * as vscode from 'vscode';
import { Parser } from './parser';

export class JupyterParser extends Parser {
    private cellParsers: Map<string, Parser> = new Map();
    private decorationTypes: Map<string, vscode.TextEditorDecorationType> = new Map();

    public async parseNotebook(notebook: vscode.NotebookDocument) {
        for (const cell of notebook.getCells()) {
            if (cell.kind === vscode.NotebookCellKind.Code) {
                const cellLanguage = cell.document.languageId;
                let parser = this.cellParsers.get(cell.document.uri.toString());

                if (!parser) {
                    parser = new Parser();
                    this.cellParsers.set(cell.document.uri.toString(), parser);
                }

                parser.SetRegex(cellLanguage);

                const cellEditor = {
                    document: cell.document,
                    setDecorations: (decoration: vscode.TextEditorDecorationType, ranges: vscode.DecorationOptions[]) => {
                        const uri = cell.document.uri.toString();
                        this.decorationTypes.set(uri, decoration);

                        // Find visible editors for this cell
                        const visibleEditors = vscode.window.visibleTextEditors.filter(
                            editor => editor.document.uri.toString() === cell.document.uri.toString()
                        );

                        // Apply decorations to each visible editor
                        for (const editor of visibleEditors) {
                            editor.setDecorations(decoration, ranges);
                        }
                    }
                } as vscode.TextEditor;

                parser.FindSingleLineComments(cellEditor);
                parser.FindBlockComments(cellEditor);
                parser.FindJSDocComments(cellEditor);
                parser.ApplyDecorations(cellEditor);
            }
        }
    }

    public clearDecorations() {
        for (const [_, decoration] of this.decorationTypes) {
            decoration.dispose();
        }
        this.decorationTypes.clear();
        this.cellParsers.clear();
    }
}