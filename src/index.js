const _ = require('lodash')
const github = require('@actions/github');
const core = require('@actions/core');
const fs = require('fs');

async function run() {
    const myToken = core.getInput('token');
    const type = core.getInput('type')
    const repoFull = core.getInput('repo').split('/');    
    const variables = core.getInput('variables');
    const delimiter = core.getInput('delimiter');
    const filePath = core.getInput('filePath');
    const outputFile = core.getInput('outputFile');
    const writeToFile = core.getInput('writeToFile');
    
    let semVersion = '1.0.0'
    


    fs.appendFileSync(process.env.GITHUB_OUTPUT, "version=" + semVersion);
    const octokit = github.getOctokit(myToken)
    
    
    
}

run();