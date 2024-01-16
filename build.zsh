# prompt for version in zsh
echo "make sure to modify :
    ▶ package.json
        ▶ "version"
        ▶ "activationEvents"
            ▶ onLanguage:_____
    ▶ package-lock.json
        ▶ "version"
        ▶ "package" → "" → "version"
"


npm run compile
vsce package