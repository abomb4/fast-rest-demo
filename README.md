# fast-rest-demo
An demo project for faster creating rest service using NodeJS and MongoDB backend.

I read a [good blog](https://medium.freecodecamp.org/how-to-build-blazing-fast-rest-apis-with-node-js-mongodb-fastify-and-swagger-114e062db0c9)
and created this demo.

This project aims to create project prototype or demo fastly.

## Usage
### Run MongoDB
The recommand way is running MongoDB server in docker.

You can type this commands to run MongoDB in docker.
```
docker pull mongo
docker run -p 27017:27017 -v $HOME/docker_mongodb:/data/db -d mongo
```
> Note: modify `$HOME/docker_mongodb` to your favorite MongoDB data file path.

### Run Demo
To run this demo temporary, simple use this commands:
```
git clone https://github.com/abomb4/fast-rest-demo
cd fast-rest-demo
npm install && npm start
```
If you want **deploy** this demo, you may need `pm2` to do this:

1. Install `pm2` globally
  ```
  npm install -g pm2
  ```
2. Build the demo
  ```
  npm run build
  ```
3. Run the built code via `pm2`
  ```
  NODE_ENV=production pm2 start
  ```
  or
  ```
  npm run daemon
  ```
  Then follow the instruction of `pm2`. After run `pm2`, console may like this:
  ```
  ┌──────────┬────┬─────────┬──────┬───────┬────────┬─────────┬────────┬─────┬───────────┬──────┬──────────┐
  │ App name │ id │ version │ mode │ pid   │ status │ restart │ uptime │ cpu │ mem       │ user │ watching │
  ├──────────┼────┼─────────┼──────┼───────┼────────┼─────────┼────────┼─────┼───────────┼──────┼──────────┤
  │ index    │ 0  │ 1.0.0   │ fork │ 15139 │ online │ 15      │ 0s     │ 0%  │ 12.2 MB   │ x4x  │ disabled │
  └──────────┴────┴─────────┴──────┴───────┴────────┴─────────┴────────┴─────┴───────────┴──────┴──────────┘
  Use `pm2 show <id|name>` to get more details about an app
  ```
  Then we can use `pm2 show 0` to confirm the status of daemon we run.
  
