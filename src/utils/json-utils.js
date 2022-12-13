'use strict';

const _ = require('lodash');

module.exports = class JsonUtils {

    constructor(jsonObj) {
        this.jsonObj = jsonObj
    }

    upgradeVersion(version, type, prepend) {
        console.log("orig:", version.replace(prepend, ''), prepend)
        let versionObject = version.replace(prepend, '').split('.')
        let updatedVersion = ''
        let major, minor, patch = ''

        console.log(versionObject[0], versionObject[1], versionObject[2])
        
        switch(type.toLowerCase()) {
            case 'major': 
                major = parseInt(versionObject[0]) +1
                minor = 0
                patch = 0
                updatedVersion = `${major}.${minor}.${patch}`
                break;
            case 'minor': 
                major = parseInt(versionObject[0])
                minor = parseInt(versionObject[1]) +1
                patch = 0
                updatedVersion = `${major}.${minor}.${patch}`
                break;
            case 'patch': 
                major = parseInt(versionObject[0])
                minor = parseInt(versionObject[1])
                patch = parseInt(versionObject[2]) +1
                updatedVersion = `${major}.${minor}.${patch}`
                break;
        }
        
        return `${prepend}${updatedVersion}`;

    }

    firstItem(keyName) {
        let first = this.jsonObj[0][keyName]
        return first
    }

    filterByPrepend(prepend) {
        let matched = _.forEach(this.jsonObj, function(obj) {          
            return obj.name.startsWith(prepend)
        })

        // _.findIndex(users, function(o) { return o.user == 'barney'; });

        console.log('JSON: ', JSON.stringify(this.jsonObj))
        if(prepend != '') {
            this.jsonObj = matched;
        }

        console.log('PREPEND: ', JSON.stringify(matched))

        return matched;
    }
}