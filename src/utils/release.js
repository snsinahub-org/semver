'use strict';

const { Octokit } = require("@octokit/rest");
const octokit = new Octokit();

module.exports = class Releases {
    constructor() {

    }

    async createRelease(owner, repo, tagName) {
        return await octokit.rest.repos.createRelease({
            owner: owner,
            repo: repo,
            tag_name: tagName,
        })
    }
}