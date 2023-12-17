import fetch from 'node-fetch';
import fs from 'fs';

require('dotenv').config();

const user = 'Golde34';
const token = process.env.TOKEN;
const repo = process.env.REPO;
const sinceDate = '2023-12-04T00:00:00Z';
const untilDate = '2023-12-04T23:59:59Z';
const commitMessages = [] as any;
const url = `https://api.github.com/repos/${user}/${repo}/commits?per_page=100&since=${sinceDate}&until=${untilDate}`;

type CommitResponse = {
    commit: {
        message: string;
        author: {
            date: string;
        }
    }
}

export async function fetchCommits(): Promise<void> {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
    };
    
    try {
        const response = await fetch(url, { headers });
        const commitResponse = await response.json() as CommitResponse[];
        
        commitResponse.forEach((commit: CommitResponse) => {
            commitMessages.push({
                message: commit.commit.message,
                date: commit.commit.author.date
            });
        });

        await fs.promises.writeFile('commits.json', JSON.stringify(commitMessages));
        console.log('Commits saved!');
    } catch (error) {
        console.error(error);
    }
}

export async function getCommits(): Promise<any> {
    const commits = await fs.promises.readFile('commits.json', 'utf-8');
    return JSON.parse(commits);
}