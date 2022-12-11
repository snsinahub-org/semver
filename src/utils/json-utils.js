'use strict';

const _ = require('lodash');

module.exports = class JsonUtils {

    constructor(jsonObj) {
        this.jsonObj = jsonObj
    }

    firstItem(keyName) {
        let first = this.jsonObj[0][keyName]
        return first
    }
}