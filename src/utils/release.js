'use strict';

const { Octokit } = require("@octokit/rest");
const github = require('@actions/github');


module.exports = class Releases {
    constructor(token) {
        this.token = token;
        this.ops = {
            auth: this.token
        }
        this.octokit = new Octokit(this.ops);

    }

    releaseData(data) {
        this.data = data
        this.id = data['data']['id']
        console.log('ID: ', this.id)
    }

    async createRelease(owner, repo, tagName, branch, prerelease, body) {
        return await this.octokit.rest.repos.createRelease({
            owner: owner,
            repo: repo,
            tag_name: tagName,
            target_commitish: branch,
            target_commitish: body,
            prerelease: (prerelease == 'false' ? false: true) ,
            body: body,
        })
    }
}