# Change Log

## [0.8.0]
 
### new features
* **Regex color match support** — comments can now be matched by regex patterns for more flexible highlighting ([#16](https://github.com/allemand-instable/colorful-comments-refreshed/issues/16))

example config to use the feature:
```json
{ "tag": "INFO:.*", "color": "#22a6b3", "isRegex": true },
{ "tag": "(FIX):\\s.+", "color": "#B33771", "isRegex": true },
```
 
### new languages
* Snakemake (snakemake) — uses Python-style delimiters ([#17](https://github.com/allemand-instable/colorful-comments-refreshed/issues/17))
 
### for contributors
* `package.yaml` kept in sync with `package.json` as source of truth
* `implemented_languages.md` is now auto-generated from `package.yaml` at build time
* updated compile scripts to new architecture
* added `justfile` with package conversion & sync scripts
* updated README to reflect new features and improve contribution & compile sections
 
---

## [0.7.9]

* **Finally** moved error to "Colorful Comments Debug" output channel instead of sending an error notification to the user
* cleaned README a bit...
* modified repository name
  * from Colorful-Comments to colorful-comments-refreshed

### for the people (users)
* languages (?) :
  * SAS ? (added sas, SAS as identifiers)
  * ShaderLab
  * D
  * brightscript (fix ?)
  * explicit plaintext

### for contributors
* automated build process for easier implementation in the future
  * (basically for contributors and me, yay)
* a bit cleaner code base

---

## [0.7.7]

* added languages :
    * Wolfram (.wl, .wls) (wolfram)
    * Nix (.nix) (nix)
    * KDL (.kdl) (kdl)
* Jupyter Notebook support (ipynb)

### fixes :

* SQL comments now work with `--` and `/* */` comments  (thx @xHorntail)

---

## [0.7.6]

* added languages :
    * KDL (kdl)

---

## [0.7.5]

* added languages :
    * .gitignore (ignore)
    * Batch (bat)
    * stopped not supported language spam with temporary fix, to be reworked soon

---

## [0.7.4]
* language support request :
    * [added SystemVerilog support](https://github.com/allemand-instable/colorful-comments-refreshed/issues/2)
    * [added Qlik support](https://github.com/allemand-instable/colorful-comments-refreshed/issues/1)

you can ask for language support or feature request by [submitting an issue](https://github.com/allemand-instable/colorful-comments-refreshed/issues)

---

## [0.7.2b-0.7.3]
* better description

---

## [0.7.2]

* added languages :
    * R markdown (rmd)
    * Json with Comments, when as .json (json)
    * Svelte (svelte)
    * SASS (sass)
    * markdown (when detected as md)
    * mojo (.🔥) (mojo)
    * markdown_latex_combined [(popular extension)](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop)
    * Apple Script (applescript)
    * Auto Hot Key
        * v1
        * v2
    * Treyarch GSC

---

## [0.7.1]

* fixed bug of configuration not working due to extension name needing to be different from colorful-comments → colorful-comments-refreshed

---

## [0.7.0]

* Changed Parser's setDelimiter method to be able to quickly implement new languages in a yaml file

* yaml file location : `src/parser/data/languageConfig.yaml`

* added Astro

* changed logo

---

original extension author changelog :

---

## [0.6.2]
* Added Brightscript and XML Support but without samples experimented.

---

## [0.5.2]
* Needed to re-publish my extension due to technical glitch so pls support so, it starts from 0.5.2 but has updated part of 0.5.0

---

## [0.4.0]
* Added New Logo and Updated Package.json

---

## [0.3.0]
* Added Images and also tested some new languages adding them to Readme.md

---

## [0.2.0] 
### Features
* Updated Readme.md to show all necessary information and changed some colors in Package.json 
