'use strict';


const _ = require('lodash');
const { graphql } = require("@octokit/graphql");


module.exports = class GetReleaseTags {

    constructor() {

    }
 
    getTags(jsonObj) {
        return jsonObj['releases']['nodes'];
    }

    async getAllTags(owner, repo, myToken) {
        const graphqlWithAuth = graphql.defaults({
            headers: {
                authorization: `token ${myToken}`,
            },
        });
    
        let hasNextPage = true;
        let endCursor = null;
        let allTags = [];
    
        while (hasNextPage) {
            const response = await graphqlWithAuth(
                `
                  query ($cursor: String) {
                    repository(owner: "${owner}", name: "${repo}") {
                    releases(first: 100, after: $cursor, orderBy: {field: CREATED_AT, direction: DESC}) {
                        nodes {
                          name
                          createdAt
                          tagName
                        }
                        pageInfo {
                          startCursor
                          endCursor
                          hasNextPage
                        }
                    }
                    }
                }
                `,
                {
                    owner: owner,
                    repo: repo,
                    cursor: endCursor,
                }
            );
    
            const releases = response.repository.releases;
            allTags = allTags.concat(releases.nodes);
            hasNextPage = releases.pageInfo.hasNextPage;
            endCursor = releases.pageInfo.endCursor;

            // console.log('All tags:', JSON.stringify(releases, null, 2));
        }

        console.log('All tags:', JSON.stringify(allTags, null, 2));
    
        return allTags;
    }

    async getAllTags2(owner, repo, myToken) {
        const graphqlWithAuth = graphql.defaults({
            headers: {
                authorization: `token ${myToken}`,
            },
        });
 
        return await graphqlWithAuth(
            `
              {
                
                repository(owner: "${owner}", name: "${repo}") {
                    
                    releases(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
                            nodes {
                            name
                            createdAt
                            tagName
                        }
                    }
                }
              }
            `
        );       
    }
}