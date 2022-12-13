const _ = require('lodash')
const github = require('@actions/github');
const core = require('@actions/core');
const fs = require('fs');
const { graphql } = require("@octokit/graphql");
const getTags = require('./utils/get-tags.js');
const JsonUtils = require('./utils/json-utils.js');

async function run() {
    const myToken = core.getInput('token');
    const type = core.getInput('type');
    const prefix = core.getInput('prefix');
    
    const repoFull = core.getInput('repo').split('/');
    const tags = new getTags();


    let owner = repoFull[0];
    let repo = repoFull[1]


    let semVersion = '1.0.0'
    
    const { repository } = await tags.getAllTags(owner, repo, myToken);
    let tagsObj = tags.getTags(repository);
    const jsonUtils = new JsonUtils(tagsObj); 
    if(prefix == '') {
        jsonUtils.filterNoPrefix()
    } else {
        jsonUtils.filterByPrefix(prefix);
    } 
    
    const latestVersion =  jsonUtils.firstItem('tagName');
    const newVersion = jsonUtils.upgradeVersion(latestVersion, type, prefix);

    
    fs.appendFileSync(process.env.GITHUB_OUTPUT, "version=" + newVersion);
    const octokit = github.getOctokit(myToken)




}

run();