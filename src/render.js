#!/usr/bin/env node

/**
 * @author   milan(white gourd angel)
 * @describe render result html
 */
const Xtemplate = require('xtemplate');
const fs = require('fs');
const nodePath = require('path');
const output = require('../src/output');

class Render {
    constructor(data, path) {
        this.dataFormat(data);
        const content = this.render(data);
        this.output(content, path);
    }
    render(data) {
        const pageContent = this.getTemplateStr();
        const tplStr = new Xtemplate(pageContent).render(data);
        return tplStr;
    }
    output(content, path) {
        fs.writeFileSync(path, content, {
            flag: 'w+',
            encoding: 'utf8'
        }, (err) => {
            if (err) {
                return console.log(err);
            }
            return null;
        });
        output.success('create file ' + path);
    }
    dataFormat(data) {
        data.results.forEach((item) => {
            let messages = [];
            item.messages.forEach((msg) => {
                if(!/import|(linebreak\-style)/.test(msg.ruleId)) {
                    messages.push(msg);
                } else {
                    if(msg.severity === 1) {
                        item.warningCount -= 1;
                    } else {
                        item.errorCount -= 1;
                    }
                }
            });
            item.messages = messages;
        });
        data.results.sort((a, b) => b.errorCount - a.errorCount);
    }
    getTemplateStr() {
        const xtplPath = nodePath.resolve(require.main.filename, '../../src/page.xtpl');
        return fs.readFileSync(xtplPath).toString();
    }
}

module.exports = (data, path) => new Render(data, path);
