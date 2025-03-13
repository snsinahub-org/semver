import github from '@actions/github';
import core from '@actions/core';
import fs from 'fs';
import { graphql } from "@octokit/graphql";
import getTags from './utils/get-tags.js';
import JsonUtils from './utils/json-utils.js';
import Release from './utils/release.js';
import GenNotes from './utils/generate-notes.js';

async function run() {
    // Inputs
    const myToken = core.getInput('token');
    const type = core.getInput('type') == '' ? 'PATCH' : core.getInput('type');
    const prefix = core.getInput('prefix');
    const prerelease = core.getInput('prerelease');
    const body = core.getInput('body');
    const files = core.getInput('files');
    const branch = core.getInput('branch');
    const createRelease = core.getInput('create-release') == 'yes' ? true : false;
    const exitOnMissingType = core.getInput('exit-on-missing-type') == 'yes' ? true : false;
    const startsWith = core.getInput('starts-with');




    // class initializations
    const release = new Release(myToken);    
    
    const repoFull = core.getInput('repo').split('/');
    const tags = new getTags();


    let owner = repoFull[0];
    let repo = repoFull[1]
    const repository = await tags.getAllTags(owner, repo, myToken);
        
    let tagsObj = tags.getTags(repository);

    let jsonUtils = new JsonUtils(tagsObj);    

    if (startsWith != '') {
        tagsObj = jsonUtils.filterByStartsWith(startsWith);
    } 


    if(prefix == '') {
        jsonUtils.filterNoPrefix()
    } else {
        jsonUtils.filterByPrefix(prefix);
    } 
    

    let newVersion = '';
    let latestVersion =  ''
    
    if(jsonUtils.jsonObj.length > 0 && !exitOnMissingType){
        latestVersion = jsonUtils.firstItem('tagName');
        newVersion = jsonUtils.upgradeVersion(latestVersion, type, prefix);


    } else {
        newVersion = `${prefix}1.0.0`;
    }

    const notes = new GenNotes(myToken);
    if(createRelease && !exitOnMissingType) {        
        const releaseNote = await notes.genNotes(owner, repo, latestVersion, newVersion, branch, '');       
        let newRelease = await release.createRelease(owner, repo, newVersion, branch, prerelease, `${releaseNote.data.body}\n\n${body}`);
        release.releaseData(newRelease);    
        if(files != '') {
            let upload = await release.uploadFiles(owner, repo, files);
        }
    }


    fs.appendFileSync(process.env.GITHUB_OUTPUT, "version=" + newVersion);
    const octokit = github.getOctokit(myToken);
}

run();