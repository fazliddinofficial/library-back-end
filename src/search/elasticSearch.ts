import { Client } from '@elastic/elasticsearch';

export const client = new Client({
  node: 'https://my-elasticsearch-project-d84088.es.us-east-1.aws.elastic.cloud:443',
  auth: {
    apiKey: 'Rkh4SHlKWUJiWTZiQXVjQUtmZGg6YjVTcndBeUtuNU5NUVJEa29OSUtCZw==',
  },
});
