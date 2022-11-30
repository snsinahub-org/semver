const _ = require('lodash')
const github = require('@actions/github');
const core = require('@actions/core');
const fs = require('fs');
const { graphql } = require("@octokit/graphql");

async function run() {
    const myToken = core.getInput('token');
    const type = core.getInput('type')
    const repoFull = core.getInput('repo').split('/');    
    
    
    let semVersion = '1.0.0'
    


    fs.appendFileSync(process.env.GITHUB_OUTPUT, "version=" + repoFull[1]);
    const octokit = github.getOctokit(myToken)
    
    
    
}

run();