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
                refs(refPrefix: "refs/tags/", first: 1, query: "^v") {
                    nodes {
                      repository {
                        releases(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
                          nodes {
                            name
                            createdAt
                            tagName
                            
                          }
                        }
                      }
                    }
                  }
            }
          }
        `
    );

    console.log(JSON.stringify(repository));


    fs.appendFileSync(process.env.GITHUB_OUTPUT, "version=" + JSON.stringify(repository['refs']['nodes']));
    const octokit = github.getOctokit(myToken)



}

run();