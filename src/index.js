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
            authorization: `token ${myToken}`,
        },
    });
    const { repository } = await graphqlWithAuth(
        `
          {
            repository(owner: "${owner}", name: "${repo}") {
                refs(refPrefix: "refs/tags/", first: 100) {
                    nodes {
                      name
                      
                    }
                  }
            }
          }
        `
    );

    console.log(JSON.stringify(repository));


    fs.appendFileSync(process.env.GITHUB_OUTPUT, "version=" + repoFull[1]);
    const octokit = github.getOctokit(myToken)



}

run();