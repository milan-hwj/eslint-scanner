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
```sh
$ yourpath: escheck -f ./src
```

Then you can see the result file(report.html) under yourpath.

### Set the output
```sh
$ yourpath: escheck -f ./src -o ./report.html
```

### Set the eslint rules  
  
create .eslintrc in yourpath  
and then:
```sh
$ yourpath: escheck -f ./src -c ./eslintrc
```

# License
[MIT License](https://raw.githubusercontent.com/milan-hwj/eslint-scanner/master/LICENSE)
