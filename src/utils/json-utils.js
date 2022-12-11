'use strict';

const _ = require('lodash');

module.exports = class JsonUtils {

    constructor(jsonObj) {
        this.jsonObj = jsonObj
    }

    upgradeVersion(version, type, prepend) {
        console.log("orig:", version)
        let versionObject = version.replace(prepend).split('.')
        let updatedVersion = ''
        let major, minor, patch = ''

        console.log(version)
        
        switch(type.toLowerCase()) {
            case 'major': 
                major = parseInt(versionObject[0]) +1
                minor = parseInt(versionObject[1])
                patch = parseInt(versionObject[2])
                updatedVersion = `${major}.${minor}.${patch}`
                break;
            case 'minor': 
                major = parseInt(versionObject[0])
                minor = parseInt(versionObject[1]) +1
                patch = parseInt(versionObject[2])
                updatedVersion = `${major}.${minor}.${patch}`
                break;
            case 'patch': 
                major = parseInt(versionObject[0])
                minor = parseInt(versionObject[1])
                patch = parseInt(versionObject[2]) +1
                updatedVersion = `${major}.${minor}.${patch}`
                break;
        }
        
        return updatedVersion;

    }

    firstItem(keyName) {
        let first = this.jsonObj[0][keyName]
        return first
    }
}