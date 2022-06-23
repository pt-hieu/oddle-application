# Feature Checklist

- [x] Search users based on `username`
- [x] Paginate search result
- [x] Display `username`, `avatar`, `followers` and `followings` in the search result
- [x] Like and dislike users
- [x] Preserve favorite list after refreshing
- [x] View specific user's information

- [x] Responsiveness
- [x] Use URL to persist application's states
- [x] Search while typing

- [x] Use the provided Figma mockup
- [x] Default/fallback image
- [x] Display paginator at Search Page if needed
- [x] Handle loading, error and empty states

- [x] Use GitHub API
- [x] Use NextJs
- [x] Use @reduxjs/toolkit
- [x] Use tailwindcss + styled-components + twin.macro
- [x] Deploy with URL
- [x] README.md provided

- [x] Use TypeScript
- [x] Use SSR
- [x] Support dark mode

# How to setup local environment

## Prerequisite

- Have NodeJs (ideally v16.14.0) installed

## Steps

At the root directory:  
1/ Run `npm ci` to install all the necessary dependencies without updating the lock file  
2/ [Optional] Create file `.env.local` and add variable `GH_ACCESS_TOKEN` to authorized the request to extend the rate limit  
3/ Run `npm run dev`  
4/ Access the application at `http://localhost:8080`
