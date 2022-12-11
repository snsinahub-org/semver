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
    
    const repoFull = core.getInput('repo').split('/');
    const tags = new getTags();

    let owner = repoFull[0];
    let repo = repoFull[1]


    let semVersion = '1.0.0'
    
    const { repository } = await tags.getAllTags(owner, repo, myToken);
    let tagsObj = tags.getTags(repository)
    // console.log("TAGS 8:", JSON.stringify(repository));
    
    console.log("TAGS ONE:", JSON.stringify(tagsObj));
    // console.log(JSON.stringify(repository));
    const jsonUtils = new JsonUtils(tagsObj);

    


    // fs.appendFileSync(process.env.GITHUB_OUTPUT, "version=" + JSON.stringify(repository['refs']['nodes']));
    fs.appendFileSync(process.env.GITHUB_OUTPUT, "version=" + jsonUtils.firstItem('tagName'));
    const octokit = github.getOctokit(myToken)

    console.log("test new class:", tags.test())



}

run();