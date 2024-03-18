if [[ $1 == "--pnpm" ]]; then
    pnpm install -g @vscode/vsce

    pnpm install --save-dev typescript@latest
    pnpm install --save-dev @vscode/vsce

    pnpm install --save-dev @vscode/test-electron

    pnpm install --save-dev vsce
    pnpm install --save-dev vscode-test
else
    npm install -g @vscode/vsce

    npm install --save-dev typescript@latest
    npm install --save-dev @vscode/vsce

    npm install --save-dev @vscode/test-electron

    npm install --save-dev vsce
    npm install --save-dev vscode-test
fi
