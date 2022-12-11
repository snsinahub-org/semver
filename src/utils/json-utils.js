'use strict';

const _ = require('lodash');

module.exports = class JsonUtils {

    constructor(jsonObj) {
        this.jsonObj = jsonObj
    }

    firstItem(keyName) {
        console.log("TYPE OF:", keyName, typeof this.jsonObj)
        console.log("TAGS :", JSON.stringify(this.jsonObj))
        let first = this.jsonObj[1][keyName]
        return first
    }
}