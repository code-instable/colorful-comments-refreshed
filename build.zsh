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
elif [[ "$@" == *"--pnpm"* ]]; then
    echo "➤ pnpm run compile"
    # run pnpm compile
    pnpm run compile
else
    echo "➤ vsce package --out vsix"
  # package into vsix using pnpm run compile
  vsce package --out vsix
fi