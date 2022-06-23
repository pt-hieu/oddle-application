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

# Disclaimer

During development process, there will be a error like [below] when you hit refresh on the details page. It's expected and hasn't caused any troubles to the application.

```bash
Error: The provided `href` (/users/[username]) value is missing query values (username) to be interpolated properly. Read more: https://nextjs.org/docs/messages/href-interpolation-failed
```

# Dependencies

```json
"@emotion/babel-preset-css-prop": "^11.2.0",
"@emotion/css": "^11.9.0",
"@emotion/react": "^11.9.3",
"@emotion/server": "^11.4.0",
"@emotion/styled": "^11.9.3",
"@reduxjs/toolkit": "^1.8.2",
"axios": "^0.27.2",
"dotenv": "^16.0.1",
"framer-motion": "^6.3.11",
"lodash": "^4.17.21",
"next": "^12.0.7",
"query-string": "^7.1.1",
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-hook-form": "^7.32.1",
"react-redux": "^8.0.2",
"react-switch": "^7.0.0",
"react-tooltip": "^4.2.21",
"react-use": "^17.4.0",
"remove": "^0.1.5",
"styled-components": "^5.3.5",
"twin.macro": "^2.8.2"
```
