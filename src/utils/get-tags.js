'use strict';


const _ = require('lodash');
const { graphql } = require("@octokit/graphql");


module.exports = class GetReleaseTags {

    constructor() {

    }

    test() {
        let message = "the class is called"
        console.log(message)
        return message;
    }

    getTags(jsonObj) {
        return jsonObj['refs']['nodes'][0]['repository']['releases']['nodes'];
    }

    async getAllTags(owner, repo, myToken) {
        const graphqlWithAuth = graphql.defaults({
            headers: {
                authorization: `token ${myToken}`,
            },
        });

        let repos =  await graphqlWithAuth(
            `
              {
                
                repository(owner: "${owner}", name: "${repo}") {
                    refs(refPrefix: "refs/tags/", first: 1, query: "v3.0.0") {
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

        let tags = repos['repository']['refs']['nodes'][0]['repository']['releases']['nodes']

        // console.log("TAGS ZERO: ", JSON.stringify(tags))

        return tags;
        
    }
}