# Raices - Dirt

## Intallation & Development Setup

### Getting Started
Start by setting up your development environment.  
```bash
# From root directory:
yarn start
```
Lerna will install all dependencies across all packages in the root directory ```node_modules/``` folder. There is **no** need to run ```yarn``` on each individual package. 


### Run Development

Start by running the Rollup.js script in ```/packages/design-system```. This will watch for any changes in the design-system package.
```bash
# From /packages/design-system
yarn dev
```


Then, run the frontend application in ```/packages/frontend```. This will run on port 3030 to allow the Raices app to run on port 3000 if you are working on both apps. 
```bash
# From /packages/design-system
yarn dev
```






