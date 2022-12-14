const _ = require('lodash')
const github = require('@actions/github');
const core = require('@actions/core');
const fs = require('fs');
const { graphql } = require("@octokit/graphql");
const getTags = require('./utils/get-tags.js');
const JsonUtils = require('./utils/json-utils.js');
const Release = require('./utils/release.js');

async function run() {
    const myToken = core.getInput('token');
    const type = core.getInput('type');
    const prefix = core.getInput('prefix');
    const files = core.getInput('files');
    const branch = core.getInput('branch');
    const release = new Release(myToken);
    
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

    let newVersion = ''
    if(jsonUtils.jsonObj.length > 0 ){
        const latestVersion =  jsonUtils.firstItem('tagName');
        newVersion = jsonUtils.upgradeVersion(latestVersion, type, prefix);
    } else {
        newVersion = `${prefix}1.0.0`
    }
        
    let newRelease = await release.createRelease(owner, repo, newVersion);

    console.log("RELEASE: ", JSON.stringify(newRelease), branch )
    fs.appendFileSync(process.env.GITHUB_OUTPUT, "version=" + newVersion);
    const octokit = github.getOctokit(myToken)




}

run();