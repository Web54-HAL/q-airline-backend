<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
  <span style="margin-right: 100px;"></span>
  <a href="https://supabase.com/" target="blank">
    <img src="https://cdn.prod.website-files.com/66842e04d18971242a294872/669e87d174d190a8ba60b861_supabase-TAiY.png" width="120">
  </a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Project setup

```bash
$ npm install
```
Create your own `.env` file based on [.env.example](.env.example)

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Provided features
- `Cloud PostgreSQL Database` with [Supabase](https://supabase.com/).
- `MVC architecture` pattern by default of NestJs.
- `Role-based API guard` with `JWT authentication`, 2 main roles are customer and admin.
- `Rate limiting` feature with fixed limit of 70 request/s.

## Database structure

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
