const _ = require('lodash')
const github = require('@actions/github');
const core = require('@actions/core');
const fs = require('fs');
const { graphql } = require("@octokit/graphql");

async function run() {
    const myToken = core.getInput('token');
    const type = core.getInput('type')
    const repoFull = core.getInput('repo').split('/');   
    let owner = repoFull[0];
    let repo = repoFull[1] 
    
    
    let semVersion = '1.0.0'
    const graphqlWithAuth = graphql.defaults({
        headers: {
          authorization: `${myToken}`,
        },
      });
    const { repository } = await graphqlWithAuth(
        `
          {
            repository(owner: "${owner}", name: "${repo}") {
              issues(last: 3) {
                edges {
                  node {
                    title
                  }
                }
              }
            }
          }
        `
      );
    
      console.log(JSON.stringify(repositry));


    fs.appendFileSync(process.env.GITHUB_OUTPUT, "version=" + repoFull[1]);
    const octokit = github.getOctokit(myToken)
    
    
    
}

run();