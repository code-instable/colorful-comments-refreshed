echo "⚠️ do not use PNPM, use **NPM** otherwise vsce won't package and will error"

# prompt for version in zsh
echo 'make sure to modify :
    ▶ package.json
        ▶ "version"
        ▶ "activationEvents"
            ▶ onLanguage:_____
    ▶ package-lock.json
        ▶ "version"
        ▶ "package" → "" → "version"
'

# check if --no-package argument is passed
if [[ "$@" == *"--no-package"* ]]; then
    # just compile typescript
    # language data
    echo 'compiling yaml to typescript...'
    python convert_yaml.py
    # compile to javascript
    echo 'compiling the typescript...'
    tsc -p ./
    # copy yaml file to output as reference
    cp -r src/parser/data out/parser/
    # linting
    eslint src --ext ts
elif [[ "$@" == *"--npm"* ]]; then
    echo "➤ npm run compile"
    # run pnpm compile
    npm run compile
elif [[ "$@" == *"--pnpm"* ]]; then
    echo "➤ pnpm run compile"
    # run pnpm compile
    pnpm run compile
else
    echo "➤ vsce package --out vsix"
    # package into vsix using (p)npm run compile
    vsce package --out vsix
fi