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

    async createRelease(owner, repo, tagName) {
        return await this.octokit.rest.repos.createRelease({
            owner: owner,
            repo: repo,
            tag_name: tagName,
        })
    }
}