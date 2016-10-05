# eslint-scanner

**eslint-scanner** is a code specification check tool.ratherblue's [eslint-html-reporter](https://github.com/ratherblue/eslint-html-reporter) is used for create the result html.

* Based on the **eslint** code standard specification
* Display the results in HTML
* You can customize eslint rules

## Installation
```sh
$ npm -g install eslint-scanner
```

## Usage

### Simple
create .eslintrc in yourpath  
and then:
```sh
$ yourpath: escheck -f ./src -c .eslintrc
```

Then you can see the result file(report.html) under yourpath.

### Set the output
```sh
$ yourpath: escheck -f ./src -o ./report.html
```

---

## Help 
```sh
$: escheck --help  

  Usage: escheck [options] <src...>  

  Options:  

    -h, --help           output usage information  
    -V, --version        output the version number  
    -f, --path <path>    base directory for resolving paths  
    -c, --config <path>  .eslintrc path  
    -o, --output <path>  path for report html
```

# License
[MIT License](https://raw.githubusercontent.com/milan-hwj/eslint-scanner/master/LICENSE)
